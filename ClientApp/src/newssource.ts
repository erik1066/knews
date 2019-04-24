'use strict';

import { IArticle } from './article';
import { Article } from './article';

export interface INewsSource {
  url: string;
  name: string;
  iconUrl: string;
}

export interface INewsSourceListConfig {
  articles: string;
  title: string;
  subtitle?: string;
  url: string;
  excerpt?: string;
  byline?: string;
  authors: string;
  image?: string;
  publishDate: string;
  commentCount?: string;
  paginationUrlFormat?: string;
}

export async function getArticleList(url: string, organization: string): Promise<IArticle[]> {
  const config = await getNewsSourceListConfig(organization);
  const doc: Document = await getHtmlDocument(url);
  const articleTeasers: IArticle[] = parseList(doc, config, organization, url);
  return articleTeasers;
}

async function getNewsSourceListConfig(source: string): Promise<INewsSourceListConfig> {
  const response: Response = await fetch('api/1.0/Configuration/articlelists/' + encodeURIComponent(source), {
    method: "GET",
  });

  const json = await response.json();
  let config: INewsSourceListConfig = json as INewsSourceListConfig;

  return config;
}

function parseList(doc: Document, config: INewsSourceListConfig, organization: string, baseUrl: string): IArticle[] {

  let articleTeasers: IArticle[] = [];

  const iterator = doc.evaluate(config.articles, doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

  try {
    let articleTeaserNode = iterator.iterateNext();

    while (articleTeaserNode) {
      let articleTeaser: IArticle = parseListItem(doc, config, articleTeaserNode, organization);
      if (!articleTeaser.url.startsWith('https://')) {
        articleTeaser.url = baseUrl + articleTeaser.url;
      }

      const found = articleTeasers.find(t => t.title === articleTeaser.title);
      if (!found) {
        articleTeasers.push(articleTeaser);
      }
      articleTeaserNode = iterator.iterateNext();
    }
  }
  catch (e) {
    console.error('Error: Document tree modified during iteration ' + e);
  }

  return articleTeasers;
}

function parseListItem(doc: Document, config: INewsSourceListConfig, node: Node, organization: string): IArticle {
  let article: IArticle = new Article();

  article.title = doc
    .evaluate(config.title, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
    .iterateNext()
    .textContent || '';

  if (config.authors && config.authors.length > 0) {
    article.authors = doc
      .evaluate(config.authors, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
      .iterateNext()
      .textContent || '';
  }
  else {
    article.authors = "";
  }

  if (config.byline && config.byline.length > 0) {
    article.byline = doc
      .evaluate(config.byline, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
      .iterateNext()
      .textContent || '';
  }

  article.url = doc
    .evaluate(config.url, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
    .iterateNext()
    .textContent || '';

  if (config.image && config.image.length > 0) {
    const introImageUrlNode = doc
      .evaluate(config.image, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
      .iterateNext();

    if (introImageUrlNode) {
      article.introImageUrl = introImageUrlNode.textContent || '';

      article.introImageUrl = article.introImageUrl
        .replace('background-image:url(\'', '')
        .replace('\');', '');

      const index: number = article.introImageUrl.indexOf('?');
      if (index > 0) {
        article.introImageUrl = article.introImageUrl.substring(0, index);
      }
    }
  }

  article.organization = organization;


  return article;
}

async function getHtmlDocument(url: string): Promise<Document> {
  const fullUrl: string = 'api/1.0/News/Articles/' + encodeURIComponent(url);

  const response: Response = await fetch(fullUrl, {
    method: "GET",
  });

  const html: string = await response.text();
  const doc: Document = new DOMParser().parseFromString(html, 'text/html');

  return doc;
}
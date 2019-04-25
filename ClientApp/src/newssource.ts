'use strict';

import { IArticle } from './article';
import { Article } from './article';

export interface INewsSource {
  url: string;
  name: string;
  iconUrl: string;
  urlSections: string[];
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

export async function getArticleList(url: string, organization: string, urlSections: string[] = []): Promise<IArticle[]> {
  const config = await getNewsSourceListConfig(organization);

  let articleTeasers: IArticle[] = [];

  if (urlSections && urlSections.length > 0) {
    for (let urlSection of urlSections) {
      const doc: Document = await getHtmlDocument(url + urlSection);
      const articleTeasersPart: IArticle[] = parseList(doc, config, organization, url);
      articleTeasers = articleTeasers.concat(articleTeasersPart);
    }

    shuffle(articleTeasers);
  }
  else {
    const doc: Document = await getHtmlDocument(url);
    const articleTeasersPart: IArticle[] = parseList(doc, config, organization, url);
    articleTeasers = articleTeasers.concat(articleTeasersPart);
  }

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

      try {
        let articleTeaser: IArticle = parseListItem(doc, config, articleTeaserNode, organization);
        if (!articleTeaser.url.startsWith('https://')) {
          articleTeaser.url = baseUrl + articleTeaser.url;
        }

        const found = articleTeasers.find(t => t.title === articleTeaser.title);
        if (!found && articleTeaser.title && articleTeaser.title.length > 0) {
          articleTeasers.push(articleTeaser);
        }
      }
      catch (e) {
        console.error('Error parsing the HTML based on the configuration: ' + e);
      }
      finally {
        articleTeaserNode = iterator.iterateNext();
      }
    }
  }
  catch (e) {
    console.error('Error: Document tree modified during iteration ' + e);
  }

  return articleTeasers;
}

function parseListItem(doc: Document, config: INewsSourceListConfig, node: Node, organization: string): IArticle {
  let article: IArticle = new Article();

  const titleNode = doc
    .evaluate(config.title, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
    .iterateNext();

  if (titleNode) {
    article.title = titleNode.textContent || '';
  }

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

function shuffle(array: any) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
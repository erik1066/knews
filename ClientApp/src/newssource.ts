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
  url: string;
  excerpt?: string;
  byline?: string;
  authors: string;
  image?: string;
  publishDate: string;
  commentCount?: string;
  paginationUrlFormat?: string;
}

export class NewsSourceListConfig implements INewsSourceListConfig {
  articles = "//main//section//ul//li";
  title = "./header/h2";
  url = "./header//h2/a/@href";
  excerpt = "./header//p[@class='excerpt']";
  byline = undefined;
  authors = "//span[@itemprop='name']";
  image = "./figure//div/@style";
  publishDate = "//time";
  commentCount = "//span[@class='comment-count-number']";
  paginationUrlFormat = "";
}

export async function getArticleList(url: string): Promise<IArticle[]> {
  const config = new NewsSourceListConfig();
  const doc: Document = await getHtmlDocument(url);
  const articleTeasers: IArticle[] = parseList(doc, config);
  return articleTeasers;
}

function parseList(doc: Document, config: INewsSourceListConfig): IArticle[] {

  let articleTeasers: IArticle[] = [];

  const iterator = doc.evaluate(config.articles, doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

  try {
    let articleTeaserNode = iterator.iterateNext();

    while (articleTeaserNode) {
      const articleTeaser: IArticle = parseListItem(doc, config, articleTeaserNode);
      articleTeasers.push(articleTeaser);
      articleTeaserNode = iterator.iterateNext();
    }
  }
  catch (e) {
    console.error('Error: Document tree modified during iteration ' + e);
  }

  return articleTeasers;
}

function parseListItem(doc: Document, config: INewsSourceListConfig, node: Node): IArticle {
  let article: IArticle = new Article();

  article.title = doc
    .evaluate(config.title, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
    .iterateNext()
    .textContent || '';

  article.authors = doc
    .evaluate(config.authors, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
    .iterateNext()
    .textContent || '';

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
    article.introImageUrl = doc
      .evaluate(config.image, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
      .iterateNext()
      .textContent || '';

    article.introImageUrl = article.introImageUrl
      .replace('background-image:url(\'', '')
      .replace('\');', '');
  }

  // if (config.commentCount && config.commentCount.length > 0) {
  //   article.commentCount = doc
  //     .evaluate(config.commentCount, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
  //     .iterateNext()
  //     .textContent || '';
  // }

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
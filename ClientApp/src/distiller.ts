'use strict';

// Distills the Html at a given URL to just its readable components
// TODO: Use xpath from a config file and remove hard-coded strings

import { Article, IArticle } from './article';
import { IArticleConfig } from './article';

export async function distillArticle(url: string, source: string): Promise<Article> {

  const fullUrl: string = 'api/1.0/News/Articles/' + encodeURIComponent(url);
  const config = await getArticleConfig(source);

  const response = await fetch(fullUrl, {
    method: "GET",
  });
  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');

  let article: Article = parseArticle(doc, url, config);

  return article;
}

function parseArticle(doc: Document, url: string, config: IArticleConfig): IArticle {

  const title = doc
    .evaluate(config.title, doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
    .iterateNext()
    .textContent || '';


  let authors = "";

  const authorsNode = doc
    .evaluate(config.authors, doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
    .iterateNext();

  if (authorsNode) {
    authors = authorsNode.textContent || '';
  }
  else {
    authors = '';
  }

  let image: string = "";

  if (config.introImage && config.introImage.length > 0) {
    const imageNode = doc
      .evaluate(config.introImage, doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
      .iterateNext();

    if (imageNode) {
      image = imageNode.textContent || '';
    }
    else {
      image = '';
    }
  }

  let subtitle = "";
  if (config.subtitle && config.subtitle.length > 0) {
    const subtitleNode = doc
      .evaluate(config.subtitle, doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
      .iterateNext();

    if (subtitleNode) {
      subtitle = subtitleNode.textContent || '';
    }
    else {
      subtitle = '';
    }
  }

  let article: Article = {
    organization: getOrganization(doc),
    url: decodeURIComponent(url),
    title: title,
    introImageUrl: image,
    byline: subtitle,
    authors: authors,
    paragraphs: getParagraphs(doc, config)
  };

  return article;
}

async function getArticleConfig(source: string): Promise<IArticleConfig> {
  const response: Response = await fetch('api/1.0/Configuration/articles/' + encodeURIComponent(source), {
    method: "GET",
  });

  const json = await response.json();
  let config: IArticleConfig = json as IArticleConfig;

  return config;
}

function getOrganization(doc: Document): string {

  const title = doc
    .evaluate("//title", doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
    .iterateNext()
    .textContent || '';

  return title;
}

function getParagraphs(doc: Document, config: IArticleConfig): string[] {

  let paragraphs: string[] = [];

  const iterator = doc.evaluate(config.paragraphs, doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

  try {
    let thisNode = iterator.iterateNext();

    while (thisNode) {
      const paragraph = thisNode.textContent || ''; // TODO: Implement ?? ''; when available
      // console.info(paragraph);

      paragraphs.push(paragraph);
      thisNode = iterator.iterateNext();
    }
  }
  catch (e) {
    console.error('Error: Document tree modified during iteration ' + e);
  }

  return paragraphs;
}
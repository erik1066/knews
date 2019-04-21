'use strict';

export interface IArticle {
  organization: string,
  title: string,
  byline: string,
  url: string,
  authors: string,
  introImageUrl: string,
  paragraphs: string[]
}

export class Article implements IArticle {
  organization: string = "";
  title: string = "";
  byline: string = "";
  url: string = "";
  authors: string = "";
  introImageUrl: string = "";
  paragraphs: string[] = [];
}

export interface IArticleConfig {
  title: string;
  subtitle?: string;
  firstPara?: string;
  paragraphs: string;
  footer?: string;
  introImage?: string;
  authors: string;
  publishDate: string;
  upperDeck?: string;
  commentCount?: number;
  commentsUrlFormat?: string;
  paginationUrlFormat?: string;
}
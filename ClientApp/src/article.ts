'use strict';

export interface IArticle {
  organization: string,
  title: string,
  byline: string,
  url: string,
  authors: string[],
  paragraphs: string[]
}

export class Article implements IArticle {
  organization: string = "";
  title: string = "";
  byline: string = "";
  url: string = "";
  authors: string[] = [];
  paragraphs: string[] = [];
}
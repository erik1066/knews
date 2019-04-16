'use strict';

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as distiller from './distiller';

// interfaces
interface IState {
  loading: boolean;
  loadingMessage: string;
  title: string;
  byline: string;
  paragraphs: string[];
  url: string;
}

interface IProps {} // tslint:disable-line


class App extends Component<IProps, IState> {

  constructor (props: object) {
    super(props);

    this.state = {
      loading: true,
      loadingMessage: 'Downloading article...',
      title: '',
      byline: '',
      paragraphs: [],
      url: ''
    };

    const article = distiller.distill("")
    .then(article => {
        this.setState({
          loading: false,
          loadingMessage: '',
          title: article.title,
          byline: article.byline,
          paragraphs: article.paragraphs,
          url: article.url
        })
      });
  }
  
  render() {

    return (
      <div>

        <input type="text" value={this.state.url} />
        <button>GO</button>

        <h1>{ this.state.title }</h1>

        <article>
          <h2>{ this.state.byline }</h2>

          <ArticleBody paragraphs={this.state.paragraphs} />
          
        </article>
        
      </div>
    );
  }
}

const ArticleBody = (props : { paragraphs: string[] }) => { 

  const paragraphs = props.paragraphs.map((paragraph, index) => {

      return (
        <p>
          {paragraph}
        </p>
      );
  });

  return (
    <div>
      {paragraphs}
    </div>
  );
}

export default App;

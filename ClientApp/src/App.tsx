'use strict';

import React, { Component } from 'react';
import './App.css';
import * as distiller from './distiller';
import SearchAppBar from './SearchAppBar';

// interfaces
interface IState {
  loading: boolean;
  loadingMessage: string;
  title: string;
  byline: string;
  paragraphs: string[];
  url: string;
}

interface IProps { } // tslint:disable-line

class App extends Component<IProps, IState> {

  constructor(props: object) {
    super(props);

    this.state = {
      loading: true,
      loadingMessage: 'Downloading article...',
      title: '',
      byline: '',
      paragraphs: [],
      url: ''
    };
  }

  handleClick = () => {
    distiller.distill(this.state.url)
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

  handleUrlChange = (event: any) => {
    let newState = JSON.parse(JSON.stringify(this.state));
    newState.url = event.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <SearchAppBar url={this.state.url} handleUrlSubmit={this.handleClick} handleUrlChange={this.handleUrlChange}></SearchAppBar>
        
        <main>
          <h1>{this.state.title}</h1>
          <article>
            <h2>{this.state.byline}</h2>
            <ArticleBody paragraphs={this.state.paragraphs} />
          </article>
        </main>
      </div>
    );
  }
}

const ArticleBody = (props: { paragraphs: string[] }) => {

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

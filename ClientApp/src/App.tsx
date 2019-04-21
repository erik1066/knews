'use strict';

import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as distiller from './distiller';
import SearchAppBar from './SearchAppBar';
import { IArticle } from './article';
import { INewsSource } from './newssource';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as newsSources from './newssource';

// interfaces
interface IState {
  loading: boolean;
  loadingMessage: string;
  url: string;
  drawerOpen: boolean;
  newsSources: INewsSource[];
  articleList: IArticle[];
  article: IArticle;
}

export interface IProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: '100vh',
      overflow: 'auto',
    },
    appBarSpacer: theme.mixins.toolbar,
  });

const DecoratedApp = withStyles(styles)(
  class App extends Component<IProps, IState> {

    constructor(props: IProps) {
      super(props);

      this.state = {
        loading: true,
        loadingMessage: 'Downloading article...',
        url: '',
        drawerOpen: true,
        newsSources: [],
        articleList: [],
        article: {
          organization: '',
          title: '',
          byline: '',
          url: '',
          authors: '',
          introImageUrl: '',
          paragraphs: []
        }
      };

      this.getNewsSources();
    }

    getNewsSources = async () => {

      const fullUrl: string = 'api/1.0/News/Sources';

      const response = await fetch(fullUrl, {
        method: "GET",
      });
      const json = await response.json();
      let sources: INewsSource[] = json as INewsSource[];//JSON.parse(json);

      this.setState({
        loading: false,
        loadingMessage: '',
        url: this.state.url,
        drawerOpen: this.state.drawerOpen,
        newsSources: sources,
        articleList: [],
        article: this.state.article
      });
    };

    handleUrlSubmit = (event: any, url: string) => {
      // TODO: Consolidate this and the handleClick() method below
      distiller.distillArticle(url)
        .then(article => {
          this.setState({
            loading: false,
            loadingMessage: '',
            url: article.url,
            drawerOpen: this.state.drawerOpen,
            newsSources: this.state.newsSources,
            articleList: [], // clear, load an article
            article: {
              organization: article.organization,
              title: article.title,
              byline: article.byline,
              introImageUrl: article.introImageUrl,
              url: article.url,
              authors: article.authors,
              paragraphs: article.paragraphs
            }
          })
        });
    }

    handleClick = () => {
      distiller.distillArticle(this.state.url)
        .then(article => {
          this.setState({
            loading: false,
            loadingMessage: '',
            url: article.url,
            drawerOpen: this.state.drawerOpen,
            newsSources: this.state.newsSources,
            articleList: [], // clear, load an article
            article: {
              organization: article.organization,
              title: article.title,
              byline: article.byline,
              introImageUrl: article.introImageUrl,
              url: article.url,
              authors: article.authors,
              paragraphs: article.paragraphs
            }
          })
        });
    }

    handleNewsSourceSelection = () => {
      let newState = JSON.parse(JSON.stringify(this.state));

      newsSources.getArticleList("https://arstechnica.com")
        .then(list => {
          newState.articleList = list;
          newState.article = {};
          this.setState(newState);
        });
    }

    handleUrlChange = (event: any) => {
      let newState = JSON.parse(JSON.stringify(this.state));
      newState.url = event.target.value;
      this.setState(newState);
    }

    handleDrawerOpen = () => {
      let newState = JSON.parse(JSON.stringify(this.state));
      newState.drawerOpen = true;
      this.setState(newState);
    };

    handleDrawerClose = () => {
      let newState = JSON.parse(JSON.stringify(this.state));
      newState.drawerOpen = false;
      this.setState(newState);
    };

    render() {

      const { classes } = this.props;

      return (
        <div>
          <CssBaseline />
          <SearchAppBar
            newsSources={this.state.newsSources}
            article={this.state.article}
            articles={this.state.articleList}
            url={this.state.url}
            open={this.state.drawerOpen}
            handleNewsSourceSelection={this.handleNewsSourceSelection}
            handleDrawerOpen={this.handleDrawerOpen}
            handleDrawerClose={this.handleDrawerClose}
            handleUrlSubmit={this.handleUrlSubmit}
            handleUrlChange={this.handleUrlChange}>
          </SearchAppBar>
        </div>
      );
    }
  }
);

export default DecoratedApp;

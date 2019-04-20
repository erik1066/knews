'use strict';

import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as distiller from './distiller';
import SearchAppBar from './SearchAppBar';
import { IArticle } from './article';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

// interfaces
interface IState {
  loading: boolean;
  loadingMessage: string;
  url: string;
  drawerOpen: boolean;
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
        article: {
          organization: '',
          title: '',
          byline: '',
          url: '',
          authors: [],
          paragraphs: []
        }
      };
    }

    handleClick = () => {
      distiller.distillArticle(this.state.url)
        .then(article => {
          this.setState({
            loading: false,
            loadingMessage: '',
            url: article.url,
            drawerOpen: this.state.drawerOpen,
            article: {
              organization: article.organization,
              title: article.title,
              byline: article.byline,
              url: article.url,
              authors: article.authors,
              paragraphs: article.paragraphs
            }
          })
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
            article={this.state.article}
            url={this.state.url}
            open={this.state.drawerOpen}
            handleDrawerOpen={this.handleDrawerOpen}
            handleDrawerClose={this.handleDrawerClose}
            handleUrlSubmit={this.handleClick}
            handleUrlChange={this.handleUrlChange}>
          </SearchAppBar>
        </div>
      );
    }
  }
);

export default DecoratedApp;

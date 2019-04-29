import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemAvatar } from '@material-ui/core';

import { IArticle } from './article';
import { INewsSource } from './newssource';

import ArticleBody from './ArticleBody';
import ArticleListBody from './ArticleListBody';

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({

    root: {
      display: 'flex',
    },
    grow: {
      flexGrow: 1,
    },
    avatar: {
      margin: 4,
      height: 24,
      width: 24
    },

    articleParagraph: {
      fontSize: 32
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
    },

    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 300,
        '&:focus': {
          width: 300,
        },
      },
    },

    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing.unit * 8,
      [theme.breakpoints.up('xs')]: {
        width: 0,
      },
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 8,
      },
      
    },
    appBarSpacer: theme.mixins.toolbar,
    titleSpacer: {
      height: '1rem',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: '100vh',
      overflow: 'auto',
    },

  });

export interface Props extends WithStyles<typeof styles> {
  open: boolean,
  url: string,
  article: IArticle,
  articles: IArticle[],
  newsSources: INewsSource[],
  selectedNewsSource?: INewsSource,
  handleUrlChange(event: any): void,
  handleUrlSubmit(event: any, url: string): void,
  handleNewsSourceSelection(event: any, source: INewsSource): void,
  handleDrawerOpen(event: any): void,
  handleDrawerClose(event: any): void,
}

function SearchAppBar(props: Props) {

  const { classes } = props;
  let url = props.url;

  const sources = props.newsSources.map((source, index) => {

    return (
      <ListItem selected={props.selectedNewsSource && props.selectedNewsSource.name === source.name} button onClick={(event) => {
        props.handleNewsSourceSelection(event, source);
      }}>
        <ListItemAvatar>
          <Avatar
            className={classes.avatar}
            alt={source.name}
            src={source.iconUrl}
          />
        </ListItemAvatar>
        <ListItemText primary={source.name} />
      </ListItem>
    );
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={classNames(classes.appBar, props.open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>

          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={props.handleDrawerOpen}
            className={classNames(
              classes.menuButton,
              props.open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap>
            Knews (alpha)
          </Typography>

          <div className={classes.grow} />
          <div className={classes.search}>
            <InputBase
              onChange={props.handleUrlChange}
              onKeyPress={(event) => props.handleUrlSubmit(event, props.url)}
              placeholder="Enter a URL…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !props.open && classes.drawerPaperClose),
        }}
        open={props.open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={props.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {sources}
        </List>
        <Divider />
      </Drawer>

      {props.article && props.article.title &&

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          {props.selectedNewsSource &&
            <Typography variant="h5" gutterBottom component="p">
              {props.selectedNewsSource.name}
            </Typography>
          }
          <Divider />
          <div className={classes.titleSpacer} />

          <div>
            <Typography variant="h4" gutterBottom component="h1">
              {props.article.title}
            </Typography>

            <Typography variant="h6" gutterBottom component="h2">
              {props.article.byline}
            </Typography>

            <div className={classes.titleSpacer} />

            <ArticleBody article={props.article}></ArticleBody>
          </div>
        </main>
      }

      {props.articles && props.articles.length > 0 &&
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          {props.selectedNewsSource &&
            <Typography variant="h5" gutterBottom component="p">
              {props.selectedNewsSource.name}
            </Typography>
          }
          <Divider />
          <div className={classes.titleSpacer} />

          <div>
            <div className={classes.titleSpacer} />
            <ArticleListBody handleUrlSubmit={props.handleUrlSubmit} articles={props.articles}></ArticleListBody>
          </div>
        </main>
      }

      {!props.article && !props.articles &&
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
        </main>
      }

    </div>
  );
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(SearchAppBar);
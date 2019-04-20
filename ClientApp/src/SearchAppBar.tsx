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

import ArticleBody from './ArticleBody';

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
      margin: 5,
      height: 32,
      width: 32
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
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 9,
      },
    },
    appBarSpacer: theme.mixins.toolbar,
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
  handleUrlChange(event: any): void,
  handleUrlSubmit(event: any): void,
  handleDrawerOpen(event: any): void,
  handleDrawerClose(event: any): void,
}

function SearchAppBar(props: Props) {

  const { classes } = props;
  let url = props.url;
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
            Knews
          </Typography>

          <div className={classes.grow} />
          <div className={classes.search}>
            <InputBase
              onChange={props.handleUrlChange}
              onKeyPress={props.handleUrlSubmit}
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
          <ListItem button>
            {/* <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon> */}
            <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                alt="Ars Technica"
                src={`https://cdn.arstechnica.net/favicon.ico`}
              />
            </ListItemAvatar>
            <ListItemText primary="Ars Technica" />
          </ListItem>

          <ListItem button>
            <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                alt="AnandTech"
                src={`https://www.anandtech.com/favicon.ico`}
              />
            </ListItemAvatar>
            <ListItemText primary="AnandTech" />
          </ListItem>

          <ListItem button>
            <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                alt="The Register"
                src={`https://www.theregister.co.uk/design_picker/4ee431b84ac2d23c13376f753522acd7ecbb9b47/graphics/favicons/apple-touch-icon.png`}
              />
            </ListItemAvatar>
            <ListItemText primary="The Register" />
          </ListItem>

          <ListItem button>
            <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                alt="Hacker News"
                src={`https://news.ycombinator.com/favicon.ico`}
              />
            </ListItemAvatar>
            <ListItemText primary="Hacker News" />
          </ListItem>

          <ListItem button>
            <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                alt="NPR"
                src={`https://media.npr.org/templates/favicon/favicon-180x180.png`}
              />
            </ListItemAvatar>
            <ListItemText primary="NPR" />
          </ListItem>

          <ListItem button>
            <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                alt="New York Times"
                src={`https://www.nytimes.com/vi-assets/static-assets/apple-touch-icon-319373aaf4524d94d38aa599c56b8655.png`}
              />
            </ListItemAvatar>
            <ListItemText primary="New York Times" />
          </ListItem>

          <ListItem button>
            <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                alt="AJC"
                src={`https://www.ajc.com/r/PortalConfig/np-one/assets-one/myajc/images/favicon-apple-touch-icon.png`}
              />
            </ListItemAvatar>
            <ListItemText primary="AJC" />
          </ListItem>

          <ListItem button>
            <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                alt="Vox"
                src={`https://cdn.vox-cdn.com/uploads/hub/sbnu_logo_minimal/441/touch_icon_iphone_retina_1000_yellow.755.png`}
              />
            </ListItemAvatar>
            <ListItemText primary="Vox" />
          </ListItem>

        </List>
        <Divider />
        <List>

        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Typography variant="h3" gutterBottom component="h1">
          {props.article.title}
        </Typography>

        <Typography variant="h4" gutterBottom component="h2">
          {props.article.byline}
        </Typography>

        <div className={classes.appBarSpacer} />

        <ArticleBody article={props.article}></ArticleBody>

      </main>

    </div>
  );
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(SearchAppBar);
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { IArticle } from './article';

const styles = (theme: Theme) =>
  createStyles({
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
  });

interface ArticleListBodyProps extends WithStyles<typeof styles> {
  articles: IArticle[],
  handleUrlSubmit(event: any, url: string): void
}

const ArticleListBody = (props: ArticleListBodyProps) => {

  const { classes } = props;
  const articles = props.articles.map((article, index) => {

    return (
      <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
        <Card className={classes.card}>

          <CardMedia
            className={classes.cardMedia}
            image={article.introImageUrl} // eslint-disable-line max-len
            title={article.title}
          />

          <CardContent className={classes.cardContent}>
            <Typography component="h2" variant="h6">
              {article.title}
            </Typography>
          </CardContent>
          <CardActions>
            {/* TODO: Make clickable */}
            <Button size="small" color="primary" onClick={(event) => props.handleUrlSubmit(event, article.url)}>
              View
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });

  return (
    <Grid container spacing={40}>
      {articles}
    </Grid>
  );
}

ArticleListBody.propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(ArticleListBody);
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { IArticle } from './article';

const styles = (theme: Theme) =>
  createStyles({
    articleParagraph: {
      fontSize: 20,
      marginBottom: 25
    },
    card: {
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
  });

interface ArticleBodyProps extends WithStyles<typeof styles> {
  article: IArticle
}

const ArticleBody = (props: ArticleBodyProps) => {

  const { classes } = props;
  const paragraphs = props.article.paragraphs.map((paragraph, index) => {

    return (
      <Typography
        variant="body1"
        className={classes.articleParagraph}
        component="p"
        gutterBottom>
        {paragraph}
      </Typography>
    );
  });

  return (
    <Grid container spacing={40}>
      <Grid item sm={12} md={12} lg={12}>

        {props.article.introImageUrl && props.article.introImageUrl.length > 0 &&
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={props.article.introImageUrl} // eslint-disable-line max-len
              title={props.article.title}
            />
          </Card>
        }

        {paragraphs}
      </Grid>
    </Grid>
  );
}

ArticleBody.propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(ArticleBody);
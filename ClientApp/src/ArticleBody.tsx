'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { IArticle } from './article';

const styles = (theme: Theme) =>
  createStyles({
    articleParagraph: {
      fontSize: 20,
      marginBottom: 25
    }
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
    <div>
      {paragraphs}
    </div>
  );
}

ArticleBody.propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(ArticleBody);
import React, { Fragment } from "react";
import NoImg from "../img/no-img.png";
import PropTypes from "prop-types";

//MUI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  card: {
    display: "flex",
    marginBottom: "20px",
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: "25px",
  },
  cover: {
    minWidth: 200,
    objectFit: "cover",
  },
  handle: {
    width: "60px",
    height: "18px",
    backgroundColor: "#00bcd4",
    marginBottom: "7px",
  },
  date: {
    height: "14px",
    width: "100px",
    backgroundColor: "rgba(0,0,0,0.3)",
    marginBottom: "10px",
  },
  fullLine: {
    height: "15px",
    width: "90%",
    marginBottom: "10px",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  halfLine: {
    height: "15px",
    width: "50%",
    marginBottom: "10px",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});

const ScreamSkeleton = (props) => {
  const { classes } = props;
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

ScreamSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScreamSkeleton);

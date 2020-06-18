import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import NoImg from "../img/no-img.png";

import Paper from "@material-ui/core/Paper";

import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
  ...theme.spreadThis,

  handle: {
    height: "20px",
    backgroundColor: "#00bcd4",
    width: "60px",
    margin: "0 auto 7px auto",
  },
  fullLine: {
    height: "15px",
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    marginBottom: "10px",
  },
  halfLine: {
    height: "15px",
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "50%",
    marginBottom: "10px",
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: theme.palette.primary.main,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
});
const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImg} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.hanldle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <LocationOn color="primary"></LocationOn> <span>Location</span>
          <hr />
          <LinkIcon color="primary" />
          https://website.com
          <hr />
          <CalendarToday color="primary" /> Joined date
        </div>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Comments from "./Comments";
//MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//Icons
import CloseIcon from "@material-ui/icons/Close";

//Redux
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";

import ChatIcon from "@material-ui/icons/Chat";
import CommentForm from "./CommentForm";
const styles = (theme) => ({
  ...theme.spreadThis,
  invisibleSeparator: {
    border: "none",
    margin: "4px",
  },
  visibleSeparator: {
    width: "100%",
    borderButtom: "1px solid rgba(0,0,0,0,1)",
    MarginBottom: "20px",
  },
  profileImage: {
    maxWidth: "200px",
    height: "200px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  DialogContent: {
    padding: "20px",
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },

  spinerDiv: {
    textAlign: "center",
    MarginTop: "50px",
    MarginBottom: "50px",
  },
});

class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, screamId, userImage } = this.props;
    const newPath = `/users/${userHandle}/scream/${screamId}`;

    if (oldPath === newPath) {
      oldPath = `/users/${userHandle}`;
    }

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getScream(this.props.screamId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,

        userImage,
        userHandle,
        comments,
      },
      UI: { loading },
    } = this.props;

    const DialogMarkup = loading ? (
      <div className={classes.spinerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={2}>
        <Grid item sm={5}>
          <img
            src={userImage}
            alt="profile"
            className={classes.profileImage}
          ></img>
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator}></hr>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm screamId={screamId} />
        <Comments comments={comments} userImage={userImage} />
      </Grid>
    );

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand scream"
          tipClassName={classes.expandButton}
        >
          <ChatIcon color="primary"></ChatIcon>
        </MyButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.DialogContent}>
            {DialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.ui,
  user: state.user,
});

const mapActionsToProps = {
  getScream,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));

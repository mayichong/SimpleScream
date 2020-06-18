import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../img/student.png";

import { Link } from "react-router-dom";
//MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/BUtton";
import Textfield from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
//Redux Stuff
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";
const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    margin: "20px auto 20px auto",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: "20px",
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "10",
  },
  progress: {
    position: "absolute",
  },
};
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",

      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img
            src={AppIcon}
            alt="student"
            sizes="xs"
            height="140"
            className={classes.image}
          ></img>
          <Typography variant="h2" className={classes.pageTitle}>
            Sign Up
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <Textfield
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              helperText={errors.email}
              error={errors.email ? true : false}
            ></Textfield>
            <Textfield
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
              helperText={errors.password}
              error={errors.password ? true : false}
            ></Textfield>
            <Textfield
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
            ></Textfield>
            <Textfield
              id="handle"
              name="handle"
              type="text"
              label="Username"
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
              helperText={errors.handle}
              error={errors.handle ? true : false}
            ></Textfield>
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Sign Up
              {loading && (
                <CircularProgress
                  className={classes.progress}
                  size={30}
                ></CircularProgress>
              )}
            </Button>
            <br />
            <small>
              Already have an account? Sign Up <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.ui,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(Signup)
);

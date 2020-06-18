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
import { loginUser } from "../redux/actions/userActions";
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
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
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
            Login
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
              Login
              {loading && (
                <CircularProgress
                  className={classes.progress}
                  size={30}
                ></CircularProgress>
              )}
            </Button>
            <br />
            <small>
              don't have an account? sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.ui,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));

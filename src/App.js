import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/layout/Navbar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
import User from "./pages/User";

axios.defaults.baseURL =
  "https://us-central1-onestory-2319d.cloudfunctions.net/api";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
});

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar></Navbar>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/signup" component={Signup} />
                <Route exact path="/users/:handle" component={User} />
                <Route
                  exact
                  path="/users/:handle/scream/:screamId"
                  component={User}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;

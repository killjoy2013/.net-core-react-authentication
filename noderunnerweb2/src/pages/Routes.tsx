import * as React from "react";
import { Router, Switch, Route } from "react-router";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { createBrowserHistory } from "history";
import fetchproxy from "../helpers/fetch";
import Cars from "./Cars";
import Cities from "./Cities";
import Home from "./Home";
import { AxiosResponse, AxiosError } from "axios";
import {
  AppBar,
  Toolbar,
  makeStyles,
  createStyles,
  Theme
} from "@material-ui/core";

const history = createBrowserHistory();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    href: {
      margin: 20,
      color: "white"
    }
  })
);

const Routes = () => {
  const classes = useStyles({});
  return (
    <Router history={history}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Link className={classes.href} to="/">
              Home
            </Link>
            <Link className={classes.href} to="/cars">
              Cars
            </Link>
            <Link className={classes.href} to="/cities">
              Cities
            </Link>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                let form: any = document.createElement("FORM");
                form.setAttribute("method", "POST");
                form.setAttribute("action", "/Home/Logout");
                document.body.appendChild(form);
                form.submit();
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/cars">
            <Cars />
          </Route>
          <Route path="/cities">
            <Cities />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;

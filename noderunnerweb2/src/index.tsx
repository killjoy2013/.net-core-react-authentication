import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { getClient } from "./ApolloProxy";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import fetchproxy from "../src/helpers/fetch";
import { AxiosResponse } from "axios";

fetchproxy
  .controllerRequest("/authorization", null)
  .then((response: AxiosResponse) => {
    fetchproxy.configfetch(
      response.data.accessToken,
      response.data.refreshToken
    );
    const nodeserviceApolloClient = getClient();

    ReactDOM.render(
      <ApolloProvider client={nodeserviceApolloClient}>
        <App />
      </ApolloProvider>,
      document.getElementById("root")
    );
  })
  .catch((error: any) => {
    console.error("fetch error ", error);
  });

// promise.done((response:any) => {
//     fetchproxy.configfetch(response.accessToken, response.refreshToken);
//     const nodeserviceApolloClient = getClient();

//     ReactDOM.render(
//         <ApolloProvider client={nodeserviceApolloClient}>
//             <App />
//         </ApolloProvider>,
//         document.getElementById("root")
//     );
// });

// promise.fail(function (jqXhr: any, textStatus: any, errorThrown: any) {
//     console.error("fetch error ", errorThrown)
// });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

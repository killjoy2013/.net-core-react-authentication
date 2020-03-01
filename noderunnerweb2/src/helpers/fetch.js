import axios, { AxiosResponse } from "axios";

class FetchProxy {
  static instance;
  constructor() {
    if (this.instance) {
      return this.instance;
    }
    this.access_token = null;
    this.refresh_token = null;
    this.instance = this;
  }

  configfetch = (access_token_received, refresh_token_received) => {
    this.access_token = access_token_received;
    this.refresh_token = refresh_token_received;
  };

  controllerRequest = (url, data) => {
    return axios({
      url,
      method: "POST",
      crossDomain: true,
      cache: false,
      contentType: "application/json",
      data: data == null ? null : JSON.stringify(data)
    });

    // return $.ajax({
    //   url: url,
    //   type: "POST",
    //   crossDomain: true,
    //   cache: false,
    //   contentType: "application/json",
    //   data: data == null ? null : JSON.stringify(data)
    // });
  };

  APIRequest = (url, data) => {
    var deferred = axios.Deferred();

    var promise = axios({
      url: url,
      method: "POST",
      crossDomain: true,
      cache: false,
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + this.access_token
      },
      data: JSON.stringify(data)
    });

    // var promise = $.ajax({
    //   url: url,
    //   type: "POST",
    //   crossDomain: true,
    //   cache: false,
    //   contentType: "application/json",
    //   headers: {
    //     Authorization: "Bearer " + this.access_token
    //   },
    //   data: JSON.stringify(data)
    // });
    promise.done(response => {
      deferred.resolve(response);
    });
    promise.fail((jqXhr, textStatus, errorThrown) => {
      if (jqXhr.status == 401) {
        var deferred_refresh = axios.Deferred();

        var refresh_request_promise = this.controllerRequest("/refresh", {
          access_token: this.access_token,
          refresh_token: this.refresh_token
        });
        refresh_request_promise.done(response => {
          deferred_refresh.resolve(response);
        });
        refresh_request_promise.fail(() => {
          deferred_refresh.reject();
        });
        var refreshPromise = deferred_refresh.promise();
        refreshPromise.done(refresh_response => {
          this.access_token = refresh_response.access_token;
          this.refresh_token = refresh_response.refresh_token;

          var retryPromise = axios({
            url: url,
            method: "POST",
            crossDomain: true,
            cache: false,
            contentType: "application/json",
            headers: {
              Authorization: "Bearer " + this.access_token
            },
            data: JSON.stringify(data)
          });

          // var retryPromise = $.ajax({
          //   url: url,
          //   type: "POST",
          //   crossDomain: true,
          //   cache: false,
          //   contentType: "application/json",
          //   headers: {
          //     Authorization: "Bearer " + this.access_token
          //   },
          //   data: JSON.stringify(data)
          // });
          retryPromise.done(response => {
            deferred.resolve(response);
          });
          retryPromise.fail((jqXhrRetry, textStatusRetry, errorThrownRetry) => {
            deferred.reject(jqXhrRetry, textStatusRetry, errorThrownRetry);
          });
        });
        refreshPromise.fail(
          (jqXhrRefresh, textStatusRefresh, errorThrownRefresh) => {
            deferred.reject(
              jqXhrRefresh,
              textStatusRefresh,
              errorThrownRefresh
            );
          }
        );
      } else {
        deferred.reject(jqXhr, textStatus, errorThrown);
      }
    });
    return deferred.promise();
  };
}

let proxyInstance = new FetchProxy();

export default proxyInstance;

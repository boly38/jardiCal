class ApiV0 {
  static debug = false;

  static version(onSuccess, onFailure) {
    fetch('/version')
      .then(async response => {
          var versionResponse = null;
          try {
            versionResponse = await response.json();
            if (ApiV0.debug) {
              console.log("RESPONSE", versionResponse);
            }
          } catch (jsonException) {
          }
          if (!response.ok) {
            onFailure();
            return;
          }
          onSuccess(versionResponse);
      })
      .catch((authError) => {
        if (ApiV0.debug) {
          console.log("ERR", authError);
        }
        onFailure(authError)
      });
  }

  static getDocs(options, onSuccess, onFailure) {
    const queryString = ApiV0.objToQueryString(options);
    fetch(`/api/v0/docs?${queryString}`)
    .then(async response => {
      const docsResults = await response.json();
      if (ApiV0.debug) {
        console.log("RESPONSE", docsResults);
      }
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (docsResults && docsResults.details) || (docsResults && docsResults.message) || response.status;
        return Promise.reject(error);
      }
      onSuccess(docsResults);
    })
    .catch((getError) => {
      if (ApiV0.debug) {
        console.log("ERR", getError);
      }
      onFailure(getError);
    })
  }

  static objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
  }

}

export default ApiV0;
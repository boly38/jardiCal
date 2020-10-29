import queryString from 'query-string';

class ApiV0 {
  static debug = false;

  static about() {
    return new Promise((resolve, reject) => {
      fetch('/api/v0/about')
      .then(async response => {
          var aboutResponse = null;
          try {
            aboutResponse = await response.json();
            if (ApiV0.debug) {
              console.log("RESPONSE", aboutResponse);
            }
          } catch (jsonException) {
          }
          if (!response.ok) {
            reject();
            return;
          }
          resolve(aboutResponse);
      })
      .catch((authError) => {
          if (ApiV0.debug) { console.log("ERR", authError); }
          reject(authError)
        });
    });
  }

  static getDocs(options) {
    return new Promise((resolve, reject) => {
      const getQueryString = queryString.stringify(options);
      fetch(`/api/v0/docs?${getQueryString}`)
      .then(async response => {
        const docsResults = await response.json();
        if (ApiV0.debug) { console.log("RESPONSE", docsResults); }
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (docsResults && docsResults.details) || (docsResults && docsResults.message) || response.status;
          return Promise.reject(error);
        }
        resolve(docsResults);
      })
      .catch((getError) => {
        if (ApiV0.debug) { console.log("ERR", getError); }
        reject(getError);
      });
    });
  }

  static getContribs(options) {
    return new Promise((resolve, reject) => {
      const getQueryString = queryString.stringify(options);
      fetch(`/api/v0/contributions?${getQueryString}`)
      .then(async response => {
        const contribsResults = await response.json();
        if (ApiV0.debug) { console.log("RESPONSE", contribsResults); }
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (contribsResults && contribsResults.details) || (contribsResults && contribsResults.message) || response.status;
          return Promise.reject(error);
        }
        resolve(contribsResults);
      })
      .catch((getError) => {
        if (ApiV0.debug) { console.log("ERR", getError); }
        reject(getError);
      });
    });
  }

  static samples() {
    return new Promise((resolve, reject) => {
      fetch('/api/v0/docs/samples', { method: 'POST' })
      .then(async response => {
          var samplesResponse = null;
          try {
            samplesResponse = await response.json();
            if (ApiV0.debug) { console.log("RESPONSE", samplesResponse); }
          } catch (jsonException) {
          }
          if (!response.ok) {
            reject();
            return;
          }
          resolve(samplesResponse.count);
      })
      .catch((authError) => {
        if (ApiV0.debug) { console.log("ERR", authError); }
        reject(authError)
      });
    });
  }

  static contribute(entryToAdd) {
    return new Promise((resolve, reject) => {
        fetch('/api/v0/contributions',
          { method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(entryToAdd) })
        .then(async response => {
            var contribResponse = null;
            try {
              contribResponse = await response.json();
              if (ApiV0.debug) { console.log("RESPONSE", contribResponse); }
            } catch (jsonException) {
            }
            if (!response.ok) {
              reject("Impossible de contribuer - "+response.status);
              return;
            }
            resolve(contribResponse);
        })
        .catch((authError) => {
          if (ApiV0.debug) { console.log("ERR", authError); }
          reject(authError)
        });
    });
  }

  static removeAllDocs() {
    return new Promise((resolve, reject) => {
      fetch(`/api/v0/docs`, { method: 'DELETE' })
      .then(async response => {
        const docsResults = await response.json();
        if (ApiV0.debug) { console.log("RESPONSE", docsResults); }
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (docsResults && docsResults.details) || (docsResults && docsResults.message) || response.status;
          return Promise.reject(error);
        }
        resolve(docsResults.count);
      })
      .catch((getError) => {
        if (ApiV0.debug) { console.log("ERR", getError); }
        reject(reject);
      });
    });
  }

  static removeAllContribs() {
    return new Promise((resolve, reject) => {
      fetch(`/api/v0/contributions`, { method: 'DELETE' })
      .then(async response => {
        const docsResults = await response.json();
        if (ApiV0.debug) { console.log("RESPONSE", docsResults); }
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (docsResults && docsResults.details) || (docsResults && docsResults.message) || response.status;
          return Promise.reject(error);
        }
        resolve(docsResults.count);
      })
      .catch((getError) => {
        if (ApiV0.debug) { console.log("ERR", getError); }
        reject(getError);
      });
    });
  }

}

export default ApiV0;
import queryString from 'query-string';

class ApiV0 {
  static debug = false;

  static about() {
    return new Promise((resolve, reject) => {
      fetch('/api/v0/about')
      .catch(reject)
      .then(response => ApiV0._response(response, resolve, reject));
    });
  }

  static getDocs(options) {
    return new Promise((resolve, reject) => {
      const getQueryString = queryString.stringify(options);
      fetch(`/api/v0/docs?${getQueryString}`)
      .catch(reject)
      .then(response => ApiV0._response(response, resolve, reject));
    });
  }

  static getContribs(options) {
    return new Promise((resolve, reject) => {
      const getQueryString = queryString.stringify(options);
      fetch(`/api/v0/contributions?${getQueryString}`)
      .catch(reject)
      .then(response => ApiV0._response(response, resolve, reject));
    });
  }

  static samples() {
    return new Promise((resolve, reject) => {
      fetch('/api/v0/docs/samples', { method: 'POST' })
      .catch(reject)
      .then(response => ApiV0._response(response, resolve, reject));
    });
  }

  static contribute(entryToAdd) {
    return new Promise((resolve, reject) => {
      fetch('/api/v0/contributions',
        { method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(entryToAdd) })
      .catch(reject)
      .then(response => ApiV0._response(response, resolve, reject));;
    });
  }

  static removeDocument(documentId) {
    return new Promise((resolve, reject) => {
      fetch('/api/v0/docs/' + documentId, { method: 'DELETE' })
      .catch(reject)
      .then(response => ApiV0._response(response, resolve, reject));
    });
  }

  static removeAllDocs() {
    return new Promise((resolve, reject) => {
      fetch(`/api/v0/docs/all`, { method: 'DELETE' })
      .catch(reject)
      .then(response => ApiV0._response(response, resolve, reject));;
    });
  }

  static removeAllContribs() {
    return new Promise((resolve, reject) => {
      fetch(`/api/v0/contributions`, { method: 'DELETE' })
      .catch(reject)
      .then(response => ApiV0._response(response, resolve, reject));
    });
  }

  static acceptContrib(contribId) {
    return new Promise((resolve, reject) => {
      fetch('/api/v0/contributions/' + contribId + '/accept', ApiV0._jsonPost())
      .catch(reject)
      .then(response => ApiV0._response(response, resolve, reject));
    });
  }

  static rejectContrib(contribId) {
    return new Promise((resolve, reject) => {
      fetch('/api/v0/contributions/' + contribId + '/reject', ApiV0._jsonPost())
      .catch(reject)
      .then(response => ApiV0._response(response, resolve, reject));
    });
  }

  static getTypes() {
    return new Promise((resolve, reject) => {
      fetch(`/api/v0/types`)
      .catch(reject)
      .then(response => ApiV0._response(response, resolve, reject));
    });
  }

  static getFamilies() {
    return new Promise((resolve, reject) => {
      fetch(`/api/v0/families`)
      .catch(reject)
      .then(response => ApiV0._response(response, resolve, reject));
    });
  }

  static _jsonPost() {
    return { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } };
  }

  static _response(response, resolve, reject) {
    ApiV0.consumeResponseBodyAs(response,
      (json) => {
        if (!response.ok) {
          reject((json && json.details) || (json && json.message) || response.status);
        } else {
          resolve(json);
        }
      },
      (txt) => {
        if (!response.ok) {
          reject(txt);
        } else {
          resolve(txt);// some strange case
        }
      }
    );
  }

  static consumeResponseBodyAs(response, jsonConsumer, txtConsumer) {
    (async () => {
      var responseString = await response.text();
      try{
        if (responseString && typeof responseString === "string"){
         var responseParsed = JSON.parse(responseString);
         if (ApiV0.debug) {
            console.log("RESPONSE(Json)", responseParsed);
         }
         return jsonConsumer(responseParsed);
        }
      } catch(error) {
        // text is not a valid json so we will consume as text
      }
      if (ApiV0.debug) {
        console.log("RESPONSE(Txt)", responseString);
      }
      return txtConsumer(responseString);
    })();
  }
}

export default ApiV0;

import Config from './Config'

class NetworkHelper {

  static requestGet(url, token) {
    return NetworkHelper.requestHttp(url, 'GET', null, token);
  }

  static requestPut(url, data, authenToken) {
    return NetworkHelper.requestHttp(url, 'PUT', data, authenToken);
  }

  static requestPost(url, data, authenToken) {
    return NetworkHelper.requestHttp(url, 'POST', data, authenToken);
  }

  static requestDelete(url, authenToken) {
    return NetworkHelper.requestHttp(url, 'DELETE', null, authenToken);
  }

  static requestHttp(uri, method, data, authenToken) {
    var url = Config.DOMAIN_API + uri;
    return new Promise((resolve, reject) => {
      var options = {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      if (data) {
        options.body = JSON.stringify(data);
      }
      if (authenToken) {
        options.headers['access_token'] = authenToken;
      }

      fetch(url, options)
        .then((response) => {
          response.json()
            .then((responseJson) => {
              if (responseJson.status === 200) {
                resolve(responseJson.body);
              } else if (responseJson.status === 401) {
                localStorage.clear();
                alert('Session timeout!');
                window.location.reload(); 
              } else {
                reject(responseJson.message);
              }
            })
            .catch((err) => {
              console.error('Error parse json');
              reject('Error parse json');
            })
        })
        .catch((err) => {
          console.log(err);
          reject('Cannot to connect server');
        })
    })
  }
}


export default NetworkHelper
/**
 *
 * @param {*} url 请求路径
 * @param {*} data 请求参数
 * @param {*} type 请求类型
 */
import {blocked, deepInherit} from '@/utils';
import {baseUrl} from '@/config';

const requestDataHandled = data => {
  let requestData = [];
  Object
    .keys(data)
    .forEach(key => {
      if (typeof data[key] == 'object') {
        requestData.push(`${key}=${JSON.stringify(data[key])}`);
      } else {
        requestData.push(`${key}=${data[key]}`);
      }
    })

  return requestData.join('&');
}

export default async function (url = '', data = {}, type = 'post') {
  type = type.toUpperCase();
  // 请求地址
  url = baseUrl + url;
  // 所有请求前，对请求数据进行处理
  let dataHandleBefore = JSON.parse(JSON.stringify(data));
  let dataHandleAfter = {};
  deepInherit(dataHandleBefore, dataHandleAfter);

  if (window.fetch) {
    let configRequest = {
      // body: requestDataHandled(dataHandleAfter), // data can be `string` or
      // {object}, must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include（跨域）, same-origin（同源）, *omit（不在请求中包含凭据） 发送带凭据的请求
      headers: {
        'Accept': 'application/json',
        "Content-type": "application/x-www-form-urlencoded"
      },
      method: type, // *GET, POST, PUT, DELETE, etc
      mode: 'cors' // no-cors, cors, *follow, error
    }

    if (type === 'POST') {
      Object.defineProperty(configRequest, 'body', {value: requestDataHandled(dataHandleAfter)})
    }

    try {
      let response = await fetch(url, configRequest)

      if (type === 'GET') {
        let responseUrl = await response.url;
        return responseUrl;
      } else {
        let responseData = await response.json(); // parses response to JSON
        return responseData;
      }

    } catch (error) {
      throw new Error(error);
    }

  } else {
    // IE6~11、Edge12~13
    return new Promise((resolve, reject) => {
      let xmlhttp;

      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
      }

      xmlhttp.open(type, url, true);
      xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xmlhttp.send(requestDataHandled(dataHandleAfter));

      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            let response = type === 'GET'
              ? xmlhttp.responseURL
              : xmlhttp.response;

            if (type !== 'GET' && typeof response !== 'object') {
              response = JSON.parse(response);
            }
            resolve(response)
          } else {
            reject(xmlhttp);
          }
        }
      }
    })

  }

}

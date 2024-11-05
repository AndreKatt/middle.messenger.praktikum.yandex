type TRequestOptions = {
  timeout: number;
  method: `${Methods}`;
  headers?: Record<string, string>;
  data?: Document | XMLHttpRequestBodyInit | null;
};

type THTTPMethod = (url: string, options: TRequestOptions) => Promise<XMLHttpRequest>

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
};

function queryStringify(data: TRequestOptions['data']) {
  if (typeof data !== 'object' || !data) {
    throw new Error('Data must be object');
  }
  
  const keys = Object.keys(data) as Array<keyof typeof data>;
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
};

export class Fetch {
  get: THTTPMethod = (url, options) => {
    return this.request(url, {...options, method: Methods.GET}, options.timeout);
  };

  post: THTTPMethod = (url, options) => {
    return this.request(url, {...options, method: Methods.POST}, options.timeout);
  };

  put: THTTPMethod = (url, options) => {
    return this.request(url, {...options, method: Methods.PUT}, options.timeout);
  };

  delete: THTTPMethod = (url, options) => { 
    return this.request(url, {...options, method: Methods.DELETE}, options.timeout);
  };

  request = (
    url: string, 
    options: Partial<TRequestOptions>, 
    timeout = 5000
  ): Promise<XMLHttpRequest> => {
    const {headers, method, data} = options || {};

    return new Promise(function(resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === Methods.GET;

      xhr.open(
        method, 
        isGet && !!data
        ? `${url}${queryStringify(data)}`
        : url,
      );
      xhr.withCredentials = true;

      if (headers) {
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
};

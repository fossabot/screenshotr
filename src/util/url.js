// https://github.com/wexond/desktop/blob/master/src/utils/url.ts

export const isURL = (input) => {
  const pattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;

  if (pattern.test(input)) {
    return true;
  }
  return pattern.test(`http://${input}`);
};

export const matchesPattern = (pattern, url) => {
  if (pattern === '<all_urls>') {
    return true;
  }

  const regexp = new RegExp(
    `^${pattern.replace(/\*/g, '.*').replace('/', '\\/')}$`
  );
  return url.match(regexp) != null;
};

export const getDomain = (url) => {
  let hostname = url;

  if (hostname.includes('http://') || hostname.includes('https://')) {
    [, hostname] = hostname.split('://');
  }

  [hostname] = hostname.split('/');

  return hostname;
};

export const prefixHttps = (url) => {
  return url.includes('://')
    ? `https://${url.split('://')[1].trim()}`
    : `https://${url.trim()}`;
};

export const prefixHttp = (url) => {
  return url.includes('://')
    ? `http://${url.split('://')[1].trim()}`
    : `http://${url.trim()}`;
};

export const getCorrectUrl = (url) => {
  const newUrl = prefixHttps(url);
  if (isURL(newUrl)) {
    console.log('is web uri');
    return newUrl;
  }

  return '';
};

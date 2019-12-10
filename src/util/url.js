import { isWebUri } from 'valid-url';

export const isURL = input => {
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

export const getDomain = url => {
  let hostname = url;

  if (hostname.includes('http://') || hostname.includes('https://')) {
    hostname = hostname.split('://')[1];
  }

  if (hostname.includes('?')) {
    hostname = hostname.split('?')[0];
  }

  if (hostname.includes('://')) {
    hostname = `${hostname.split('://')[0]}://${hostname.split('/')[2]}`;
  } else {
    hostname = hostname.split('/')[0];
  }

  return hostname;
};

export const prefixHttp = url => {
  return url.includes('://') ? url.trim() : `http://${url.trim()}`;
};

export const getCorrectUrl = url => {
  let newUrl = url.trim();
  if (!newUrl.match(/^https?:\/\//i)) {
    newUrl = `https://${url}`;
  }
  if (isWebUri(newUrl)) {
    console.log('is web uri');
    return newUrl;
  }

  return '';
};

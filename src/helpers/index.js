export const encode = (text) => {
  try {
    return encodeURIComponent(text);
  } catch {
    try {
      return encodeURI(text.toString());
    } catch {
      return text.toString();
    }
  }
};

export const decode = (text) => {
  try {
    return decodeURIComponent(text);
  } catch {
    try {
      return decodeURI(text);
    } catch {
      return text;
    }
  }
};

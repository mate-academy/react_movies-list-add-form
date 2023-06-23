export function isValidHttpUrl(url: string) {
  try {
    const newUrl = new URL(url);

    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
  } catch (err) {
    return false;
  }
}

// as it is optional, I've decided to use another solution
// got it from here https://www.freecodecamp.org/news/how-to-validate-urls-in-javascript/
// as for me, it's more convenient and readable

export const isValidUrl = (url: string): boolean => {
  const urlRegex = /^https?:\/\/\S+\.\S+$/;

  return urlRegex.test(url);
};

export const isValidByPattern = (
  value: string,
  pattern: RegExp | undefined,
) => {
  if (!pattern) {
    return true;
  }

  return value.length === value.replaceAll(pattern, '').length;
};

export function requiredValidator(name, value) {
  return value || name === 'description'
    ? null
    : `Field ${name} is required`;
}

export function urlValidator(name, value) {
  let isItUrl = false;
  const pattern = new RegExp('^(https?:\\/\\/)?'
  + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
  + '((\\d{1,3}\\.){3}\\d{1,3}))'
  + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
  + '(\\?[;&a-z\\d%_.~+=-]*)?'
  + '(\\#[-a-z\\d_]*)?$', 'i');

  if (value) {
    isItUrl = !!pattern.test(value);
  }

  return isItUrl
    ? null
    : `Field ${name} should be a link`;
}

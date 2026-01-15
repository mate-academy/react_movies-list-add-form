export function validateUrl(url: string): boolean {
  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  return pattern.test(url);
}

export function validateTitle(title: string): boolean {
  // Matches movie titles: starts with capital, allows letters/numbers/spaces and punctuation (: - . ' & ! ? ( ))
  const pattern = /^[A-Z][A-Za-z0-9]*(?:[\s\-:][A-Z]?[A-Za-z0-9.'&!?()]*)*$/;

  return pattern.test(title);
}

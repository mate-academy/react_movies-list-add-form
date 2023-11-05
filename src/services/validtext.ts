export function validateInput(data: string) {
  if (typeof data === 'string' && data.trim() !== '') {
    return true;
  }

  return false;
}

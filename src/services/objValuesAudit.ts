export function objValuesAudit(obj: Record<string, any>, key: string) {
  return Object.keys(obj).reduce((acc: Record<string, any>, curr: string) => {
    const objectToched = acc;

    objectToched[curr] = obj[curr][key] as any;

    return objectToched;
  }, {});
}

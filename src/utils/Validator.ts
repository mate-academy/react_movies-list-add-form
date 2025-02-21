export interface PublicValidator {
  checkLength(minLength: number, maxLength?: number): PublicValidator;
  checkEdgeSpaces(): PublicValidator;
  checkMatch(regExp: RegExp): PublicValidator;
}

export class Validator implements PublicValidator {
  private validationResults: boolean[] = [];

  constructor(private readonly value: string) {}

  checkLength(minLength: number, maxLength = Infinity) {
    const isValidLength =
      this.value.length >= minLength && this.value.length < maxLength;

    this.validationResults.push(isValidLength);

    return this;
  }

  checkEdgeSpaces() {
    const hasEdgeSpaces = this.value.trim() !== this.value;

    this.validationResults.push(!hasEdgeSpaces);

    return this;
  }

  checkMatch(regExp: RegExp) {
    const doesMatch = Boolean(this.value.match(regExp));

    this.validationResults.push(doesMatch);

    return this;
  }

  getResult() {
    return this.validationResults.every(result => result === true);
  }
}

import { FieldValidationResult, FieldValidationFunction } from '../entities';
export interface RequiredParams {
  trim: boolean;
}

const DEFAULT_PARAMS: RequiredParams = { trim: true };

export const required: FieldValidationFunction = (value, vm, customParams: RequiredParams = DEFAULT_PARAMS) => {
  const validationResult = new FieldValidationResult();
  const isValid = isValidField(value, Boolean(customParams.trim));
  validationResult.errorMessage = isValid ? '' : 'Please fill in this mandatory field.';
  validationResult.succeeded = isValid;
  validationResult.type = 'REQUIRED';
  return validationResult;
}

function isValidField(value, trim: boolean): boolean {
  return typeof value === 'string' ?
    isStringValid(value, trim) :
    value === true || typeof value === "number";
}

function isStringValid(value: string, trim: boolean): boolean {
  return trim ?
    value.trim().length > 0 :
    value.length > 0;
}

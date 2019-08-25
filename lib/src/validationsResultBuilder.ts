import { FieldValidationResult, FormValidationResult } from './entities';
import { consts } from './consts';

export class ValidationsResultBuilder {
  buildFormValidationsResult(
    fieldValidationResults: Array<FieldValidationResult>
  ): FormValidationResult {
    let formValidationResult = new FormValidationResult();

    if (fieldValidationResults && fieldValidationResults.length > 0) {
      let filteredFieldValidationResults = this.removeUndefinedValidationResults(
        fieldValidationResults
      );
      this.setGlobalKeyToEmptyKeys(filteredFieldValidationResults);

      formValidationResult.succeeded = filteredFieldValidationResults.every(
        fvr => fvr.succeeded
      );
      const fieldValidationResultList = filteredFieldValidationResults.filter(
        fvr => fvr.key !== consts.globalFormValidationId
      );
      formValidationResult.fieldErrors = this.mapFieldValidationResultListToFieldErrorsObject(
        fieldValidationResultList
      );
      formValidationResult.formGlobalErrors = filteredFieldValidationResults.filter(
        fvr => fvr.key === consts.globalFormValidationId
      );
    }

    return formValidationResult;
  }

  private removeUndefinedValidationResults(
    fieldValidationResults: Array<FieldValidationResult>
  ): Array<FieldValidationResult> {
    return fieldValidationResults.filter(
      fvr => fvr !== undefined && fvr !== null
    );
  }

  private setGlobalKeyToEmptyKeys(
    fieldValidationResults: Array<FieldValidationResult>
  ) {
    fieldValidationResults.forEach(fieldValidationResult => {
      if (!fieldValidationResult.key) {
        fieldValidationResult.key = consts.globalFormValidationId;
      }
    });
  }

  private mapFieldValidationResultListToFieldErrorsObject = (
    fieldValidationResultList: FieldValidationResult[]
  ): { [key: string]: FieldValidationResult } =>
    fieldValidationResultList.reduce((errors, result) => {
      errors[result.key] = result;
      return errors;
    }, {});
}

let validationsResultBuilder = new ValidationsResultBuilder();

export { validationsResultBuilder };

import { validationsResultBuilder } from '../validationsResultBuilder';
import { FieldValidationResult } from '../entities';
import { consts } from '../consts';

describe('ValidationsResultBuilder ', () => {
  describe('Group #1 => when calling buildFormValidationsResult ', () => {
    it('Spec #1 => should returns new FormValidationResult equals { succeeded: false } ' +
      'when passing fieldValidationResults equals undefined', () => {
        //Arrange
        let fieldValidationResults = undefined;

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.succeeded).to.be.false;
      });

    it('Spec #2 => should returns new FormValidationResult equals { succeeded: false } ' +
      'when passing fieldValidationResults equals null', () => {
        //Arrange
        let fieldValidationResults = null;

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.succeeded).to.be.false;
      });

    it('Spec #3 => should returns new FormValidationResult equals { succeeded: false } ' +
      'when passing fieldValidationResults equals empty', () => {
        //Arrange
        let fieldValidationResults = [];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.succeeded).to.be.false;
      });

    it('Spec #4 => should returns new FormValidationResult equals { succeeded: false } ' +
      'when passing fieldValidationResults with one item equals { succeeded: false }', () => {
        //Arrange
        let fieldValidationResult = new FieldValidationResult();
        fieldValidationResult.succeeded = false;
        let fieldValidationResults = [fieldValidationResult];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.succeeded).to.be.false;
      });

    it('Spec #5 => should returns new FormValidationResult equals { succeeded: true } ' +
      'when passing fieldValidationResults with one item equals { succeeded: true }', () => {
        //Arrange
        let fieldValidationResult = new FieldValidationResult();
        fieldValidationResult.succeeded = true;
        let fieldValidationResults = [fieldValidationResult];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.succeeded).to.be.true;
      });

    it('Spec #6 => should returns new FormValidationResult equals { succeeded: false } ' +
      'when passing fieldValidationResults with two items first equals { succeeded: true } ' +
      'and second equals { succeeded: false }', () => {
        //Arrange
        let fieldValidationResult1 = new FieldValidationResult();
        fieldValidationResult1.succeeded = true;
        let fieldValidationResult2 = new FieldValidationResult();
        fieldValidationResult2.succeeded = false;

        let fieldValidationResults = [fieldValidationResult1, fieldValidationResult2];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.succeeded).to.be.false;
      });

    it('Spec #7 => should returns new FormValidationResult equals { succeeded: true } ' +
      'when passing fieldValidationResults with two items first equals { succeeded: true } ' +
      'and second equals { succeeded: true }', () => {
        //Arrange
        let fieldValidationResult1 = new FieldValidationResult();
        fieldValidationResult1.succeeded = true;
        let fieldValidationResult2 = new FieldValidationResult();
        fieldValidationResult2.succeeded = true;

        let fieldValidationResults = [fieldValidationResult1, fieldValidationResult2];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.succeeded).to.be.true;
      });

    it('Spec #8 => should returns new FormValidationResult equals { fieldErrors: {} } ' +
      'when passing fieldValidationResults equals undefined', () => {
        //Arrange
        let fieldValidationResults = undefined;

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.fieldErrors).to.deep.equals({});
      });

    it('Spec #9 => should returns new FormValidationResult equals { fieldErrors: {} } ' +
      'when passing fieldValidationResults equals null', () => {
        //Arrange
        let fieldValidationResults = null;

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.fieldErrors).to.deep.equals({});
      });

    it('Spec #10 => should returns new FormValidationResult equals { fieldErrors: {} } ' +
      'when passing fieldValidationResults equals empty', () => {
        //Arrange
        let fieldValidationResults = [];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.fieldErrors).to.deep.equals({});
      });

    it('Spec #11 => should returns new FormValidationResult equals ' +
      '{ fieldErrors: { test: { key: "test", succeeded: false, errorMessage: "", type: "" } } }' +
      'when passing fieldValidationResults with one item equals { key: "test" }', () => {
        //Arrange
        let fieldValidationResult = new FieldValidationResult();
        fieldValidationResult.key = 'test';
        let fieldValidationResults = [fieldValidationResult];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.fieldErrors).to.deep.equal({
          test: {
            key: 'test',
            succeeded: false,
            errorMessage: '',
            type: '',
          } as FieldValidationResult,
        });
      });

    it('Spec #12 => should returns new FormValidationResult equals ' +
      '{ fieldErrors: {} } without properties ' +
      'when passing fieldValidationResults with one item equals { key: null }', () => {
        //Arrange
        let fieldValidationResult = new FieldValidationResult();
        fieldValidationResult.key = null;
        let fieldValidationResults = [fieldValidationResult];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.fieldErrors).to.deep.equals({});
      });

    it('Spec #13 => should returns new FormValidationResult equals ' +
      '{ fieldErrors: {} } without properties ' +
      'when passing fieldValidationResults with one item equals { key: undefined }', () => {
        //Arrange
        let fieldValidationResult = new FieldValidationResult();
        fieldValidationResult.key = undefined;
        let fieldValidationResults = [fieldValidationResult];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.fieldErrors).to.deep.equals({});
      });

    it('Spec #14 => should returns new FormValidationResult equals ' +
      '{ fieldErrors: {} } without properties ' +
      'when passing fieldValidationResults with one item equals { key: "" }', () => {
        //Arrange
        let fieldValidationResult = new FieldValidationResult();
        fieldValidationResult.key = '';
        let fieldValidationResults = [fieldValidationResult];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.fieldErrors).to.deep.equals({});
      });

    it('Spec #15 => should returns new FormValidationResult equals ' +
      '{ fieldErrors: {} } without properties ' +
      'when passing fieldValidationResults with one item equals { key: "_GLOBAL_FORM_" }', () => {
        //Arrange
        let fieldValidationResult = new FieldValidationResult();
        fieldValidationResult.key = '';
        let fieldValidationResults = [fieldValidationResult];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.fieldErrors).to.deep.equals({});
      });

    it('Spec #16 => should returns new FormValidationResult equals ' +
      '{ formGlobalErrors: [{ key: "_GLOBAL_FORM_" }] } with length equals 1 ' +
      'when passing fieldValidationResults with one item equals { key: undefined }', () => {
        //Arrange
        let fieldValidationResult = new FieldValidationResult();
        fieldValidationResult.key = undefined;
        let fieldValidationResults = [fieldValidationResult];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.formGlobalErrors).to.have.length(1);
        expect(result.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
      });

    it('Spec #17 => should returns new FormValidationResult equals ' +
      '{ formGlobalErrors: [{ key: "_GLOBAL_FORM_" }] } with length equals 1 ' +
      'when passing fieldValidationResults with one item equals { key: null }', () => {
        //Arrange
        let fieldValidationResult = new FieldValidationResult();
        fieldValidationResult.key = null;
        let fieldValidationResults = [fieldValidationResult];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.formGlobalErrors).to.have.length(1);
        expect(result.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
      });

    it('Spec #18 => should returns new FormValidationResult equals ' +
      '{ formGlobalErrors: [{ key: "_GLOBAL_FORM_" }] } with length equals 1 ' +
      'when passing fieldValidationResults with one item equals { key: "" }', () => {
        //Arrange
        let fieldValidationResult = new FieldValidationResult();
        fieldValidationResult.key = '';
        let fieldValidationResults = [fieldValidationResult];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.formGlobalErrors).to.have.length(1);
        expect(result.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
      });

    it('Spec #19 => should returns new FormValidationResult equals ' +
      '{ formGlobalErrors: [{ key: "_GLOBAL_FORM_" }] } with length equals 1 ' +
      'when passing fieldValidationResults with one item equals { key: "_GLOBAL_FORM_" }', () => {
        //Arrange
        let fieldValidationResult = new FieldValidationResult();
        fieldValidationResult.key = '_GLOBAL_FORM_';
        let fieldValidationResults = [fieldValidationResult];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.formGlobalErrors).to.have.length(1);
        expect(result.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
      });

    it('Spec #20 => should returns new FormValidationResult equals ' +
      '{ formGlobalErrors: [] } with length equals 0 ' +
      'when passing fieldValidationResults with one item equals { key: "test" }', () => {
        //Arrange
        let fieldValidationResult = new FieldValidationResult();
        fieldValidationResult.key = 'test';
        let fieldValidationResults = [fieldValidationResult];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.formGlobalErrors).to.have.length(0);
      });

    it('Spec #21 => should returns new FormValidationResult equals ' +
      '{ fieldErrors: { test: { key: "test" } } } ' +
      'when passing fieldValidationResults with two item first equals { key: "test" }' +
      'and second equals null', () => {
        //Arrange
        let fieldValidationResult1 = new FieldValidationResult();
        fieldValidationResult1.key = 'test';

        let fieldValidationResult2 = null;

        let fieldValidationResults = [fieldValidationResult1, fieldValidationResult2];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.fieldErrors).to.deep.equal({
          test: {
            key: 'test',
            succeeded: false,
            errorMessage: '',
            type: '',
          } as FieldValidationResult,
        });
      });

    it('Spec #22 => should returns new FormValidationResult equals ' +
      '{ fieldErrors: { test: { key: "test" } } } ' +
      'when passing fieldValidationResults with two item first equals { key: "test" }' +
      'and second equals undefined', () => {
        //Arrange
        let fieldValidationResult1 = new FieldValidationResult();
        fieldValidationResult1.key = 'test';

        let fieldValidationResult2 = undefined;

        let fieldValidationResults = [fieldValidationResult1, fieldValidationResult2];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.fieldErrors).to.deep.equal({
          test: {
            key: 'test',
            succeeded: false,
            errorMessage: '',
            type: '',
          } as FieldValidationResult,
        });
      });

    it('Spec #23 => should returns new FormValidationResult equals ' +
      '{ fieldErrors: { test1: { key: "test1" }, test2: { key: "test2" } } } ' +
      'when passing fieldValidationResults with two item first equals { key: "test1" }' +
      'and second equals { key: "test2" }', () => {
        //Arrange
        const fieldValidationResult1 = new FieldValidationResult();
        fieldValidationResult1.key = 'test1';

        const fieldValidationResult2 = new FieldValidationResult();
        fieldValidationResult2.key = 'test2';

        const fieldValidationResults = [fieldValidationResult1, fieldValidationResult2];

        //Act
        const result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.fieldErrors).to.deep.equal({
          test1: {
            key: 'test1',
            succeeded: false,
            errorMessage: '',
            type: '',
          } as FieldValidationResult,
          test2: {
            key: 'test2',
            succeeded: false,
            errorMessage: '',
            type: '',
          } as FieldValidationResult,
        });
      });

    it('Spec #24 => should returns new FormValidationResult equals ' +
      '{ formGlobalErrors: [{ key: "_GLOBAL_FORM_" }] } with length equals 1 ' +
      'when passing fieldValidationResults with two item first equals { key: "_GLOBAL_FORM_" }' +
      'and second equals null', () => {
        //Arrange
        let fieldValidationResult1 = new FieldValidationResult();
        fieldValidationResult1.key = '_GLOBAL_FORM_';

        let fieldValidationResult2 = null;

        let fieldValidationResults = [fieldValidationResult1, fieldValidationResult2];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.formGlobalErrors).to.have.length(1);
        expect(result.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
      });

    it('Spec #25 => should returns new FormValidationResult equals ' +
      '{ formGlobalErrors: [{ key: "_GLOBAL_FORM_" }] } with length equals 1 ' +
      'when passing fieldValidationResults with two item first equals { key: "_GLOBAL_FORM_" }' +
      'and second equals undefined', () => {
        //Arrange
        let fieldValidationResult1 = new FieldValidationResult();
        fieldValidationResult1.key = '_GLOBAL_FORM_';

        let fieldValidationResult2 = undefined;

        let fieldValidationResults = [fieldValidationResult1, fieldValidationResult2];

        //Act
        let result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.formGlobalErrors).to.have.length(1);
        expect(result.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
      });

    it('Spec #26 => should returns new FormValidationResult equals ' +
      '{ fieldErrors: { "nested.key1": { key: "nested.key1" }, test2: { key: "test2" } } } ' +
      'when passing fieldValidationResults with two item first equals { key: "nested.key1" }' +
      'and second equals { key: "test2" }', () => {
        //Arrange
        const fieldValidationResult1 = new FieldValidationResult();
        fieldValidationResult1.key = 'nested.key1';

        const fieldValidationResult2 = new FieldValidationResult();
        fieldValidationResult2.key = 'test2';

        const fieldValidationResults = [fieldValidationResult1, fieldValidationResult2];

        //Act
        const result = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);

        //Assert
        expect(result.fieldErrors).to.deep.equal({
          'nested.key1': {
            key: 'nested.key1',
            succeeded: false,
            errorMessage: '',
            type: '',
          } as FieldValidationResult,
          test2: {
            key: 'test2',
            succeeded: false,
            errorMessage: '',
            type: '',
          } as FieldValidationResult,
        });
      });
  });
});

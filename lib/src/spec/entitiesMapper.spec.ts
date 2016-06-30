import { expect } from 'chai';
import { Promise } from "es6-promise";
import {FieldValidation, FieldValidationResult} from '../entities';
import {entitiesMapper} from '../entitiesMapper';


describe('mapper ', () => {

    describe('when calling ExtractArrayValidationFnFromFieldValidationArray ', () => {
        it('should returns an empty array ' +
            'when passing an empty array as input parameter', () => {
            // Arrange
            const validationsPerField  : Array<FieldValidation> = [];

            //Act
            let result = entitiesMapper.ExtractArrayValidationFnFromFieldValidationArray(validationsPerField);

            //Assert
            expect(result.length).to.be.equal(0);
        });
    });

    describe('when calling ExtractArrayValidationFnFromFieldValidationArray ', () => {
        it('should returns an array with one element (a function) ' +
            'when passing an array with one element as input parameter', (done) => {
            // Arrange
            const validationsPerField  : Array<FieldValidation> = [
              {
                validationFn : (vm, value)=> {
                  const fieldValidationResult = new FieldValidationResult();
                  fieldValidationResult.type = "test",
                  fieldValidationResult.succeeded = true;
                  fieldValidationResult.errorMessage = "error test";
                  return Promise.resolve(fieldValidationResult);
                },
                filter : {OnChange: true}
              }
            ];

            //Act
            let result = entitiesMapper.ExtractArrayValidationFnFromFieldValidationArray(validationsPerField);

            //Assert
            expect(result.length).to.be.equal(1);
            expect(result[0]).to.be.a('function');
            //expect(result[0](null, null).errorMessage)
            result[0](null, null).then((fieldValidationResult) => {
              // Assert
              expect(fieldValidationResult.errorMessage).to.be.equal("error test");
              done();
            });
        });
    });

    describe('when calling ExtractArrayValidationFnFromFieldValidationArray ', () => {
        it('should returns an array having two elements (two functions) ' +
            'when passing an array having two elements as input parameter', (done) => {
            // Arrange
            const validationsPerField  : Array<FieldValidation> = [
              {
                validationFn : (vm, value)=> {
                  const fieldValidationResult = new FieldValidationResult();
                  fieldValidationResult.type = "test1",
                  fieldValidationResult.succeeded = true;
                  fieldValidationResult.errorMessage = "error test1";
                  return Promise.resolve(fieldValidationResult);
                },
                filter : {OnChange: true}
              },
              {
                validationFn : (vm, value)=> {
                  const fieldValidationResult = new FieldValidationResult();
                  fieldValidationResult.type = "test2",
                  fieldValidationResult.succeeded = true;
                  fieldValidationResult.errorMessage = "error test2";
                  return Promise.resolve(fieldValidationResult);
                },
                filter : {OnChange: true}
              }
            ];

            //Act
            let result = entitiesMapper.ExtractArrayValidationFnFromFieldValidationArray(validationsPerField);

            //Assert
            expect(result.length).to.be.equal(2);
            expect(result[0]).to.be.a('function');
            expect(result[1]).to.be.a('function');

            result[0](null, null).then((fieldValidationResult) => {
              // Assert
              expect(fieldValidationResult.errorMessage).to.be.equal("error test");
              done();
            });

            result[1](null, null).then((fieldValidationResult) => {
              // Assert
              expect(fieldValidationResult.errorMessage).to.be.equal("error test2");
              done();
            });

        });
    });

});

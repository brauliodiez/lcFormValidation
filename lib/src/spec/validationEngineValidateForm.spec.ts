import { ValidationEngine } from '../validationEngine';
import { FieldValidationResult, FormValidationResult } from '../entities';
import { consts } from '../consts';

describe('ValidationEngine Validate Form', () => {
  describe('Group #1 => When calling validateForm and addFieldValidation', () => {
    it('Spec #1 => should return a failed FormValidationResult with one fieldErrors equals ' +
      '{ succeeded: false, key: "fullname", type: "REQUIRED", errorMessage: "Mandatory Field" } ' +
      ' when passing one validation rule with key equals "fullname" and viewModel equals { id: "1", fullname: "" }', (done) => {
        // Arrange
        const validationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: '' };

        // Act
        validationEngine.addFieldValidation('fullname',
          (value, vm): Promise<FieldValidationResult> => {
            // Required field
            // in this case no async stuff
            // we can directly resolve the promise
            let isFieldInformed: boolean = (value != null && value.length > 0);
            // We could use string ID's if multilanguage is required
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.false;

            expect(formValidationResult.fieldErrors).to.deep.equal({
              fullname: {
                key: 'fullname',
                succeeded: false,
                type: 'REQUIRED',
                errorMessage: 'Mandatory field',
              } as FieldValidationResult,
            });
            done();
          });
      });

    it('Spec #2 => should return a succeeded FormValidationResult with one fieldErrors equals ' +
      '{ succeeded: true, key: "fullname", type: "REQUIRED", errorMessage: "" }' +
      'When passing one validation rule with key equals "fullname" and viewModel ' +
      'equals { id: "1", fullname: "john" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: 'john' };

        // Act
        validationEngine.addFieldValidation('fullname',
          (value, vm): Promise<FieldValidationResult> => {
            // Required field
            // in this case no async stuff
            // we can directly resolve the promise
            let isFieldInformed: boolean = (value != null && value.length > 0);
            // We could use string ID's if multilanguage is required
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.true;
            expect(formValidationResult.fieldErrors).to.deep.equal({
              fullname: {
                key: 'fullname',
                succeeded: true,
                type: 'REQUIRED',
                errorMessage: '',
              } as FieldValidationResult,
            });
            done();
          });
      });

    it('Spec #3 => should return a failed FormValidationResult with two fieldErrors first equals ' +
      '{ succeeded: false, key: "fullname", type: "REQUIRED", errorMessage: "Mandatory field" }' +
      'and second equals { succeeded: false, key: "password", type: "REQUIRED", errorMessage: "Mandatory field" } ' +
      'When passing one validation rule with key equals "fullname", two validations rules with key ' +
      'equals "password" and viewModel equals { id: "1", fullname: "", password: "" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: '', password: '' };

        // Act
        // name mandatory
        validationEngine.addFieldValidation('fullname',
          (value, vm): Promise<FieldValidationResult> => {
            // Required field
            // in this case no async stuff
            // we can directly resolve the promise
            let isFieldInformed: boolean = (value != null && value.length > 0);
            // We could use string ID's if multilanguage is required
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );

        // password mandatory and min length 3
        validationEngine.addFieldValidation('password',
          (value, vm): Promise<FieldValidationResult> => {
            // We will isolate this into common functions
            // Required field
            // in this case no async stuff
            // we can directly resolve the promise
            let isFieldInformed: boolean = (value != null && value.length > 0);
            // We could use string ID's if multilanguage is required
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );

        validationEngine.addFieldValidation('password',
          (value): Promise<FieldValidationResult> => {
            // We will isolate this into common functions
            // minLenght
            // in this case no async stuff
            // we can directly resolve the promise
            let minLength: boolean = (value != null && value.length >= 3);

            // We could use string ID's if multilanguage is required
            let errorInfo: string = (minLength) ? "" : "Password must be at least 3 characters";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "MINLENGTH";
            validationResult.succeeded = minLength;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.false;

            expect(formValidationResult.fieldErrors).to.deep.equal({
              fullname: {
                key: 'fullname',
                succeeded: false,
                type: 'REQUIRED',
                errorMessage: 'Mandatory field',
              } as FieldValidationResult,
              password: {
                key: 'password',
                succeeded: false,
                type: 'REQUIRED',
                errorMessage: 'Mandatory field',
              } as FieldValidationResult,
            });

            done();
          });
      });

    it('Spec #4 => should return a failed FormValidationResult with two fieldErrors ' +
      'first equals { succeeded: false, key: "fullname", type: "REQUIRED", errorMessage: "Mandatory field" }' +
      'and second equals ' +
      '{ succeeded: false, key: "password", type: "MINLENGTH", errorMessage: "Password must be at least 3 characters" } ' +
      'When passing one validation rule with key equals "fullname", two validations rules with key ' +
      'equals "password" and viewModel equals { id: "1", fullname: "", password: "1" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: '', password: '1' };

        // Act
        // name mandatory
        validationEngine.addFieldValidation('fullname',
          (value, vm): Promise<FieldValidationResult> => {
            // Required field
            // in this case no async stuff
            // we can directly resolve the promise
            let isFieldInformed: boolean = (value != null && value.length > 0);
            // We could use string ID's if multilanguage is required
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );

        // password mandatory and min length 3
        validationEngine.addFieldValidation('password',
          (value, vm): Promise<FieldValidationResult> => {
            // We will isolate this into common functions
            // Required field
            // in this case no async stuff
            // we can directly resolve the promise
            let isFieldInformed: boolean = (value != null && value.length > 0);
            // We could use string ID's if multilanguage is required
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );

        validationEngine.addFieldValidation('password',
          (value, vm): Promise<FieldValidationResult> => {
            // We will isolate this into common functions
            // minLenght
            // in this case no async stuff
            // we can directly resolve the promise
            let minLength: boolean = (value != null && value.length >= 3);

            // We could use string ID's if multilanguage is required
            let errorInfo: string = (minLength) ? "" : "Password must be at least 3 characters";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "MINLENGTH";
            validationResult.succeeded = minLength;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.false;

            expect(formValidationResult.fieldErrors).to.deep.equal({
              fullname: {
                key: 'fullname',
                succeeded: false,
                type: 'REQUIRED',
                errorMessage: 'Mandatory field',
              } as FieldValidationResult,
              password: {
                key: 'password',
                succeeded: false,
                type: 'MINLENGTH',
                errorMessage: 'Password must be at least 3 characters',
              } as FieldValidationResult,
            });

            done();
          });
      });

    it('Spec #5 => should return a failed FormValidationResult with two fieldErrors ' +
      'first equals { succeeded: false, key: "fullname", type: "REQUIRED", errorMessage: "Mandatory field" }' +
      'and second equals { succeeded: true, key: "password", type: "MINLENGTH", errorMessage: "" } ' +
      'When passing one validation rule with key equals "fullname", two validations rules with ' +
      'key equals "password" and ' +
      'viewModel equals { id: "1", fullname: "", password: "123" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: '', password: '123' };

        // Act
        // name mandatory
        validationEngine.addFieldValidation('fullname',
          (value, vm): Promise<FieldValidationResult> => {
            // Required field
            // in this case no async stuff
            // we can directly resolve the promise
            let isFieldInformed: boolean = (value != null && value.length > 0);
            // We could use string ID's if multilanguage is required
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );

        // password mandatory and min length 3
        validationEngine.addFieldValidation('password',
          (value, vm): Promise<FieldValidationResult> => {
            // We will isolate this into common functions
            // Required field
            // in this case no async stuff
            // we can directly resolve the promise
            let isFieldInformed: boolean = (value != null && value.length > 0);
            // We could use string ID's if multilanguage is required
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );

        validationEngine.addFieldValidation('password',
          (value, vm): Promise<FieldValidationResult> => {
            // We will isolate this into common functions
            // minLenght
            // in this case no async stuff
            // we can directly resolve the promise
            let minLength: boolean = (value != null && value.length >= 3);

            // We could use string ID's if multilanguage is required
            let errorInfo: string = (minLength) ? "" : "Password must be at least 3 characters";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "MINLENGTH";
            validationResult.succeeded = minLength;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.false;

            expect(formValidationResult.fieldErrors).to.deep.equal({
              fullname: {
                key: 'fullname',
                succeeded: false,
                type: 'REQUIRED',
                errorMessage: 'Mandatory field',
              } as FieldValidationResult,
              password: {
                key: 'password',
                succeeded: true,
                type: 'MINLENGTH',
                errorMessage: '',
              } as FieldValidationResult,
            });

            done();
          });
      });

    it('Spec #6 => should return a succeeded FormValidationResult with two fieldErrors first equals ' +
      '{ succeeded: true, key: "fullname", type: "REQUIRED", errorMessage: "" }' +
      'and second equals { succeeded: true, key: "password", type: "MINLENGTH", errorMessage: "" }' +
      'When passing one validation rule with key equals "fullname", two validations rules with ' +
      'key equals "password" and ' +
      'viewModel equals { id: "1", fullname: "john", password: "123" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: 'john', password: '123' };

        // Act
        // name mandatory
        validationEngine.addFieldValidation('fullname',
          (value, vm): Promise<FieldValidationResult> => {
            // Required field
            // in this case no async stuff
            // we can directly resolve the promise
            let isFieldInformed: boolean = (value != null && value.length > 0);
            // We could use string ID's if multilanguage is required
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );

        // password mandatory and min length 3
        validationEngine.addFieldValidation('password',
          (value, vm): Promise<FieldValidationResult> => {
            // We will isolate this into common functions
            // Required field
            // in this case no async stuff
            // we can directly resolve the promise
            let isFieldInformed: boolean = (value != null && value.length > 0);
            // We could use string ID's if multilanguage is required
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );

        validationEngine.addFieldValidation('password',
          (value, vm): Promise<FieldValidationResult> => {
            // We will isolate this into common functions
            // minLenght
            // in this case no async stuff
            // we can directly resolve the promise
            let minLength: boolean = (value != null && value.length >= 3);

            // We could use string ID's if multilanguage is required
            let errorInfo: string = (minLength) ? "" : "Password must be at least 3 characters";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "MINLENGTH";
            validationResult.succeeded = minLength;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.true;

            expect(formValidationResult.fieldErrors).to.deep.equal({
              fullname: {
                key: 'fullname',
                succeeded: true,
                type: 'REQUIRED',
                errorMessage: '',
              } as FieldValidationResult,
              password: {
                key: 'password',
                succeeded: true,
                type: 'MINLENGTH',
                errorMessage: '',
              } as FieldValidationResult,
            });

            done();
          });
      });

    it('Spec #7 => should return a rejected promise ' +
      'When passing one validation rule that contains an uncontrolled exception', (done) => {
        // Arrange
        const validationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: '' };
        const thrownErrorMessage = 'Intentionally uncontrolled error, single field validation testing fullform validations';

        // Act
        validationEngine.addFieldValidation('fullname',
          (value, vm): Promise<FieldValidationResult> => {
            throw new Error(thrownErrorMessage);
          }
        );

        const promise = validationEngine.validateForm(viewModel);

        //Assert
        expect(promise).to.eventually.be.rejected.and.notify(done);
      });

    it('Spec #8 => should not execute second validation if the first one fails', (done) => {
      // Arrange
      const validationEngine = new ValidationEngine();
      const validationFn1 = (): FieldValidationResult => ({
        type: 'REQUIRED',
        succeeded: false,
        errorMessage: 'Mandatory field'
      });
      const validationFn2 = (): FieldValidationResult => ({
        type: 'USER_EXISTS',
        succeeded: false,
        errorMessage: 'User already exists'
      });
      const validationFn1Spy = sinon.spy(validationFn1);
      const validationFn2Spy = sinon.spy(validationFn2);
      const vm = { fullname: '' };

      // Act
      validationEngine.addFieldValidation('fullname', validationFn1Spy, { onChange: true, onBlur: true });
      validationEngine.addFieldValidation('fullname', validationFn2Spy, { onBlur: true });
      validationEngine.validateForm(vm).then((validationResult) => {

        // Assert
        expect(validationFn1Spy.called).to.be.true;
        expect(validationFn2Spy.called).to.be.false;
        done();
      });
    });

    it('Spec #9 => should pass validation when feeding viewModel with nested properties, fullname.firstName equals "john" and is validation required', (done) => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const viewModel = {
        fullname: {
          firstName: 'john',
        },
      };

      // Act
      validationEngine.addFieldValidation('fullname.firstName',
        (value, vm): Promise<FieldValidationResult> => {
          let isFieldInformed: boolean = (value != null && value.length > 0);
          let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

          const validationResult: FieldValidationResult = new FieldValidationResult();
          validationResult.type = "REQUIRED";
          validationResult.succeeded = isFieldInformed;
          validationResult.errorMessage = errorInfo;

          return Promise.resolve(validationResult);
        }
      );

      validationEngine.validateForm(viewModel)
        .then((formValidationResult: FormValidationResult) => {
          expect(formValidationResult.succeeded).to.be.true;

          expect(formValidationResult.fieldErrors).to.deep.equal({
            'fullname.firstName': {
              key: 'fullname.firstName',
              succeeded: true,
              type: 'REQUIRED',
              errorMessage: '',
            } as FieldValidationResult,
          });

          done();
        });
    });

    it('Spec #10 => should fail validation when feeding viewModel with nested properties, fullname.firstName equals "" and is validation required', (done) => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const viewModel = {
        fullname: {
          firstName: '',
        },
      };

      // Act
      validationEngine.addFieldValidation('fullname.firstName',
        (value, vm): Promise<FieldValidationResult> => {
          let isFieldInformed: boolean = (value != null && value.length > 0);
          let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

          const validationResult: FieldValidationResult = new FieldValidationResult();
          validationResult.type = "REQUIRED";
          validationResult.succeeded = isFieldInformed;
          validationResult.errorMessage = errorInfo;

          return Promise.resolve(validationResult);
        }
      );

      validationEngine.validateForm(viewModel)
        .then((formValidationResult: FormValidationResult) => {
          expect(formValidationResult.succeeded).to.be.false;

          expect(formValidationResult.fieldErrors).to.deep.equal({
            'fullname.firstName': {
              key: 'fullname.firstName',
              succeeded: false,
              type: 'REQUIRED',
              errorMessage: 'Mandatory field',
            } as FieldValidationResult,
          });

          done();
        });
    });
  });

  describe('Group #2 => When calling validateForm and addFormValidation with async function', () => {
    it('Spec #1 => should return a succeeded FormValidationResult with one formGlobalErrors equals ' +
      '{ succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "" }' +
      'When passing one global validation rule and viewModel equals { id: "1", fullname: "john" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: 'john' };

        // Act
        validationEngine.addFormValidation((vm): Promise<FieldValidationResult> => {
          let isFieldInformed: boolean = (vm.fullname != null && vm.fullname.length > 0);
          let errorInfo: string = (isFieldInformed) ? "" : "Global form check Mandatory field";

          const validationResult: FieldValidationResult = new FieldValidationResult();
          validationResult.type = "GLOBAL_FORM_REQUIRED";
          validationResult.succeeded = isFieldInformed;
          validationResult.errorMessage = errorInfo;

          return Promise.resolve(validationResult);
        });

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.true;
            expect(formValidationResult.formGlobalErrors).to.have.length(1);
            expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.true;
            expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
            expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('');

            done();
          });
      });

    it('Spec #2 => should return a failed FormValidationResult with one formGlobalErrors equals ' +
      '{ succeeded: false, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "Global form check Mandatory field" }' +
      'When passing one global validation rule and viewModel equals { id: "1", fullname: "" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: '' };

        // Act
        validationEngine.addFormValidation((vm): Promise<FieldValidationResult> => {
          let isFieldInformed: boolean = (vm.fullname != null && vm.fullname.length > 0);
          let errorInfo: string = (isFieldInformed) ? "" : "Global form check Mandatory field";

          const validationResult: FieldValidationResult = new FieldValidationResult();
          validationResult.type = "GLOBAL_FORM_REQUIRED";
          validationResult.succeeded = isFieldInformed;
          validationResult.errorMessage = errorInfo;

          return Promise.resolve(validationResult);
        });

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.false;

            expect(formValidationResult.formGlobalErrors).to.have.length(1);

            expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.false;
            expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
            expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('Global form check Mandatory field');

            done();
          });
      });

    it('Spec #3 => should return a succeeded FormValidationResult with two formGlobalErrors ' +
      'first equals { succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "" }' +
      'second equals { succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_MIN_LENGTH", errorMessage: "" }' +
      'When passing two global validation rules and viewModel equals { id: "1", fullname: "john" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: 'john' };

        // Act
        validationEngine.addFormValidation((vm): Promise<FieldValidationResult> => {
          let isFieldInformed: boolean = (vm.fullname != null && vm.fullname.length > 0);
          let errorInfo: string = (isFieldInformed) ? "" : "Global form check Mandatory field";

          const validationResult: FieldValidationResult = new FieldValidationResult();
          validationResult.type = "GLOBAL_FORM_REQUIRED";
          validationResult.succeeded = isFieldInformed;
          validationResult.errorMessage = errorInfo;

          return Promise.resolve(validationResult);
        });

        validationEngine.addFormValidation((vm): Promise<FieldValidationResult> => {
          // We will isolate this into common functions
          // minLenght
          // in this case no async stuff
          // we can directly resolve the promise
          let minLength: boolean = (vm.fullname != null && vm.fullname.length >= 3);

          // We could use string ID's if multilanguage is required
          let errorInfo: string = (minLength) ? "" : "Global form check must be at least 3 characters";

          const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
          fieldValidationResult.type = "GLOBAL_FORM_MIN_LENGTH";
          fieldValidationResult.succeeded = minLength;
          fieldValidationResult.errorMessage = errorInfo;

          return Promise.resolve(fieldValidationResult);
        });

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.true;

            expect(formValidationResult.formGlobalErrors).to.have.length(2);

            expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.true;
            expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
            expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('');

            expect(formValidationResult.formGlobalErrors[1].succeeded).to.be.true;
            expect(formValidationResult.formGlobalErrors[1].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[1].type).to.equal('GLOBAL_FORM_MIN_LENGTH');
            expect(formValidationResult.formGlobalErrors[1].errorMessage).to.equal('');

            done();
          });
      });

    it('Spec #4 => should return a failed FormValidationResult with two formGlobalErrors ' +
      'first equals { succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "" }' +
      'second equals { succeeded: false, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_MIN_LENGTH", errorMessage: "Global form check must be at least 3 characters" }' +
      'When passing two global validation rules and viewModel equals { id: "1", fullname: "jo" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: 'jo' };

        // Act
        validationEngine.addFormValidation((vm): Promise<FieldValidationResult> => {
          let isFieldInformed: boolean = (vm.fullname != null && vm.fullname.length > 0);
          let errorInfo: string = (isFieldInformed) ? "" : "Global form check Mandatory field";

          const validationResult: FieldValidationResult = new FieldValidationResult();
          validationResult.type = "GLOBAL_FORM_REQUIRED";
          validationResult.succeeded = isFieldInformed;
          validationResult.errorMessage = errorInfo;

          return Promise.resolve(validationResult);
        });

        validationEngine.addFormValidation((vm): Promise<FieldValidationResult> => {
          // We will isolate this into common functions
          // minLenght
          // in this case no async stuff
          // we can directly resolve the promise
          let minLength: boolean = (vm.fullname != null && vm.fullname.length >= 3);

          // We could use string ID's if multilanguage is required
          let errorInfo: string = (minLength) ? "" : "Global form check must be at least 3 characters";

          const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
          fieldValidationResult.type = "GLOBAL_FORM_MIN_LENGTH";
          fieldValidationResult.succeeded = minLength;
          fieldValidationResult.errorMessage = errorInfo;

          return Promise.resolve(fieldValidationResult);
        });

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.false;

            expect(formValidationResult.formGlobalErrors).to.have.length(2);

            expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.true;
            expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
            expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('');

            expect(formValidationResult.formGlobalErrors[1].succeeded).to.be.false;
            expect(formValidationResult.formGlobalErrors[1].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[1].type).to.equal('GLOBAL_FORM_MIN_LENGTH');
            expect(formValidationResult.formGlobalErrors[1].errorMessage).to.equal('Global form check must be at least 3 characters');

            done();
          });
      });

    it('Spec #5 => should return a failed FormValidationResult with two formGlobalErrors ' +
      'first equals { succeeded: false, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "Global form check Mandatory field" }' +
      'second equals { succeeded: false, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_MIN_LENGTH", errorMessage: "Global form check must be at least 3 characters" }' +
      'When passing two global validation rules and viewModel equals { id: "1", fullname: "" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: '' };

        // Act
        validationEngine.addFormValidation((vm): Promise<FieldValidationResult> => {
          let isFieldInformed: boolean = (vm.fullname != null && vm.fullname.length > 0);
          let errorInfo: string = (isFieldInformed) ? "" : "Global form check Mandatory field";

          const validationResult: FieldValidationResult = new FieldValidationResult();
          validationResult.type = "GLOBAL_FORM_REQUIRED";
          validationResult.succeeded = isFieldInformed;
          validationResult.errorMessage = errorInfo;

          return Promise.resolve(validationResult);
        });

        validationEngine.addFormValidation((vm): Promise<FieldValidationResult> => {
          // We will isolate this into common functions
          // minLenght
          // in this case no async stuff
          // we can directly resolve the promise
          let minLength: boolean = (vm.fullname != null && vm.fullname.length >= 3);

          // We could use string ID's if multilanguage is required
          let errorInfo: string = (minLength) ? "" : "Global form check must be at least 3 characters";

          const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
          fieldValidationResult.type = "GLOBAL_FORM_MIN_LENGTH";
          fieldValidationResult.succeeded = minLength;
          fieldValidationResult.errorMessage = errorInfo;

          return Promise.resolve(fieldValidationResult);
        });

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.false;

            expect(formValidationResult.formGlobalErrors).to.have.length(2);

            expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.false;
            expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
            expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('Global form check Mandatory field');

            expect(formValidationResult.formGlobalErrors[1].succeeded).to.be.false;
            expect(formValidationResult.formGlobalErrors[1].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[1].type).to.equal('GLOBAL_FORM_MIN_LENGTH');
            expect(formValidationResult.formGlobalErrors[1].errorMessage).to.equal('Global form check must be at least 3 characters');

            done();
          });
      });
  });

  describe('Group #3 => When calling validateForm, addFieldValidation and addFormValidation with async function', () => {
    it('Spec #1 => should return a succeeded FormValidationResult with one fieldErrors and one formGlobalErrors' +
      'first equals { succeeded: true, key: "address", type: "REQUIRED", errorMessage: "" }' +
      'second equals { succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "" }' +
      'When passing one validation rule with key equals "address", global validation rule and viewModel ' +
      'equals { id: "1", fullname: "john", address: "mystreet" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: 'john', address: 'mystreet' };

        // Act
        validationEngine.addFieldValidation('address',
          (value, vm): Promise<FieldValidationResult> => {
            // We will isolate this into common functions
            // Required field
            // in this case no async stuff
            // we can directly resolve the promise
            let isFieldInformed: boolean = (value != null && value.length > 0);
            // We could use string ID's if multilanguage is required
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );


        validationEngine.addFormValidation((vm): Promise<FieldValidationResult> => {
          let isFieldInformed: boolean = (vm.fullname != null && vm.fullname.length > 0);
          let errorInfo: string = (isFieldInformed) ? "" : "Global form check Mandatory field";

          const validationResult: FieldValidationResult = new FieldValidationResult();
          validationResult.type = "GLOBAL_FORM_REQUIRED";
          validationResult.succeeded = isFieldInformed;
          validationResult.errorMessage = errorInfo;

          return Promise.resolve(validationResult);
        });

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.true;

            expect(formValidationResult.fieldErrors).to.deep.equal({
              address: {
                key: 'address',
                succeeded: true,
                type: 'REQUIRED',
                errorMessage: '',
              } as FieldValidationResult,
            });

            expect(formValidationResult.formGlobalErrors).to.have.length(1);
            expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.true;
            expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
            expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('');

            done();
          });
      });

    it('Spec #2 => should return a failed FormValidationResult with  one fieldErrors and one formGlobalErrors ' +
      'first equals { succeeded: false, key: "address", type: "REQUIRED", errorMessage: "Mandatory field" }' +
      'second equals { succeeded: false, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "Global form check Mandatory field" }' +
      'When passing one validation rule with key equals "address", global validation rule and viewModel ' +
      'equals { id: "1", fullname: "", address: "" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: '', address: '' };

        // Act
        validationEngine.addFieldValidation('address',
          (value, vm): Promise<FieldValidationResult> => {
            // We will isolate this into common functions
            // Required field
            // in this case no async stuff
            // we can directly resolve the promise
            let isFieldInformed: boolean = (value != null && value.length > 0);
            // We could use string ID's if multilanguage is required
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );


        validationEngine.addFormValidation((vm): Promise<FieldValidationResult> => {
          let isFieldInformed: boolean = (vm.fullname != null && vm.fullname.length > 0);
          let errorInfo: string = (isFieldInformed) ? "" : "Global form check Mandatory field";

          const validationResult: FieldValidationResult = new FieldValidationResult();
          validationResult.type = "GLOBAL_FORM_REQUIRED";
          validationResult.succeeded = isFieldInformed;
          validationResult.errorMessage = errorInfo;

          return Promise.resolve(validationResult);
        });

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.false;

            expect(formValidationResult.fieldErrors).to.deep.equal({
              address: {
                key: 'address',
                succeeded: false,
                type: 'REQUIRED',
                errorMessage: 'Mandatory field',
              } as FieldValidationResult,
            });

            expect(formValidationResult.formGlobalErrors).to.have.length(1);
            expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.false;
            expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
            expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('Global form check Mandatory field');

            done();
          });
      });

    it('Spec #3 => should return a failed FormValidationResult with  one fieldErrors and one formGlobalErrors ' +
      'first equals { succeeded: true, key: "address", type: "REQUIRED", errorMessage: "" }' +
      'second equals { succeeded: false, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "Global form check Mandatory field" }' +
      'When passing one validation rule with key equals "address", global validation rule and viewModel ' +
      'equals { id: "1", fullname: "", address: "street" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: '', address: 'street' };

        // Act
        validationEngine.addFieldValidation('address',
          (value, vm): Promise<FieldValidationResult> => {
            // We will isolate this into common functions
            // Required field
            // in this case no async stuff
            // we can directly resolve the promise
            let isFieldInformed: boolean = (value != null && value.length > 0);
            // We could use string ID's if multilanguage is required
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );


        validationEngine.addFormValidation((vm): Promise<FieldValidationResult> => {
          let isFieldInformed: boolean = (vm.fullname != null && vm.fullname.length > 0);
          let errorInfo: string = (isFieldInformed) ? "" : "Global form check Mandatory field";

          const validationResult: FieldValidationResult = new FieldValidationResult();
          validationResult.type = "GLOBAL_FORM_REQUIRED";
          validationResult.succeeded = isFieldInformed;
          validationResult.errorMessage = errorInfo;

          return Promise.resolve(validationResult);
        });

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.false;

            expect(formValidationResult.fieldErrors).to.deep.equal({
              address: {
                key: 'address',
                succeeded: true,
                type: 'REQUIRED',
                errorMessage: '',
              } as FieldValidationResult,
            });

            expect(formValidationResult.formGlobalErrors).to.have.length(1);
            expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.false;
            expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
            expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('Global form check Mandatory field');

            done();
          });
      });

    it('Spec #4 => should return a failed FormValidationResult with  one fieldErrors and one formGlobalErrors ' +
      'first equals { succeeded: false, key: "address", type: "REQUIRED", errorMessage: "Mandatory field" }' +
      'second equals { succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "" }' +
      'When passing one validation rule with key equals "address", global validation rule and viewModel ' +
      'equals { id: "1", fullname: "john", address: "" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: 'john', address: '' };

        // Act
        validationEngine.addFieldValidation('address',
          (value, vm): Promise<FieldValidationResult> => {
            // We will isolate this into common functions
            // Required field
            // in this case no async stuff
            // we can directly resolve the promise
            let isFieldInformed: boolean = (value != null && value.length > 0);
            // We could use string ID's if multilanguage is required
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );


        validationEngine.addFormValidation((vm): Promise<FieldValidationResult> => {
          let isFieldInformed: boolean = (vm.fullname != null && vm.fullname.length > 0);
          let errorInfo: string = (isFieldInformed) ? "" : "Global form check Mandatory field";

          const validationResult: FieldValidationResult = new FieldValidationResult();
          validationResult.type = "GLOBAL_FORM_REQUIRED";
          validationResult.succeeded = isFieldInformed;
          validationResult.errorMessage = errorInfo;

          return Promise.resolve(validationResult);
        });

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.false;

            expect(formValidationResult.fieldErrors).to.deep.equal({
              address: {
                key: 'address',
                succeeded: false,
                type: 'REQUIRED',
                errorMessage: 'Mandatory field',
              } as FieldValidationResult,
            });

            expect(formValidationResult.formGlobalErrors).to.have.length(1);
            expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.true;
            expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
            expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('');

            done();
          });
      });


    it('Spec #5 => should return a promise rejected when passing one faulty global validation rule', (done) => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const viewModel = { id: '1', fullname: 'john', address: '' };
      const thrownErrorMessage = 'Intentionally global form uncontrolled exception';

      // Act
      validationEngine.addFormValidation((vm): Promise<FieldValidationResult> => {
        throw new Error(thrownErrorMessage);
      });

      const promise = validationEngine.validateForm(viewModel)
      expect(promise)
        .to.eventually.be.rejectedWith(Error, thrownErrorMessage)
        .and.notify(done);
    });
  });

  describe('Group #4 => When calling validateForm, and addFieldValidation with sync function', () => {
    it('Spec #1 => should return a failed FormValidationResult with one fieldErrors equals ' +
      '{ succeeded: false, key: "fullname", type: "REQUIRED", errorMessage: "Mandatory Field" } ' +
      'when passing one sync validation rule with key equals "fullname" and ' +
      'viewModel equals { id: "1", fullname: "" }', (done) => {
        // Arrange
        const validationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: '' };

        // Act
        validationEngine.addFieldValidation('fullname',
          (value, vm): FieldValidationResult => {
            // Required field
            // in this case no async stuff
            // we can directly resolve the promise
            let isFieldInformed: boolean = (value != null && value.length > 0);
            // We could use string ID's if multilanguage is required
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return validationResult;
          }
        );

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.false;

            expect(formValidationResult.fieldErrors).to.deep.equal({
              fullname: {
                key: 'fullname',
                succeeded: false,
                type: 'REQUIRED',
                errorMessage: 'Mandatory field',
              } as FieldValidationResult,
            });
            done();
          });
      });

    it('Spec #2 => should return a succeeded FormValidationResult with one fieldErrors ' +
      'equals { succeeded: true, key: "fullname", type: "REQUIRED", errorMessage: "" }' +
      'When passing one sync validation rule with key equals "fullname" and ' +
      'viewModel equals { id: "1", fullname: "john" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: 'john' };

        // Act
        validationEngine.addFieldValidation('fullname',
          (value, vm): FieldValidationResult => {
            // Required field
            // in this case no async stuff
            // we can directly resolve the promise
            let isFieldInformed: boolean = (value != null && value.length > 0);
            // We could use string ID's if multilanguage is required
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return validationResult;
          }
        );

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.true;

            expect(formValidationResult.fieldErrors).to.deep.equal({
              fullname: {
                key: 'fullname',
                succeeded: true,
                type: 'REQUIRED',
                errorMessage: '',
              } as FieldValidationResult,
            });
            done();
          });
      });

    it('Spec #3 => should return a failed FormValidationResult with two fieldErrors first equals ' +
      '{ succeeded: false, key: "fullname", type: "REQUIRED", errorMessage: "Mandatory Field" }' +
      'and second equals { succeeded: false, key: "password", type: "REQUIRED", errorMessage: "Mandatory Field" }' +
      'When passing one sync validation rule with key equals "fullname", one async validation rule with key equals "password" ' +
      'and viewModel equals { id: "1", fullname: "", password: ""  }', (done) => {
        // Arrange
        const validationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: '', password: "" };

        // Act
        validationEngine.addFieldValidation('fullname',
          (value, vm): FieldValidationResult => {
            let isFieldInformed: boolean = (value != null && value.length > 0);
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return validationResult;
          }
        );

        validationEngine.addFieldValidation('password',
          (value, vm): Promise<FieldValidationResult> => {
            let isFieldInformed: boolean = (value != null && value.length > 0);
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.false;

            expect(formValidationResult.fieldErrors).to.deep.equal({
              fullname: {
                key: 'fullname',
                succeeded: false,
                type: 'REQUIRED',
                errorMessage: 'Mandatory field',
              } as FieldValidationResult,
              password: {
                key: 'password',
                succeeded: false,
                type: 'REQUIRED',
                errorMessage: 'Mandatory field',
              } as FieldValidationResult,
            });

            done();
          });
      });

    it('Spec #4 => should return a succeeded FormValidationResult with two fieldErrors first equals ' +
      '{ succeeded: true, key: "fullname", type: "REQUIRED", errorMessage: "" }' +
      'and second equals { succeeded: true, key: "password", type: "REQUIRED", errorMessage: "" }' +
      'When passing one sync validation rule with key equals "fullname", one async validation rule with' +
      'key equals "password" and viewModel equals { id: "1", fullname: "john", password: "123" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: 'john', password: '123' };

        // Act
        // name mandatory
        validationEngine.addFieldValidation('fullname',
          (value, vm): FieldValidationResult => {
            let isFieldInformed: boolean = (value != null && value.length > 0);
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return validationResult;
          }
        );

        // password mandatory and min length 3
        validationEngine.addFieldValidation('password',
          (value, vm): Promise<FieldValidationResult> => {
            let isFieldInformed: boolean = (value != null && value.length > 0);
            let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

            const validationResult: FieldValidationResult = new FieldValidationResult();
            validationResult.type = "REQUIRED";
            validationResult.succeeded = isFieldInformed;
            validationResult.errorMessage = errorInfo;

            return Promise.resolve(validationResult);
          }
        );

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.true;

            expect(formValidationResult.fieldErrors).to.deep.equal({
              fullname: {
                key: 'fullname',
                succeeded: true,
                type: 'REQUIRED',
                errorMessage: '',
              } as FieldValidationResult,
              password: {
                key: 'password',
                succeeded: true,
                type: 'REQUIRED',
                errorMessage: '',
              } as FieldValidationResult,
            });

            done();
          });
      });
  });

  describe('Group #5 => When calling validateForm and addFormValidation with sync and async functions', () => {
    it('Spec #1 => should return a succeeded FormValidationResult with one formGlobalErrors equals ' +
      '{ succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "" }' +
      'When passing one sync global validation rule and viewModel equals { id: "1", fullname: "john" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: 'john' };

        // Act
        validationEngine.addFormValidation((vm): FieldValidationResult => {
          let isFieldInformed: boolean = (vm.fullname != null && vm.fullname.length > 0);
          let errorInfo: string = (isFieldInformed) ? "" : "Global form check Mandatory field";

          const validationResult: FieldValidationResult = new FieldValidationResult();
          validationResult.type = "GLOBAL_FORM_REQUIRED";
          validationResult.succeeded = isFieldInformed;
          validationResult.errorMessage = errorInfo;

          return validationResult;
        });

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.true;

            expect(formValidationResult.formGlobalErrors).to.have.length(1);

            expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.true;
            expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
            expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('');

            done();
          });
      });

    it('Spec #2 => should return a failed FormValidationResult with one formGlobalErrors equals ' +
      '{ succeeded: false, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "Global form check Mandatory field" }' +
      'When passing one global validation rule and viewModel equals { id: "1", fullname: "" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: '' };

        // Act
        validationEngine.addFormValidation((vm): FieldValidationResult => {
          let isFieldInformed: boolean = (vm.fullname != null && vm.fullname.length > 0);
          let errorInfo: string = (isFieldInformed) ? "" : "Global form check Mandatory field";

          const validationResult: FieldValidationResult = new FieldValidationResult();
          validationResult.type = "GLOBAL_FORM_REQUIRED";
          validationResult.succeeded = isFieldInformed;
          validationResult.errorMessage = errorInfo;

          return validationResult;
        });

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.false;

            expect(formValidationResult.formGlobalErrors).to.have.length(1);

            expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.false;
            expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
            expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('Global form check Mandatory field');

            done();
          });
      });

    it('Spec #3 => should return a succeeded FormValidationResult with two formGlobalErrors ' +
      'first equals { succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "" }' +
      'second equals { succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_MIN_LENGTH", errorMessage: "" }' +
      'When passing one sync and other async global validation rules and viewModel equals { id: "1", fullname: "john" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: 'john' };

        // Act
        validationEngine.addFormValidation((vm): Promise<FieldValidationResult> => {
          let isFieldInformed: boolean = (vm.fullname != null && vm.fullname.length > 0);
          let errorInfo: string = (isFieldInformed) ? "" : "Global form check Mandatory field";

          const validationResult: FieldValidationResult = new FieldValidationResult();
          validationResult.type = "GLOBAL_FORM_REQUIRED";
          validationResult.succeeded = isFieldInformed;
          validationResult.errorMessage = errorInfo;

          return Promise.resolve(validationResult);
        });

        validationEngine.addFormValidation((vm): FieldValidationResult => {
          let minLength: boolean = (vm.fullname != null && vm.fullname.length >= 3);
          let errorInfo: string = (minLength) ? "" : "Global form check must be at least 3 characters";

          const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
          fieldValidationResult.type = "GLOBAL_FORM_MIN_LENGTH";
          fieldValidationResult.succeeded = minLength;
          fieldValidationResult.errorMessage = errorInfo;

          return fieldValidationResult;
        });

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.true;

            expect(formValidationResult.formGlobalErrors).to.have.length(2);

            expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.true;
            expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
            expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('');

            expect(formValidationResult.formGlobalErrors[1].succeeded).to.be.true;
            expect(formValidationResult.formGlobalErrors[1].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[1].type).to.equal('GLOBAL_FORM_MIN_LENGTH');
            expect(formValidationResult.formGlobalErrors[1].errorMessage).to.equal('');

            done();
          });
      });

    it('Spec #4 => should return a failed FormValidationResult with two formGlobalErrors ' +
      'first equals { succeeded: true, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_REQUIRED", errorMessage: "" }' +
      'second equals { succeeded: false, key: "_GLOBAL_FORM_", type: "GLOBAL_FORM_MIN_LENGTH", errorMessage: "Global form check must be at least 3 characters" }' +
      'When passing one sync and other async global validation rules and viewModel equals { id: "1", fullname: "jo" }', (done) => {
        // Arrange
        const validationEngine: ValidationEngine = new ValidationEngine();
        const viewModel = { id: '1', fullname: 'jo' };

        // Act
        validationEngine.addFormValidation((vm): Promise<FieldValidationResult> => {
          let isFieldInformed: boolean = (vm.fullname != null && vm.fullname.length > 0);
          let errorInfo: string = (isFieldInformed) ? "" : "Global form check Mandatory field";

          const validationResult: FieldValidationResult = new FieldValidationResult();
          validationResult.type = "GLOBAL_FORM_REQUIRED";
          validationResult.succeeded = isFieldInformed;
          validationResult.errorMessage = errorInfo;

          return Promise.resolve(validationResult);
        });

        validationEngine.addFormValidation((vm): FieldValidationResult => {
          let minLength: boolean = (vm.fullname != null && vm.fullname.length >= 3);
          let errorInfo: string = (minLength) ? "" : "Global form check must be at least 3 characters";

          const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
          fieldValidationResult.type = "GLOBAL_FORM_MIN_LENGTH";
          fieldValidationResult.succeeded = minLength;
          fieldValidationResult.errorMessage = errorInfo;

          return fieldValidationResult;
        });

        validationEngine.validateForm(viewModel)
          .then((formValidationResult: FormValidationResult) => {
            expect(formValidationResult.succeeded).to.be.false;

            expect(formValidationResult.formGlobalErrors).to.have.length(2);

            expect(formValidationResult.formGlobalErrors[0].succeeded).to.be.true;
            expect(formValidationResult.formGlobalErrors[0].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[0].type).to.equal('GLOBAL_FORM_REQUIRED');
            expect(formValidationResult.formGlobalErrors[0].errorMessage).to.equal('');

            expect(formValidationResult.formGlobalErrors[1].succeeded).to.be.false;
            expect(formValidationResult.formGlobalErrors[1].key).to.be.equal('_GLOBAL_FORM_');
            expect(formValidationResult.formGlobalErrors[1].type).to.equal('GLOBAL_FORM_MIN_LENGTH');
            expect(formValidationResult.formGlobalErrors[1].errorMessage).to.equal('Global form check must be at least 3 characters');

            done();
          });
      });
  });
});

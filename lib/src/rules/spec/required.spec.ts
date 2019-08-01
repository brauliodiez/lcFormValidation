import { required, RequiredParams } from '../required';
import { FieldValidationResult } from '../../entities';

describe('[required] validation rule tests =>', () => {
  describe('When validating a non string value', () => {
    it('should return false if value is null', () => {
      // Arrange
      const value = null;
      const vm = undefined;
      const customParams: RequiredParams = undefined;

      // Act
      const validationResult = required(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.false;
      expect(validationResult.type).to.be.equals('REQUIRED');
      expect(validationResult.errorMessage).to.be.equals('Please fill in this mandatory field.');
    });

    it('should return false if value is undefined', () => {
      // Arrange
      const value = undefined;
      const vm = undefined;
      const customParams: RequiredParams = undefined;

      // Act
      const validationResult = required(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.false;
      expect(validationResult.type).to.be.equals('REQUIRED');
      expect(validationResult.errorMessage).to.be.equals('Please fill in this mandatory field.');
    });

    it('should return false if value is false', () => {
      // Arrange
      const value = false;
      const vm = undefined;
      const customParams: RequiredParams = undefined;

      // Act
      const validationResult = required(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.false;
      expect(validationResult.type).to.be.equals('REQUIRED');
      expect(validationResult.errorMessage).to.be.equals('Please fill in this mandatory field.');
    });

    it('should return true if value is true', () => {
      // Arrange
      const value = true;
      const vm = undefined;
      const customParams: RequiredParams = undefined;

      // Act
      const validationResult = required(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('REQUIRED');
      expect(validationResult.errorMessage).to.be.empty;
    });

    it('should return true if typeof value is number', () => {
      // Arrange
      const value = 1;
      const vm = undefined;
      const customParams: RequiredParams = undefined;

      // Act
      const validationResult = required(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('REQUIRED');
      expect(validationResult.errorMessage).to.be.empty;
    });
  });

  describe('When validating a string value', () => {
    it('should return false if string is empty', () => {
      // Arrange
      const value = '';
      const vm = undefined;
      const customParams: RequiredParams = undefined;

      // Act
      const validationResult = required(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.false;
      expect(validationResult.type).to.be.equals('REQUIRED');
      expect(validationResult.errorMessage).to.be.equals('Please fill in this mandatory field.');
    });

    it('should return true if string has whitespace characters and trim option is false', () => {
      // Arrange
      const value = ' ';
      const vm = undefined;
      const customParams: RequiredParams = { trim: false };

      // Act
      const validationResult = required(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('REQUIRED');
      expect(validationResult.errorMessage).to.be.empty;
    });

    it('should return true if string has whitespace characters and trim option is null', () => {
      // Arrange
      const value = ' ';
      const vm = undefined;
      const customParams: RequiredParams = { trim: null };

      // Act
      const validationResult = required(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('REQUIRED');
      expect(validationResult.errorMessage).to.be.empty;
    });

    it('should return true if string has whitespace characters and trim option is undefined', () => {
      // Arrange
      const value = ' ';
      const vm = undefined;
      const customParams: RequiredParams = { trim: undefined };

      // Act
      const validationResult = required(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('REQUIRED');
      expect(validationResult.errorMessage).to.be.empty;
    });

    it('should return false if string has whitespace characters and trim option is true', () => {
      // Arrange
      const value = ' ';
      const vm = undefined;
      const customParams: RequiredParams = { trim: true };

      // Act
      const validationResult = required(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.false;
      expect(validationResult.type).to.be.equals('REQUIRED');
      expect(validationResult.errorMessage).to.be.equals('Please fill in this mandatory field.');
    });

    it('should trim by default', () => {
      // Arrange
      const value = ' ';
      const vm = undefined;
      const customParams = undefined;

      // Act
      const validationResult = required(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.false;
      expect(validationResult.type).to.be.equals('REQUIRED');
      expect(validationResult.errorMessage).to.be.equals('Please fill in this mandatory field.');
    });
  });
});

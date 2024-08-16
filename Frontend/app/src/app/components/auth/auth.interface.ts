interface EmailValidationResult {
  invalidCharacters: boolean,
  invalidEmail: boolean,
  validEmail: boolean
}
interface PasswordValidationResult {
  invalidCharacters: boolean;
  shortPassword: boolean;
  missingUppercase: boolean;
  missingLowercase: boolean;
  missingNumber: boolean;
  missingSpecialChar: boolean;
  validPassword: boolean;
}

export { EmailValidationResult, PasswordValidationResult}
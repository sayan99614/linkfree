export default class InputValidator {
  constructor() {
    this.errors = {};
    this.hasError = false;
    this.errorMessages = {
      required: "This field is required.",
      minLength: "Please enter a value with at least {minLength} characters.",
      maxLength: "Please enter a value with at most {maxLength} characters.",
      email: "Please enter a valid email address.",
      password:
        "Please enter a password with {minLength}-{maxLength} characters.",
    };
  }

  validateText(value, options = {}) {
    const { minLength = 3, maxLength = 50, required = false } = options;

    if (required && (!value || value.trim() === "")) {
      return this.errorMessages.required;
    }

    if (value.length < minLength || value.length > maxLength) {
      return this.errorMessages.minLength
        .replace("{minLength}", minLength)
        .replace("{maxLength}", maxLength);
    }

    return null;
  }

  validateEmail(value, options = {}) {
    this.hasError = false;
    const { required = false } = options;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);

    if (required && (!value || value.trim() === "")) {
      this.hasError = true;
      return this.errorMessages.required;
    }

    if (!isValid) {
      this.hasError = true;
      return this.errorMessages.email;
    }

    return null;
  }

  validatePassword(value, options = {}) {
    const { minLength = 6, maxLength = 20, required = false } = options;

    if (required && (!value || value.trim() === "")) {
      this.hasError = true;
      return this.errorMessages.required;
    }

    if (value.length < minLength || value.length > maxLength) {
      this.hasError = true;
      return this.errorMessages.password
        .replace("{minLength}", minLength)
        .replace("{maxLength}", maxLength);
    }

    return null;
  }

  validate(data) {
    this.errors = {};

    Object.entries(data).forEach(([fieldName, fieldValue]) => {
      switch (fieldName) {
        case "text":
          this.errors[fieldName] = this.validateText(fieldValue);
          break;
        case "email":
          this.errors[fieldName] = this.validateEmail(fieldValue);
          break;
        case "password":
          this.errors[fieldName] = this.validatePassword(fieldValue);
          break;
        // Add more validation methods for other fields as needed
      }
    });

    return this.getErrors();
  }

  getErrors() {
    const filteredErrors = Object.fromEntries(
      Object.entries(this.errors).filter(([key, value]) => value !== null)
    );
    return Object.keys(filteredErrors).length === 0 ? null : filteredErrors;
  }
}

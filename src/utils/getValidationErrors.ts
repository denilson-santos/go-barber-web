import { ValidationError } from 'yup';

type Errors = {
  [key: string]: string;
};

export default function getValidationErros(error: ValidationError): Errors {
  const validationErrors: Errors = {};

  error.inner.forEach((err) => {
    if (err.path) validationErrors[err.path] = err.message;
  });

  return validationErrors;
}

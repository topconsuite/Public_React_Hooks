import { ValidationError } from "../../libraries/yup";

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {

  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    if (error.path === undefined) return;
    if (error.message === "" || error.message === undefined) return;
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}

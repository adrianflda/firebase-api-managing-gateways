import IHTTPError from "../interfaces/IHttpError";

class InvalidValueError extends Error implements IHTTPError {
    httpStatusCode = 422;

    constructor(message: string | undefined) {
      super(message);

      // Set the prototype explicitly.
      Object.setPrototypeOf(this, InvalidValueError.prototype);
    }
}

export default InvalidValueError;

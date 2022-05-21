import IHTTPError from "../interfaces/IHttpError";

class UnauthenticatedError extends Error implements IHTTPError {
    httpStatusCode = 401;

    constructor(message: string | undefined) {
      super(message);

      // Set the prototype explicitly.
      Object.setPrototypeOf(this, UnauthenticatedError.prototype);
    }
}

export default UnauthenticatedError;

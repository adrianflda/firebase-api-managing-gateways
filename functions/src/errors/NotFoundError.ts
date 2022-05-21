import IHTTPError from "../interfaces/IHttpError";

class NotFoundError extends Error implements IHTTPError {
    httpStatusCode = 404;

    constructor(message: string | undefined) {
      super(message);

      // Set the prototype explicitly.
      Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export default NotFoundError;

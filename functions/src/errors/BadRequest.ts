import IHTTPError from "../interfaces/IHttpError";

class BadRequest extends Error implements IHTTPError {
    httpStatusCode = 400;

    constructor(message: string | undefined) {
      super(message);

      // Set the prototype explicitly.
      Object.setPrototypeOf(this, BadRequest.prototype);
    }
}

export default BadRequest;

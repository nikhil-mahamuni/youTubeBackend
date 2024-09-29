class ApiError extends Error {
  constructor(message, statusCode, error = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.data = null, 
    this.message = message;
    this.sucess = false;
    this.errors = error;

    if(stack){
      this.stack=stack
    }else{
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export {ApiError}


const RealError = Error;

function ExtendableError(message, extra) {
    RealError.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.extra = extra;
};
  
require("util").inherits(ExtendableError, RealError);

global.Error = ExtendableError;

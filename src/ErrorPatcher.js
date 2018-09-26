
const RealError = Error;

function ExtendableError() { 
    var error = RealError.apply(this, arguments);
    return error;
}
ExtendableError.prototype = new RealError();

global.Error = ExtendableError;

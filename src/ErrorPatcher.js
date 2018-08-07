
const RealError = Error;

class ExtendableError extends Error {
    constructor (message) {
        super(message);
        // a workaround to make `instanceof ExtendableError` work in ES5
        this.constructor = ExtendableError;
        this.__proto__   = ExtendableError.prototype;
    }
}

function ExtendableError2() { 
    var returned = RealError.apply(this, arguments);
}
ExtendableError2.prototype = new RealError();

global.Error = ExtendableError2;

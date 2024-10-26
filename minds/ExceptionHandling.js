class CustomError extends Error {
    constructor(message, name) {
        super(message);
        this.name = name || 'CustomError';
    }
}

class ObjectNotFound extends CustomError {
    constructor(message) {
        super(message, 'ObjectNotFound');
    }
}

class Forbidden extends CustomError {
    constructor(message) {
        super(message, 'Forbidden');
    }
}

class Unauthorized extends CustomError {
    constructor(message) {
        super(message, 'Unauthorized');
    }
}

class UnknownError extends CustomError {
    constructor(message) {
        super(message, 'UnknownError');
    }
}

class ObjectNotSupported extends CustomError {
    constructor(message) {
        super(message, 'ObjectNotSupported');
    }
}

export {
    ObjectNotFound,
    Forbidden,
    Unauthorized,
    UnknownError,
    ObjectNotSupported,
};

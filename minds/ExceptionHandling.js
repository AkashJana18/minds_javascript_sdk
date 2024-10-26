class CustomError extends Error {
    constructor(message, name) {
        super(message);
        this.name = name || 'CustomError';
        Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
}

class ObjectNotFound extends CustomError {
    constructor(message) {
        super(message || 'The requested object was not found.', 'ObjectNotFound');
    }

    getStatusCode() {
        return 404; // Not Found
    }
}

class Forbidden extends CustomError {
    constructor(message) {
        super(message || 'Access to the requested resource is forbidden.', 'Forbidden');
    }

    getStatusCode() {
        return 403; // Forbidden
    }
}

class Unauthorized extends CustomError {
    constructor(message) {
        super(message || 'Authentication is required and has failed or has not yet been provided.', 'Unauthorized');
    }

    getStatusCode() {
        return 401; // Unauthorized
    }
}

class UnknownError extends CustomError {
    constructor(message) {
        super(message || 'An unknown error occurred.', 'UnknownError');
    }

    getStatusCode() {
        return 500; // Internal Server Error
    }
}

class ObjectNotSupported extends CustomError {
    constructor(message) {
        super(message || 'The requested object type is not supported.', 'ObjectNotSupported');
    }

    getStatusCode() {
        return 400; // Bad Request
    }
}

export {
    ObjectNotFound,
    Forbidden,
    Unauthorized,
    UnknownError,
    ObjectNotSupported,
};

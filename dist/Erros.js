"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.ConflictError = exports.UnauthorizedError = exports.ForbbidenError = exports.NotFoundError = exports.BadRequestError = void 0;
class BadRequestError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.statusCode = 400;
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.statusCode = 404;
    }
}
exports.NotFoundError = NotFoundError;
class ForbbidenError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.statusCode = 403;
    }
}
exports.ForbbidenError = ForbbidenError;
class UnauthorizedError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.statusCode = 401;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ConflictError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.statusCode = 409;
    }
}
exports.ConflictError = ConflictError;
class InternalServerError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.statusCode = 500;
    }
}
exports.InternalServerError = InternalServerError;

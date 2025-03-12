import { JsonWebTokenError } from "jsonwebtoken";

export class BadRequestError extends Error {
  readonly statusCode: number;

  constructor(mensagem: string) {
    super(mensagem);
    this.statusCode = 400;
  }
}

export class NotFoundError extends Error {
  readonly statusCode: number;

  constructor(mensagem: string) {
    super(mensagem);
    this.statusCode = 404;
  }
}

export class ForbbidenError extends Error {
  readonly statusCode: number;

  constructor(mensagem: string) {
    super(mensagem);
    this.statusCode = 403;
  }
}

export class UnauthorizedError extends Error {
  readonly statusCode: number;

  constructor(mensagem: string) {
    super(mensagem);
    this.statusCode = 401;
  }
}

export class InternalServerError extends Error {
  readonly statusCode: number;

  constructor(mensagem: string) {
    super(mensagem);
    this.statusCode = 500;
  }
}

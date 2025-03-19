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

export class ForbiddenError extends Error {
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

export class ConflictError extends Error {
  readonly statusCode: number;

  constructor(mensagem: string) {
    super(mensagem);
    this.statusCode = 409;
  }
}

export class InternalServerError extends Error {
  readonly statusCode: number;

  constructor(mensagem: string) {
    super(mensagem);
    this.statusCode = 500;
  }
}

export class ValidationError extends Error {
  readonly statusCode: number;

  constructor(mensagem: string) {
    super(mensagem);
    this.statusCode = 400;
  }
}

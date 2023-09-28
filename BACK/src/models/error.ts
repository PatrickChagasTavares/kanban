class AppError extends Error {
  public readonly statusCode: number;
  public readonly details?: string;

  constructor(statusCode: number, message: string, details?: string) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.message = message
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;

export class AppError extends Error {
	public statusCode: number;
	public isOperational: boolean;

	constructor(message: string, statusCode = 500) {
		super(message);

		this.statusCode = statusCode;
		this.isOperational = true;

		// Maintains proper stack trace (V8)
		Error.captureStackTrace(this, this.constructor);
	}
}

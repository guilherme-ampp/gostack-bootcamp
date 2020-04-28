class AppError {
    // public exceptions can be accessed from outisde the class
    public readonly message: string;

    public readonly statusCode: number; // HTTP status code

    // statusCode default value = 400 - with this, typescript already infers
    // the type for statusCode is number
    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default AppError;

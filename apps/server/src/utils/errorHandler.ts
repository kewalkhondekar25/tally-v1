class ErrorHandler extends Error {
    statusCode: number
    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode
    };
};

const apiError = (message: string, statusCode: number) => {
    return new ErrorHandler(message, statusCode);
};

export { ErrorHandler, apiError };
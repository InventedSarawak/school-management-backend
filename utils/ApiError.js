class ApiError extends Error {
    statusCode
    data
    message
    success
    errors

    constructor(
        statusCode,
        message = 'Something went wrong',
        cb = () => {},
        errors = [],
        stack = ''
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
        cb()
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default ApiError

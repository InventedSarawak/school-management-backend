const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        try {
            await requestHandler(req, res, next)
        } catch (error) {
            const errorCode = error?.code || 500
            const statusCode = isValidHttpStatusCode(errorCode)
                ? errorCode
                : 500
            const message = error?.message || 'Internal Server Error'

            res.status(statusCode).json({
                success: false,
                message,
            })
        }
    }
}

function isValidHttpStatusCode(code) {
    return Number.isInteger(code) && code >= 100 && code < 600
}

export default asyncHandler

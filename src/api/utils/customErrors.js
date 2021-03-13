const customErrors = () => {
    const serverError = (msg = "Server error.") => {
    
        return {
            statusCode: 500,
            message: msg
        }
    }

    const badRequestError = (msg = "Bad request error.") => {
        return {
            statusCode: 400,
            message: msg
        }
    }

    const authError = (msg = "Not authorized.") => {
        return {
            statusCode: 401,
            message: msg
        }
    }

    const notFoundError = (msg = "Resource not found.") => {
        return {
            statusCode: 404,
            message: msg
        }
    }

    const databaseError = (msg = "Database error.") => {
        return {
            statusCode: 500,
            message: msg
        }
    }

    return {
        serverError,
        badRequestError,
        authError,
        notFoundError,
        databaseError
    }
}

module.exports = customErrors
class ApiErrorHandler extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static incorrectRequest(message) { 
        return new ApiErrorHandler(400, message)
    }

    static internalServer(message) {
        return new ApiErrorHandler(500, message)
    }

}

export default ApiErrorHandler
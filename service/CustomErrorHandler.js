class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super();
        (this.status = status),
        (this.message = msg);
    }

    static alreadyExist(message) {
        console.log("message", message);
        return new CustomErrorHandler(409, message);
    }
    static wronCredentails(message = "Username or Passowrd is Wrong.!") {
        return new CustomErrorHandler(401, message);
    }
    static datanotFound(message = "Data Not Found.") {
        return new CustomErrorHandler(410, message);
    }
    static serverError(message = "Server Error") {
        return new CustomErrorHandler(405, message);
    }
    static serverError(message = "Internal Server Error") {
        return new CustomErrorHandler(500, message);
    }

}
export default CustomErrorHandler;
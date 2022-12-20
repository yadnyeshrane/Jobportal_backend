class CustomErrorHandler extends Error{
    constructor(status,msg){
        super();
        this.status=status,
        this.message=msg

    }
    static alreadyExist(message)
    {
        console.log("message",message)
        return new CustomErrorHandler(409,message)
    }
    static wronCredentails(message="username or passowrd is wrong")
    {
        return new CustomErrorHandler(401,message)
    }
    static datanotFound(message="Datanot found"){
        return new CustomErrorHandler(410,message);
    }
    static serverError(message="server error"){
        return new CustomErrorHandler(405,message)
    }
    static serverError(message = 'Internal server error') {
        return new CustomErrorHandler(500, message);
    }
   
}
export default CustomErrorHandler;
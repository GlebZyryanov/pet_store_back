class ApiError extends Error{
    constructor(status,message){
        super() //вызываем родительский конструктор с помощью функции super
        this.status = status // и присваиваем полям параметры
        this.message = message
    }

    //!статические функции - это функции которые можно вызывать без создания объекта! т.е. можно обращаться напрямую к классу
    static badRequest(message){
        return new ApiError(404, message)
    }
    static Internal(message){
        return new ApiError(500,message)
    }

    static forbidden(message){
        return new ApiError(403,message)
    }

}

module.exports = ApiError
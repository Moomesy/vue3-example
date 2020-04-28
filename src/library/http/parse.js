class HttpError extends Error {
    constructor(message, code = -1) {
        super(message);
        this.code = code;
    }
}
function WWW_AIYILEARNING_COM_PARSE(data) {
    if (data.hasOwnProperty('succeed') && data.succeed) {
        return data.data;
    }
    throw new HttpError(data.message, data.code);
}
function GW_AIYILEARNING_COM_PARSE(data) {
    // 异常处理
    if (data.state === 'Exception') {
        switch (data.exception.type) {
            case 'AuthenticationCredentialsNotFoundException': // 令牌失效，踢出系统
                throw new HttpError('无效的令牌');
            case 'AccessDeniedException': // 没有权限
                throw new HttpError('不允许访问');
            case 'IllegalArgumentException':
                throw new HttpError(data.exception.message);
            default:
                throw new HttpError('无法处理的服务器异常');
        }
    }

    // Error
    if (data.state === 'Error') {
        throw new HttpError('服务器连接超时，请稍后再试')
    }

    // 正常返回
    if (data.state.toLowerCase() === 'success') {
        return data.content;
    }
    throw new HttpError("服务器连接超时，请稍后再试");
}
export {
    WWW_AIYILEARNING_COM_PARSE,
    GW_AIYILEARNING_COM_PARSE,
    HttpError
}
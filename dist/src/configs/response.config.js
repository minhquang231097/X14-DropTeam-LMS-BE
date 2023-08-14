"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESPONSE_CONFIG = void 0;
exports.RESPONSE_CONFIG = {
    MESSAGE: {
        USER: {
            NO_FULLNAME: "Require fullname",
            NO_USERNAME: "Require username",
            USERNAME_ERROR: "Username exist",
            NO_PASSWORD: "Require password",
            NO_EMAIL: "Require email",
            EMAIL_ERROR: "Email exist",
            EMAIL_INCORRECT: "Email incorrect",
            NO_PHONE_NUM: "Require phonenumber",
            PHONE_ERROR: "Phone number exist",
            NOT_CORRECT: "Username or password is incorect",
            FOUND: "User found",
            NOT_FOUND: "Can't find any user",
            PAGE_NOT_FOUND: "Page not found!",
            PASS_NOT_CORRECT: "Password is incorrect",
            NOT_LOGIN: "You have to login first",
            LOGIN_SUCCESS: "Login Success",
            SIGNUP_SUCCESS: "Signup Success",
            PASSWORD_CHANGED: "Change password success",
            SUCCESS: "Success",
            WRONG: "Something wrong...",
            TOKEN_ERROR: "Refresh Token incorrect",
            NO_PERMISSION: "You don't have permission to access this",
        },
        WORKPLACE: {
            NO_CODENAME: "Require class code",
            CODE_EXIST: "Class code exist!",
            CODE_ERROR: "Class code is too long",
            NO_WORKPLACE: "Require workplace",
            WORKPLACE_EXIST: "Workplace exist",
            NO_ADDRESS: "Require address",
            NOT_FOUND: "Can't find any workplace",
            STATUS_ERROR: `Status must be "ON", "OFF", "PENDING"`,
            PAGE_NOT_FOUND: "Page not found!",
        },
        COURSE: {
            NO_CODE: "Require course Code",
            CODE_EXIST: "Course code exist!",
            NO_TITLE: "Require title",
            TITLE_EXIST: "Title exist!",
            NO_DESCRIPTION: "Require description",
            DESCRIPTION_ERROR: "Description is too long",
            NO_SESSION: "Require Session",
            SESSION_ERROR: "Session must be number",
            NO_PRICE: "Require price",
            PRICE_ERROR: "Price must be natural number",
        },
        CLASS: {},
        100: "Continue",
        101: "Switching Protocols",
        102: "Processing",
        200: "OK!",
        201: "Created!",
        202: "Accepted",
        204: "No Content",
        205: "Reset Content",
        206: "Partial Content",
        300: "Multiple Choices",
        301: "Moved Permanently",
        302: "Found",
        303: "See Other",
        304: "Not Modified",
        305: "Use Proxy",
        306: "Switch Proxy",
        307: "Temporary Redirect",
        308: "Permanent Redirect",
        400: "Bad Request",
        401: "Require login!",
        402: "Payment Required",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        406: "Not Acceptable",
        407: "Proxy Authentication Required",
        408: "Request Timeout",
        409: "Conflict",
        410: "Gone",
        411: "Length Required",
        412: "Precondition Failed",
        413: "Payload Too Large",
        414: "URI Too Long",
        415: "Unsupported Media Type",
        416: "Range Not Satisfiable",
        417: "Expectation Failed",
        451: "Unavailable For Legal Reasons",
        500: "Internal Server Error",
        501: "Not Implemented",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Timeout",
        505: "HTTP Version Not Supported",
    },
};
//# sourceMappingURL=response.config.js.map
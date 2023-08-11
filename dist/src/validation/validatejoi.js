"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateJoi = void 0;
const ValidateJoi = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        }
        catch (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).json({ errors });
        }
    };
};
exports.ValidateJoi = ValidateJoi;
//# sourceMappingURL=validatejoi.js.map
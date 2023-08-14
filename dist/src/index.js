"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const bodyParser = require("body-parser");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: true, credentials: true }));
const port = process.env.PORT || 8080;
app.get("/", (req, res, next) => {
    res.status(200).send("Hello!");
});
const connectDB_1 = require("./common/connectDB");
(0, connectDB_1.connectDB)();
const workplace_route_1 = __importDefault(require("./routers/workplace.route"));
const course_route_1 = __importDefault(require("./routers/course.route"));
const class_route_1 = __importDefault(require("./routers/class.route"));
const session_route_1 = __importDefault(require("./routers/session.route"));
const regist_course_route_1 = __importDefault(require("./routers/regist.course.route"));
const feedback_route_1 = __importDefault(require("./routers/feedback.route"));
const auth_route_1 = __importDefault(require("./routers/auth.route"));
const lesson_route_1 = __importDefault(require("./routers/lesson.route"));
const attendance_route_1 = __importDefault(require("./routers/attendance.route"));
const upload_route_1 = __importDefault(require("./routers/upload.route"));
const user_route_1 = __importDefault(require("./routers/user.route"));
app.use("/api/v1/auth", auth_route_1.default);
app.use("/api/v1/user", user_route_1.default);
app.use("/api/v1/workplace", workplace_route_1.default);
app.use("/api/v1/course", course_route_1.default);
app.use("/api/v1/class", class_route_1.default);
app.use("/api/v1/session", session_route_1.default);
app.use("/api/v1/lesson", lesson_route_1.default);
app.use("/api/vi/regist-course", regist_course_route_1.default);
app.use("/api/vi/feedback", feedback_route_1.default);
app.use("/api/vi/attendance", attendance_route_1.default);
app.use("/api/vi/upload", upload_route_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
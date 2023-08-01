import sessionController from "@/controllers/session.controller"
import express from "express"

const sessionRouter = express.Router()

// const sessionRepository = new SessionRepository(Session)
// const sessionService = new SessionService(sessionRepository)
// const sessionController = new SessionController(sessionService)

sessionRouter.get("/", sessionController.GetAll)

export default sessionRouter
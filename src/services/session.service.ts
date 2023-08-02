import { SessionRepository } from "@/repository/session.repo"

export class SessionService {
    static GetAllSession: any
    constructor(private readonly sessionRepository: SessionRepository) {

    }

    async GetAllSession() {
        return await this.sessionRepository.FindAll()
    }
}
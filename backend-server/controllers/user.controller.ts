import { Request, Router } from 'express';
import { UserService } from '../services/user.service'
import { email, object, string } from 'cast.ts'

export class UserController {
    router = Router()
    constructor(public userService: UserService) {
        this.router.post('/login', async (req, res, next) => {
            try {
                let json = await this.login(req)
                res.json(json)
            } catch (error) {
                next(error)
            }
        })
        this.router.post('/create_user', async (req, res, next) => {

        })
    }

    login = (req: Request) => {
        let parser = object({
            body: object({
                email: email(),
                password: string({ minLength: 6 })
            })
        })
        let user = parser.parse(req).body
        return this.userService.login(user)
    }
}


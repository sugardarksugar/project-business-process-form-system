import { Request } from 'express';
import { UserService } from '../services/user.service'
import { email, object, string } from 'cast.ts'

export class UserController {
    constructor(public userService: UserService) { }
    wrapMethod(fn: (req: Request) => any) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                let json = await fn(req)
                res.json(json)
            } catch (error) {
                next(error)
            }
        }
    }
}



login = (req: Request) => {
    let parser = object({
        body: object({
            email: email(),
            password: string({ minLength: 6 }),
        })
    })
    let user = parser.parse(req).body

    return this.userService.login(user)
}
}

import jwt from 'jwt-simple'
import { env } from './env'

export type JWTPayload = {
    id: number
    email: string
    is_admin: boolean
}

export function encodeJWT(payload: JWTPayload) {
    let token = jwt.encode(payload, env.JWT_SECRET)
    return token
}
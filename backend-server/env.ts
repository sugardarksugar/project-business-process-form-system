import { config } from 'dotenv'
import populateEnv from 'populate-env'

config()

export let env = {
    NODE_ENV: "development",
    JWT_SECRET: '',
}

populateEnv(env, { mode: 'halt' })
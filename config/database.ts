import { Pool } from 'pg';
import * as dotenv from "dotenv";

const config  = dotenv.config();
console.log(config)

const getPoolConfig = (): Pool => {

    let poolConfig
    if (config.parsed!.MODE === 'PROD') {
        poolConfig = {
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        }
    } else if (config.parsed!.MODE === 'DEV') {
        poolConfig = {
            user: config.parsed!.DB_USER,
            host: config.parsed!.DB_HOST!,
            database: config.parsed!.DB_NAME!,
            password: config.parsed!.DB_PASSWORD!,
            port: parseInt(<string>config.parsed!.DB_PORT),
        }
    }
    return new Pool(poolConfig)
}

export const pool = getPoolConfig()


import { Pool } from 'pg';
import * as dotenv from "dotenv";

const config  = dotenv.config();
console.log(config)

export const pool = new Pool({
    user: config.parsed!.DB_USER,
    host: config.parsed!.DB_HOST!,
    database: config.parsed!.DB_NAME!,
    password: config.parsed!.DB_PASSWORD!,
    port: parseInt(<string>config.parsed!.DB_PORT),
});
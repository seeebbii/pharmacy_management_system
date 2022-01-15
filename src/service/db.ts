import {Pool} from 'pg'

const pool = new Pool({
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: parseInt(process.env.DB_PORT ?? '5432'),
})

export default pool
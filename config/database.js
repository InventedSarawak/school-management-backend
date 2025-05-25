import mysql from 'mysql2/promise'
import fs from 'node:fs'
import path from 'node:path'

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

const modelPath = path.resolve('models', 'school.model.sql')
const createTableSQL = fs.readFileSync(modelPath, 'utf-8')

async function initializeDatabase(maxRetries = 5, retryInterval = 2000) {
    let attempts = 0

    while (attempts < maxRetries) {
        try {
            console.log(
                `Attempting to connect to database (attempt ${
                    attempts + 1
                }/${maxRetries})...`
            )
            await pool.query('SELECT 1')
            console.log('Database connection successful!')

            try {
                await pool.query(createTableSQL)
                console.log('School table ensured in database.')
                return true
            } catch (tableError) {
                console.error('Error creating school table:', tableError)
                throw tableError
            }
        } catch (error) {
            attempts++
            console.log(
                `Database connection failed. Retrying in ${
                    retryInterval / 1000
                } seconds...`
            )
            if (attempts >= maxRetries) {
                console.error('Maximum connection attempts reached:', error)
                throw error
            }
            await new Promise((resolve) => setTimeout(resolve, retryInterval))
        }
    }
}

initializeDatabase().catch((err) => {
    console.error('Failed to initialize database after multiple attempts:', err)
})

async function executeQuery(sql, params = []) {
    try {
        const [rows, fields] = await pool.execute(sql, params)
        return rows
    } catch (error) {
        console.error('Database query error:', error)
        throw error
    }
}

export default executeQuery

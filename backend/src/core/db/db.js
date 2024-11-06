const { Sequelize } = require('sequelize')
require('dotenv').config();

const db = new Sequelize(
    'postgres',
    process.env.dbLogin || 'postgres',
    process.env.dbPass || '',
    {
        host: process.env.dbHost || 'localhost',
        port: process.env.dbPost || 5432,
        dialect: 'postgres'
    }
)

module.exports = { db }
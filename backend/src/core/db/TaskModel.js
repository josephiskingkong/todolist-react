const { db } = require('./db')
const { DataTypes } = require('sequelize')

const TaskModel = db.define('tasks', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    order: {
        type: DataTypes.INTEGER, allowNull: false
    }
})

module.exports = { TaskModel }
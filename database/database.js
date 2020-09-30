const Sequelize = require('sequelize')

const connection = new Sequelize( 'bloggexpress', 'root', 'tigre225', {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = connection;
const Sequelize = require('sequelize')
const connection = require('../database/database')
const Categoria = require('../categorias/Categoria')

const Artigo = connection.define('artigos', { 

    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    }
   
    
});
Categoria.hasMany(Artigo); //Categoria Tem muitos artigos
Artigo.belongsTo(Categoria); // Relacionamento  1 to 1.

//Artigo.sync({force: true})

module.exports = Artigo;
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type : DataTypes.UUID,
      allowNull : false,
      primaryKey : true,
      defaultValue : DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary :{
      type : DataTypes.STRING,
      allowNull : false,
    },
    healthScore : {
      type : DataTypes.STRING,
      allowNull : true,
    },
    analyzedInstructions : {
      type : DataTypes.ARRAY(DataTypes.STRING),
      allowNull : true,
    },
    image : {
      type : DataTypes.STRING,
      allowNull : false,
    }
  },{
    timestamps : false,
  });
};

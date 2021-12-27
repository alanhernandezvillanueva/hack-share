// Model for rating posts will be here 
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Raiting extends Model {}

Raiting.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key:'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key:'id'
            }
        },
        post_raiting:{
            type: DataTypes.INTEGER,
            allowNull: false,
            raitingOptions: [1,2,3,4,5],
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false, 
        freezeTableName:true,
        underscored:true,
        modelName: 'raiting'
    }

);
module.exports = Raiting;

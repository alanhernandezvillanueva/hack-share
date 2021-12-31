// post models will be created here 
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
    // static raiting(body, models) {
    //   return models.Raiting.create({
    //     user_id: body.user_id,
    //     post_id: body.post_id
    //   }).then(() => {
    //     return Post.findOne({
    //       where: {
    //         id: body.post_id
    //       },
    //       attributes: [
    //         'id',
    //         'title',
    //         'post_content',
    //         'created_at',
    //         'updated_at'
    //         // [
    //         //   create sequelize literal to return raitings 
    //         // ]
    //       ]
    //     });
    //   });
    // }
  }
  Post.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        post_content : {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'user',
            key: 'id'
          }
        }
      },
      {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
      }

  );
  module.exports = Post;

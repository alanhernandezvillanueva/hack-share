// associations will be created here 
const User = require('./User');
const Post = require("./Post");
// const Raiting = require('./Raiting');
const Comment = require('./Comment')



User.hasMany(Post, {
    foreignKey:'user_id'
});
Post.belongsTo(User, {
    foreignKey: 'user_id',
  });
  // Post.hasOne(Category, {

  // });
  Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  Comment.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  
  User.hasMany(Comment, {
    foreignKey: 'user_id'
  });
  
  Post.hasMany(Comment, {
    foreignKey: 'post_id'
  });
  



module.exports = { User, Post,Comment };

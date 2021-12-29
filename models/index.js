// associations will be created here 
const User = require('./User');
const Post = require("./Post");
const Raiting = require('./Raiting');



User.hasMany(Post, {
    foreignKey:'user_id'
});
Post.belongsTo(User, {
    foreignKey: 'user_id',
  });



module.exports = { User, Post, Raiting };

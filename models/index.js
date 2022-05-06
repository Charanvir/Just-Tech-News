const User = require("./User");
const Post = require("./Post");

// create associations
// implies that a User can have multiple Post
// a one-to-many relationship
User.hasMany(Post, {
    foreignKey: 'user_id'
})

// implies that a Post can only have one User
// a many-to-one relationship
Post.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Post };
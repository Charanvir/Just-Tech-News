const User = require("./User");
const Post = require("./Post");
const Vote = require("./Vote");
const Comment = require("./Comment")

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

// belongsToMany method allows both the User and Post models to query each others information in the context of a vote

User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

// these associations allow for aggregated SQL functions between models
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

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
})

module.exports = { User, Post, Vote, Comment };
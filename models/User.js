const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

// create our User model
class User extends Model { }

// define table columns and configuration
User.init(
    {
        //Table column definitiond go here
        id: {
            // use the special sequelize DataType object provide what type of data it is
            type: DataTypes.INTEGER,
            // this is equivalent to SQL NOT NULL option
            allowNull: false,
            // instruct that this is the primary key
            primaryKey: true,
            autoIncrement: true
        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be an duplicate email values in this table
            unique: true,
            // if allowNull is set to false, we can run our data through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the password must be atleast four characters lond
                len: [4]
            }
        }
    },
    {
        // added in second object of User
        // nested level of the object inserted is very important
        hooks: {
            // set up beforeCreate lifecycle 'hook' functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        // table configuration options go here
        // pass in our sequelize connection (dirrect connection t database)
        sequelize,
        // dont automatically create createAt/updatedAt timestampe fields
        timestamps: false,
        // dont pluraluze name of database table
        freezeTableName: true,
        // use underscores instead of camelcasing
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;
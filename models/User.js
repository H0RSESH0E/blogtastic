const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    passwordCheck(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [8]
          }
        }
      },
      {
          hooks: {
              async beforeCreate(newUserData) {
                  // for hashing the new users password securely but relatively quickly
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
              },
              //for hashing an updated user password
              async beforeUpdate(updatedUserData) {
                  updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                  return updatedUserData;
              }
          },
          sequelize,
          timestamps: true,
          freezeTableName: true,
          underscored: true,
          modelName: 'user'
      }
);

module.exports = User;
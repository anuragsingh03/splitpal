'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AppUser.associate = (models) => {
  AppUser.hasMany(models.Group, { foreignKey: 'createdBy', as: 'createdGroups' });
  AppUser.belongsToMany(models.Group, {
    through: models.GroupMember,
    foreignKey: 'userId',
    otherKey: 'groupId',
    as: 'groups'
  });
};

  AppUser.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AppUser',
  });
  return AppUser;
};
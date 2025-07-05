'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Group.associate = (models) => {
  Group.belongsTo(models.AppUser, { foreignKey: 'createdBy', as: 'creator' });
  Group.belongsToMany(models.AppUser, {
    through: models.GroupMember,
    foreignKey: 'groupId',
    otherKey: 'userId',
    as: 'members'
  });
};

  Group.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    createdBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
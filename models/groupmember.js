'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GroupMember.associate = (models) => {
  GroupMember.belongsTo(models.Group, { foreignKey: 'groupId' });
  GroupMember.belongsTo(models.AppUser, { foreignKey: 'userId' });
};
  GroupMember.init({
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GroupMember',
  });
  return GroupMember;
};
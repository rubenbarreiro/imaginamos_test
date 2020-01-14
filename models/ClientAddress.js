module.exports = function (Sequelize, DataTypes) {
  return Sequelize.define('client_address', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clientId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'client',
        key: 'id'
      }
    }
  }, {
    freezeTableName: true,
    paranoid: true
  });
}
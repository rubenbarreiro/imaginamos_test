module.exports = function (Sequelize, DataTypes) {
  return Sequelize.define('order', {
    clientAddressId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'client_address',
        key: 'id'
      }
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    timePeriod: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    paranoid: true
  });
}
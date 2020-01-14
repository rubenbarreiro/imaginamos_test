module.exports = function (Sequelize, DataTypes) {
  return Sequelize.define('driver_order', {
    driverId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'driver',
        key: 'id'
      }
    },
    orderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'order',
        key: 'id'
      }
    }
  }, {
    freezeTableName: true,
    paranoid: true
  });
}
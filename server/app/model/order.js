'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE, DOUBLE } = app.Sequelize
  const Order = app.model.define('Order', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING(64),
      allowNull: false
    },
    count: {
      type: INTEGER(4),
      defaultValue: 0,
    },
    material_id: {
      type: INTEGER(8),
      references: {
        model: 'Material',
      }
    },
    total_price: {
      type: DOUBLE(10),
      allowNull: false,
    },
    createtime: {
      type: DATE,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'order'
  })

  Order.associate = function () {
    app.model.Order.belongsTo(app.model.Material)
  }

  return Order
}
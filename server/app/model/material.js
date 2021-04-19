'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE, DOUBLE } = app.Sequelize
  const Material = app.model.define('Material', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING(32),
      allowNull: false
    },
    count: {
      type: INTEGER(4),
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DOUBLE(8),
      allowNull: false,
    },
    createtime: {
      type: DATE,
      allowNull: false
    },
    supplier_id: {
      type: INTEGER(8),
      references: {
        model: 'Supplier',
      }
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'material'
  })

  Material.associate = function () {
    app.model.Material.belongsTo(app.model.Supplier)
  }

  return Material
}
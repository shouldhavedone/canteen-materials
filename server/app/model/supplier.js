'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize
  const Supplier = app.model.define('Supplier', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING(32),
      allowNull: false
    },
    user: {
      type: STRING(32),
      allowNull: false
    },
    address: {
      type: STRING(255),
      allowNull: false
    },
    tel: {
      type: STRING(11),
      allowNull: false
    },
    createtime: {
      type: DATE,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'supplier'
  })

  Supplier.associate = function () {
    app.model.Supplier.hasMany(app.model.Material, {
      foreignKey: 'supplier_id',
    })
  }

  return Supplier
}
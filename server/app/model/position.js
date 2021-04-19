'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize
  const Position = app.model.define('Position', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING(32),
      allowNull: false
    },
    sort: {
      type: INTEGER(2),
      allowNull: false,
    },
    state: {
      type: INTEGER(1),
      allowNull: false,
      defaultValue: 1,
    },
    createtime: {
      type: DATE,
      allowNull: false
    },
    department_id: {
      type: INTEGER(8),
      references: {
        model: 'Department',
      }
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'position'
  })

  Position.associate = function () {
    app.model.Position.belongsTo(app.model.Department)
  }

  return Position
}
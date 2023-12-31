"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./sequelize");
const sequelize_2 = require("sequelize");
const courseModel = sequelize_1.default.define('course', {
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_2.DataTypes.STRING
    },
    difficulty: {
        type: sequelize_2.DataTypes.INTEGER
    },
    category: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'category',
            key: 'id'
        },
        field: 'category',
    }
}, {
    freezeTableName: true
});
exports.default = courseModel;
//# sourceMappingURL=courseModel.js.map
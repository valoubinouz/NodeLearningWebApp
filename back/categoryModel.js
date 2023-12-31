"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./sequelize");
const sequelize_2 = require("sequelize");
const CategoryModel = sequelize_1.default.define('category', {
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});
exports.default = CategoryModel;
//# sourceMappingURL=categoryModel.js.map
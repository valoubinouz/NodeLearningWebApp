"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./sequelize");
const sequelize_2 = require("sequelize");
const questionModel = sequelize_1.default.define('question', {
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    question: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false
    },
    answer: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false
    },
    success: {
        type: sequelize_2.DataTypes.INTEGER,
        defaultValue: 0
    },
    course: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'course',
            key: 'id'
        },
        field: 'course',
    }
}, {
    freezeTableName: true
});
exports.default = questionModel;
//# sourceMappingURL=questionModel.js.map
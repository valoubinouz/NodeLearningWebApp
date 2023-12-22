"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./sequelize");
const sequelize_2 = require("sequelize");
const LearningFactModel = sequelize_1.default.define('LearningFact', {
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
    status: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false
    }
});
exports.default = LearningFactModel;
//# sourceMappingURL=learningFact.model.js.map
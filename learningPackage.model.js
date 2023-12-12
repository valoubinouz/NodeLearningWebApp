"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./sequelize");
const sequelize_2 = require("sequelize"); // Import your Sequelize configuration
const LearningPackageModel = sequelize_1.default.define('LearningPackage', {
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: sequelize_2.DataTypes.STRING
        // allowNull defaults to true
    }
});
exports.default = LearningPackageModel;
//# sourceMappingURL=learningPackage.model.js.map
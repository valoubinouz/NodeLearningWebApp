"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// sequelize.ts
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    database: 'LearningFactDb',
    username: 'learningDbUser',
    password: 'root',
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});
exports.default = sequelize;
//# sourceMappingURL=sequelize.js.map
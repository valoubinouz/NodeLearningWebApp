// sequelize.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    database: 'LearningFactDb',
    username: 'learningDbUser',
    password: 'root',
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});

export default sequelize;

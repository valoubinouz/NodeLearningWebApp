// sequelize.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    database: 'LearningFactDb',
    username: 'learningDbUser',
    password: 'root',
    host: 'localhost',
    dialect: 'postgres', // Specify the database dialect (not necessary)
    port: 5242
});

export default sequelize;
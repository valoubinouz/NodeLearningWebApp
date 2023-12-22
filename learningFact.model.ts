import sequelize from "./sequelize";
import {DataTypes} from "sequelize";

const LearningFactModel = sequelize.define('LearningFact',{
    id : {
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default LearningFactModel;
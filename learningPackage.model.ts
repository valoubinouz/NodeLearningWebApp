import { Table, Column, Model, DataType } from 'sequelize-typescript';
import sequelize from './sequelize';
import {DataTypes} from "sequelize"; // Import your Sequelize configuration

const LearningPackageModel = sequelize.define('LearningPackage',{
    id : {
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    targetAudience: {
        type: DataTypes.STRING
    },
    difficulty: {
        type: DataTypes.INTEGER
    }
});


export default LearningPackageModel;

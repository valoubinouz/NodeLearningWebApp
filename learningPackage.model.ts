import { Table, Column, Model, DataType } from 'sequelize-typescript';
import sequelize from './sequelize';
import {DataTypes} from "sequelize"; // Import your Sequelize configuration

const LearningPackageModel = sequelize.define('LearningPackage',{
    id : {
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }


})

export default LearningPackageModel;

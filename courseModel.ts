import sequelize from './sequelize';
import {DataTypes} from "sequelize";

const courseModel = sequelize.define('course',{
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
    difficulty: {
        type: DataTypes.INTEGER
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'category',
            key: 'id'
        },
        field: 'category',
    }
}, {
    freezeTableName: true
});

export default courseModel;

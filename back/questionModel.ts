import sequelize from './sequelize';
import {DataTypes} from "sequelize";

const questionModel = sequelize.define('question',{
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
    success: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    course: {
        type: DataTypes.INTEGER,
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

export default questionModel;

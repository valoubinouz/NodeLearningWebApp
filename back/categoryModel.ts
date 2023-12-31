import sequelize from './sequelize';
import {DataTypes} from "sequelize";

const CategoryModel = sequelize.define('category',{
    id : {
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default CategoryModel;
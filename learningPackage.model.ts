import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'LearningPackage', // Specify the name of your SQL table
})
class LearningPackageModel extends Model<LearningPackageModel> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.STRING,
    })
    description: string;

    @Column({
        type: DataType.STRING,
    })
    targetAudience: string;

    @Column({
        type: DataType.INTEGER,
    })
    difficulty: number;
}

export default LearningPackageModel;

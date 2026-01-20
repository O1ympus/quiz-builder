import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

interface QuizAttributes {
    id?: number;
    title: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface QuizCreationAttributes extends Optional<QuizAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
    class Quiz extends Model<QuizAttributes, QuizCreationAttributes> implements QuizAttributes {
        public id!: number;
        public title!: string;
        public readonly createdAt!: Date;
        public readonly updatedAt!:  Date;

        static associate(models: any) {
        }
    }

    Quiz.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Quiz',
        }
    );

    return Quiz;
};
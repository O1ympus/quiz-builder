import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

interface QuestionAttributes {
    id?:  number;
    quizId:  number;
    type: string;
    content: string;
    options?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
    class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
        public id!: number;
        public quizId!: number;
        public type!: string;
        public content!: string;
        public options?: string;
        public readonly createdAt!: Date;
        public readonly updatedAt!:  Date;

        static associate(models: any) {
            Question.belongsTo(models. Quiz, { foreignKey: 'quizId' });
        }
    }

    Question.init(
        {
            id:  {
                type: DataTypes. INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            quizId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Quizzes',
                    key: 'id',
                },
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            options: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Question',
        }
    );

    return Question;
};
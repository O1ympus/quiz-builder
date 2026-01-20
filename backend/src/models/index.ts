import { Sequelize } from 'sequelize';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../config/config.json'))[env];

let sequelize: Sequelize;

if (config. use_env_variable) {
  const connectionString = process.env[config. use_env_variable];
  if (!connectionString) {
    throw new Error(`Environment variable ${config.use_env_variable} is not defined`);
  }
  sequelize = new Sequelize(connectionString, config);
} else {
  sequelize = new Sequelize({
    dialect: config.dialect || 'sqlite',
    storage: config.storage || path.join(__dirname, '../../database.sqlite'),
    logging: false,
  });
}

import QuizInit from './quiz';
import QuestionInit from './question';

const Quiz = QuizInit(sequelize);
const Question = QuestionInit(sequelize);

Quiz.hasMany(Question, { foreignKey: 'quizId', onDelete: 'CASCADE' });
Question.belongsTo(Quiz, { foreignKey: 'quizId' });

export default {
  sequelize,
  Sequelize,
  Quiz,
  Question,
};

export { sequelize, Quiz, Question };
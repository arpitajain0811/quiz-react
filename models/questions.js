

module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define('questions', {
    questionid: { type: DataTypes.INTEGER, unique: true },
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    options: DataTypes.JSONB,
  }, {});
  questions.associate = function (models) {
    // associations can be defined here
  };
  return questions;
};

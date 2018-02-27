

module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define('questions', {
    questionid: { type: DataTypes.INTEGER, unique: true },
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    options: DataTypes.ARRAY(DataTypes.STRING),
  }, {});
  questions.associate = function (models) {
    // associations can be defined here
  };
  return questions;
};

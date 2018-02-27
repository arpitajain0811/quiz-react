

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('questions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    questionid: {
      type: Sequelize.INTEGER,
      unique: true,
    },
    question: {
      type: Sequelize.STRING,
    },
    answer: {
      type: Sequelize.STRING,
    },
    options: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    createdAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('questions'),
};

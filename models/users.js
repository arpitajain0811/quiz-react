

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: { type: DataTypes.STRING, unique: true },
    answers: { type: DataTypes.JSONB, defaultValue: {} },
    score: { type: DataTypes.INTEGER, defaultValue: 0 },
    totalscore: { type: DataTypes.INTEGER, defaultValue: 0 },
  }, {});
  users.associate = function (models) {
    // associations can be defined here
  };
  return users;
};



module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: { type: DataTypes.STRING, unique: true },
    score: DataTypes.INTEGER,
    totalscore: DataTypes.INTEGER,
    answers: DataTypes.JSONB,
  }, {});
  users.associate = function (models) {
    // associations can be defined here
  };
  return users;
};

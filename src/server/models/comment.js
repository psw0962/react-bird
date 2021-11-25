module.exports = (sequelize, DataTypes) => {
  const Commnet = sequelize.define(
    'Commnet',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4', // utf8mb4는 이모티콘 저장
      collate: 'utf8mb4_general_ci',
    }
  );

  Commnet.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };

  return Commnet;
};

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
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

  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.belongsTo(db.Post, { as: 'Retweet' }); // 리트윗

    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);

    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // as에 따라 좋아요를 누른 유저를 가져올 수 있다.
  };

  return Post;
};

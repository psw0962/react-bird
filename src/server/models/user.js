module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      // MySQL에는 User => users 테이블으로 생성
      // id가 기본적으로 들어있다.
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수정보인지(false면 필수)
        unique: true, // 고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
    }
  );

  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);

    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // mappig table (N : N 의 경우 중간테이블 의미)
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
  };

  return User;
};

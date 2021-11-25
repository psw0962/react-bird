const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      // 이메일 검사
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: { email },
          });

          if (!user) {
            return done(null, false, { resaon: '존재하지 않는 사용자입니다.' });
          }

          // 입력한 비밀번호와 db에 저장 된 비밀번호 체크
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          }

          // 비밀번호 틀린경우
          return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
        } catch (err) {
          console.log(err);
          return done(err);
        }
      }
    )
  );
};

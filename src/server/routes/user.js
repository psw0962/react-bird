const express = require('express');
const { User, Post } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

const router = express.Router();

// POST/user/login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }

    // passport login
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: {
          id: user.id,
        },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: 'Followings',
          },
          {
            model: User,
            as: 'Followers',
          },
        ],
      });

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// POST/user/logout
router.post('/user/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('success logout');
});

// POST/user/signup
router.post('/', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        // 조건(중복 이메일)
        email: req.body.email,
      },
    });

    if (exUser) {
      // 응답은 한 번만 해야하기 때문에 여기서 리턴!
      return res.status(403).send('이미 사용중인 아이디 입니다.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send('success create user');
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;

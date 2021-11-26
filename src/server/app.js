const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const passportConfig = require('./passport');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// connectDB
db.sequelize
  .sync()
  .then(() => {
    console.log('DB 연결 성공!');
  })
  .catch(console.error);

// passport
passportConfig();

// dotenv
dotenv.config();

// morgan(요청기록)
app.use(morgan('dev'));

// cors
app.use(
  cors({
    origin: true,
    credentials: true, // 다른 도메인 간에 쿠키 전달할 수 있게
  })
);

// client에서 온 axios요청 파싱처리를 해야 req.data 와 같은 형태로 라우터에서 사용할 수 있다.
app.use(express.json()); // json data를 req.body에 넣어준다.
app.use(express.urlencoded({ extended: true })); // form data를 req.body에 넣어준다.

// middle ware
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// rooturl
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행중');
});

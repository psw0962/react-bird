const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const passportConfig = require('./passport');
const passport = require('passport');
const dotenv = require('dotenv');
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

// cors
app.use(
  cors({
    origin: '*', // 모든 요청 허용
    credentials: false, // ??
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

app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/api', (req, res) => {
  res.send('hello api');
});

app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ]);
});

// rooturl
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행중');
});

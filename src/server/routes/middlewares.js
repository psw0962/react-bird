exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // next() 매개변수에 아무것도 없다면, 다음 미들웨어로 이동
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
  }
};

const exporess = require('express');
const router = exporess.Router();

const { Post, User, Image, Comment } = require('../models');

// GET/posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      //   where: { id: lastId },
      limit: 10, // axios 요청 시 가져올 게시글 수 설정
      order: [
        ['createdAt', 'DESC'], // 게시글 생성일로 내림차순 정렬
        [Comment, 'createdAt', 'DESC'], // 댓글 생성일로 내림차순 정렬
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: User, // 좋아요 누른사람
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

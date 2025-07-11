const postDao = require('../models/postDao');

const createPost = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;

    const newPost = await postDao.createPost({ title, content, user_id });

    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: '서버 담당자에게 문의해주세요.' });
  }
};

const findAllPost = async (req, res) => {
  try {
    const posts = await postDao.findAllPost();
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: '게시글 조회 실패. 서버 담당자에게 문의해주세요.' });
  }
};

const updatePost = async (req, res) => {
  try {
    console.log('✅ req.body:', req.body);
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: '유효한 게시글 ID가 아닙니다.' });
    }

    const { title, content } = req.body;

    await postDao.updatePost(id, { title, content });

    res.status(200).json({ message: '게시글이 수정되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '게시글 수정 실패' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await postDao.deletePost(id);

    res.status(200).json({ message: '게시글이 삭제되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '게시글 삭제 실패' });
  }
};

module.exports = { createPost, findAllPost, updatePost, deletePost };

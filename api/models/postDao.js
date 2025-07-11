const { pool } = require('./database');

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

const getKstDate = () => dayjs().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');

const createPost = async ({ title, content, user_id }) => {
  try {
    const kstDate = getKstDate();

    const query = `
        INSERT INTO posts (title, content, user_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?)
      `;

    const [result] = await pool.execute(query, [
      title,
      content,
      user_id,
      kstDate,
      kstDate,
    ]);

    return {
      id: result.insertId,
      title,
      content,
      user_id,
      created_at: kstDate,
      updated_at: kstDate,
    };
  } catch (err) {
    console.error('Database error:', err);
    throw err;
  }
};

const findAllPost = async () => {
  try {
    const query = `
      SELECT p.id, p.title, p.content, p.created_at, p.updated_at, p.user_id, u.nickname AS user_nickname
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
      `;

    const [rows] = await pool.execute(query);
    return rows;
  } catch (err) {
    console.error('Database error:', err);
    throw err;
  }
};

const updatePost = async (id, { title, content }) => {
  const kstDate = getKstDate();

  const query = `
    UPDATE posts
    SET title = ?, content = ?, updated_at = ?
    WHERE id = ?
    `;
  const [result] = await pool.execute(query, [title, content, , kstDate, id]);
  return result;
};

const deletePost = async (id) => {
  const query = `
    DELETE FROM posts WHERE id = ?
    `;
  const [result] = await pool.execute(query, [id]);
  return result;
};

module.exports = { createPost, findAllPost, updatePost, deletePost };

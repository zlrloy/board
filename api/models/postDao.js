const { pool } = require('./database');

const createPost = async ({ title, content, user_id }) => {
  try {
    const query = `
      INSERT INTO posts (title, content, user_id, created_at, updated_at)
      VALUES (?, ?, ?, NOW(), NOW())
    `;

    const [result] = await pool.execute(query, [title, content, user_id]);

    return {
      id: result.insertId,
      title,
      content,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
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
  const query = `
  UPDATE posts
  SET title = ?, content = ?, updated_at = NOW()
  WHERE id = ?
  `;
  const [result] = await pool.execute(query, [title, content, id]);
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

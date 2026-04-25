require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ── Parse JSON body ──────────────────────────────
app.use(express.json());

// ── Middleware 1: Logger ─────────────────────────
app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.path}`);
  next();
});

// ── Middleware 2: checkAge ───────────────────────
function checkAge(req, res, next) {
  const age = req.query.age || req.body?.age;

  if (!age || Number(age) < 18) {
    return res.status(400).json({ error: 'Bạn chưa đủ 18 tuổi' });
  }

  next();
}

// ── Static files ─────────────────────────────────
app.use(express.static('public'));

// ── Route GET /api/info ──────────────────────────
app.get('/api/info', checkAge, (req, res) => {
  const { name, age } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Vui lòng nhập tên' });
  }

  res.json({
    name,
    age: Number(age),
    message: `Chào mừng ${name}!`
  });
});

// ── Route POST /api/register ─────────────────────
let nextId = 1;

app.post('/api/register', (req, res) => {
  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
  }

  const user = {
    id: nextId++,
    name,
    age: Number(age),
    email
  };

  res.status(201).json(user);
});

// ── Start server ─────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

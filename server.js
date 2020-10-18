// server.js
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const express = require('express');
const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  server.get('/summoner/:name', (req, res) => {
    app.render(req, res, '/summoner', req.params);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${PORT}`);
  })
});

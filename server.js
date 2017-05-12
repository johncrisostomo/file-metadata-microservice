const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'tmp/', 
  limits: { fileSize: 10000000 } }).single('sample-file');

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/read-metadata', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.json({ error: 'The file you are trying to upload is too large!' });
      }
      res.json({ error: 'Something went wrong, you are not uploading something sketchy, are you?'});
    }

    res.json({ size: req.file.size });
  });
});

app.listen(process.env.PORT || 3000);
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'tmp/', 
  limits: { fileSize: 1000000 } }).single('sample-file');

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/read-metadata', upload, (req, res) => {
  res.json({ size: req.file.size });
});

app.use((err, req, res, next) => {
  if (err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.json({ error: 'You can only upload file sizes of 500B, sorry' });
      return;
    } 

    res.json({ error: 'Something went wrong, you are not uploading something sketchy, are you?'});
  } 
});

app.listen(process.env.PORT || 3000);
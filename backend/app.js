const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const sizeOf = require('image-size');
const multer  = require('multer');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({
  keepExtensions: true,
  limit: '5mb',
  extended: true
}));

const upload = multer({
  dest: './public/uploads/',
  limits: {
      fileSize: 1024 * 1024 *20
  },
  storage : multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
      let ext = path.extname(file.originalname);
      cb(null, (new Date()).getTime() + ext);
    }
  })
});

app.post('/upload', upload.any(), (req, res) => {
  const file = req.files[0];
  const memSize = (file.size / 1024) + ' bytes';

  sizeOf(file.destination + file.filename, (err, size) => {
    if(!err) {
      res.json({ memSize, width: size.width, height: size.height }) 
    }
    else {
      res.json({ error: "something went wrong" });
    }
  });
});


app.listen(PORT, () => {
  console.log('Listening on ', PORT);
});
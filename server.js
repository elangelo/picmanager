const express = require('express');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const readline = require('readline');
const sharp = require('sharp');

//const sqlite = require('sql.js');

//const filebuffer = fs.readFileSync('db/usda-nnd.sqlite3');

//const db = new sqlite.Database(filebuffer);

const app = express();

app.set('port', (process.env.PORT || 3100));

// // Express only serves static assets in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
// }

// app.get('/api/fs', (req, res) => {
//   const param = req.query.q;

//   if (!param) {
//     res.json({
//       error: 'Missing required parameter `q`',
//     });
//     return;
//   }
// });

var basedir = '/home/samuel/tmp/full'

var router = express.Router();

// router.get('/', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });   
// });

function readTags(filePath) {
  if (fs.existsSync(filePath)) {
    var tagsString = fs.readFileSync(filePath, 'utf8');
    return tagsString.split(';').filter((item) => (item != ''));
  }
}

router.get('/files', function (req, res) {
  //console.log("server.js: logging query: " + req.query.path);
  var query = req.query.path || '';
  var currentDir;
  if (query) {
    currentDir = path.join(basedir, query);
  } else {
    currentDir = path.join(basedir, '');
  }
  fs.stat(currentDir, function (err, stats) {
    if (err && err.errno === -2) {
      res.status(404).send("could not find that");
    }
    else {
      if (stats.isDirectory()) {
        fs.readdir(currentDir, function (err, files) {
          if (err) {
            throw err;
          }
          var data = [];
          files.filter(function (file) { return true; })
            .forEach(function (file) {
              var isDirectory = fs.statSync(path.join(currentDir, file)).isDirectory();
              if (isDirectory) {
                //read the tags
                var tagsFile = path.join(currentDir, path.join(file, 'tags'));
                if (fs.existsSync(tagsFile)) {
                  var tags = readTags(tagsFile);
                }
                //TODO. find out if it has children
                data.push({ Name: file, IsDirectory: true, Path: path.join(query, file), Tags: tags });
              } else {
                var ext = path.extname(file);
                if (ext == '.JPG') {
                  data.push({ Name: file, Ext: ext, IsDirectory: false, Path: path.join(query, file) });
                }
              }
            });
          data = _.sortBy(data, function (f) { return f.Name });
          console.log(data);
          res.json(data);
        })
      }
    }
  });
});

router.get('/thumb', function (req, res) {
  var query = req.query.path || '';
  var size = parseInt(req.query.size) || 200;
  var currentDir;
  if (query) {
    currentDir = path.join(basedir, query);
  } else {
    res.status(404).send("could not find that");
  }
  fs.stat(currentDir, function (err, stats) {
    if (err && err.errno === -2) {
      res.status(404).send("could not find that");
    }
    else {
      console.log(currentDir, "/ ", size);
      var img = sharp(currentDir);
      img.rotate().resize(size, size).toBuffer().then(function (data) {
        res.writeHead(200, { 'Content-Type': 'image/JPG' });
        res.end(data, 'binary');
      });
    }
  });
});

router.get('/image', function (req, res) {
  var query = req.query.path || '';
  var size = parseInt(req.query.size) || 200;
  var currentDir;
  if (query) {
    currentDir = path.join(basedir, query);
  } else {
    res.status(404).send("could not find that");
  }
  fs.stat(currentDir, function (err, stats) {
    if (err && err.errno === -2) {
      res.status(404).send("could not find that");
    }
    else {
      var img = sharp(currentDir);
      img.metadata()
      .then(function(metadata){
        return img
          .rotate()
          .resize(800)
          .toBuffer();
      })
      .then(function(data){
          res.writeHead(200, { 'Content-Type': 'image/JPG' });
          res.end(data, 'binary');
      });
    }
  });
});


app.use('/api', router);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

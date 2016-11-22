const express = require('express');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
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

var basedir = '/home/samuel/temp/800'

var router = express.Router();

// router.get('/', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });   
// });

router.get('/files', function (req, res) {
  console.log("server.js: logging query: " + req.query.path);
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
      fs.readdir(currentDir, function (err, files) {
        if (err) {
          throw err;
        }
        var data = [];
        files.filter(function (file) { return true; })
          .forEach(function (file) {
            var isDirectory = fs.statSync(path.join(currentDir, file)).isDirectory();
            if (isDirectory) {
              //TODO. find out if it has children
              data.push({ Name: file, IsDirectory: true, Path: path.join(query, file) });
            } else {
              var ext = path.extname(file);
              data.push({ Name: file, Ext: ext, IsDirectory: false, Path: path.join(query, file) });
            }
          });
        data = _.sortBy(data, function (f) { return f.Name });
        console.log(data);
        res.json(data);
      })
    }
  });
});

app.use('/api', router);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

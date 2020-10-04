const express = require('express');
const app = express();
const mysql = require('mysql');
app.use(express.urlencoded({extended: false})); //フォームから送信された値を受け取れるようにする定形文
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "", //いざとなったらパスワードは空でオッケー
  database: 'list_app'  
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});



app.get('/', (req, res) => {

      res.render('top.ejs');
});



app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM items',
    (error, results) => {
      console.log(results);
      res.render('index.ejs', {items: results})
    }
  );
});

app.get('/new', (req,res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO item(name)VALUES(?)',
    [req.body.itemName],
    (error,results) => {
      connection.query(
        'SELECT * FROM items',
        (error,results) => {
          res.render('index.ejs', {items: results});
        }
      );
    }
  );
  
});



app.use(express.static('public'));


app.listen(3000);
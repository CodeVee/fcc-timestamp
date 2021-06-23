// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", (req, res) => {
  let date = new Date();
  const dateStr = req.params.date;

  if (isNaN(dateStr) && isNaN(Date.parse(dateStr))) {
    res.json({ error: 'Invalid Date' });
    return;
  }

  if (isNaN(dateStr)) {
    date = new Date(dateStr);
  }

  if (!isNaN(dateStr)) {
    const milli = Number(dateStr);
    date = new Date(milli);
  }

  const unix = date.getTime();
  const utc = date.toUTCString();

  res.json({unix : unix, utc: utc});
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

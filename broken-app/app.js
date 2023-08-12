// app.js (Revised)

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser'); // Import body-parser module
const app = express();

app.use(bodyParser.json()); // Use body-parser middleware

app.post('/', async function(req, res, next) {
  try {
    const results = await Promise.all(req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    }));
    
    const out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(out));
  } catch (err) { // Catch and handle errors
    next(err);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

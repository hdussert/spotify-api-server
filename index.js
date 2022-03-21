const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const SpotifyWebAPI = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req,res) => {
  const code = req.body.code;
  const spotifyAPI = new SpotifyWebAPI({
    redirectUri: 'http://localhost:3000',
    clientId: '🤡',
    clientSecret: '🤡'
  });

  spotifyAPI
  .authorizationCodeGrant(code)
  .then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(400);
  })
})

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyAPI = new SpotifyWebAPI({
    redirectUri: 'http://localhost:3000',
    clientId: '🤡',
    clientSecret: '🤡',
    refreshToken
  });

  spotifyAPI
  .refreshAccessToken()
  .then(data => {
    console.log(data);
    res.json({
      accessToken: data.body.access_token,
      expiresIn: data.body.expires_in
    })
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(400);
  })
})

app.listen(3001);
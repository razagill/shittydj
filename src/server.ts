import app from './app';
// import PlayerCore from './player/PlayerCore';
import Player from './player/Player';
import Provider from './providers/Provider';
const PORT = 4000;
const player = Player.getInstance();

app.get('/', (req, res) => {
  res.render('home', { playlist: player.queue, currentSong: player.getCurrentSong() })
})

app.post('/queueSong', async (req, res) => {
  const provider = new Provider();
  const newSong = await provider.getSong(req.body.songURL, req.body.providerType);
  player.add(newSong);
  res.redirect('/');
})

app.get('/pause', async (req, res) => {
  await player.pause();
  res.sendStatus(200);
})

app.get('/play', async (req, res) => {
  await player.play();
  res.sendStatus(200);
})

app.get('/getCurrentSong', async (req, res) => {
  const currentSong = player.getCurrentSong();
  if (currentSong) {
    res.send(JSON.stringify(currentSong));
  } else {
    res.sendStatus(204);
  }
})

app.get('/eliteSkip', (req, res) => {
  player.skipTrack();
  res.sendStatus(200);
})

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
})

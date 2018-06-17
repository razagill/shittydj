import app from './app';
// import PlayerCore from './player/PlayerCore';
import Player from './player/Player';
import Provider from './providers/Provider';
const PORT = 4000;
const player = Player.getInstance();

app.get('/', (req, res) => {
  res.render('home', { playlist: player.queue})
})

app.get('/add', (req, res) => {
  res.render('addSong')
})

app.post('/queueSong', async (req, res) => {
  const provider = new Provider();
  const newSong = await provider.getSong(req.body.songURL, req.body.providerType);
  player.add(newSong);
  res.redirect('/');
})

app.get('/pause', (req, res) => {
  player.pause();
  res.sendStatus(200);
})

app.get('/play', async (req, res) => {
  await player.play();
  res.sendStatus(200);
})

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
})
import app from './app';
import PlayerCore from './player/PlayerCore';
import Provider from './providers/Provider';
const PORT = 4000;


app.get('/', (req, res) => {
  const player = PlayerCore.getInstance();
  const currentPlaylist = player.songQueue;
  res.render('home', { playlist: currentPlaylist })
})

app.get('/add', (req, res) => {
  res.render('addSong')
})

app.post('/queueSong', async (req, res) => {
  const provider = new Provider();
  const newSong = await provider.getSong(req.body.songURL, req.body.providerType);
  const player = PlayerCore.getInstance();
  player.addToQueue(newSong);
})

app.get('/pause', (req, res) => {
  const player = PlayerCore.getInstance();
  player.stop();
})

app.get('/play', async (req, res) => {
  const player = PlayerCore.getInstance();
  await player.play();
})

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
})
import app from './app';
import * as rootPath from 'app-root-path';
import Player from './player/Player';
import Provider from './providers/Provider';
import * as fs from 'fs';
const PORT = 4000;
const player = Player.getInstance();

app.get('/', (req, res) => {
  res.render('home', { playlist: player.queue, currentSong: player.getCurrentSong() })
})

app.post('/queueSong', async (req, res) => {
  const provider = new Provider();
  const newSong = await provider.getSong(req.body.songURL, req.body.providerType);
  if (player.add(newSong)) {
    res.redirect('/');
  } else {
    res.send(JSON.stringify('Song already in list'));
  }
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

app.get('/increaseVol', (req, res) => {
  player.increaseVolume();
  res.send(200);
})

app.get('/decreaseVol', (req, res) => {
  player.decreaseVolume();
  res.send(200);
})

app.post('/createPlaylist', async (req, res) => {
  if (!req.files || !req.files.playlist) return res.status(400).send('No file uploaded');
  if (!req.body.name || req.body.name === '') return res.status(400).send('No valid name for playlist');
  if (( req.files.playlist as any ).mimetype !== 'text/plain') return res.status(400).send('Please just upload txt files');

  const existingPlaylists = fs.readdirSync(`${rootPath}/src/playlists/`);
  const file = req.files.playlist as any;
  const name = req.body.name;
  if (existingPlaylists.includes(name)) return res.status(400).send(`Playlist name ${name} is already taken`);

  try {
    await file.mv(`${rootPath}/src/playlists/${name}`);
    res.redirect('/');
  } catch (er) {
    res.status(500).send(er)
  }
})

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
})

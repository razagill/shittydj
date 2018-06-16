import app from './app';
import SongModel from '@src/models/SongModel';
const PORT = 4000;

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/add', (req, res) => {
  res.render('addSong')
})

app.post('/queueSong', (req, res) => {
  const newSong = new SongModel();
  newSong.url = req.body.songURL;
  newSong.providerType = req.body.providerType;

})

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
})
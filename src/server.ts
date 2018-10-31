import app from './app';
import * as rootPath from 'app-root-path';
import Player from './player/Player';
import Provider from './providers/Provider';
import * as fs from 'fs';
import PlaylistsResponse from './models/dto/playlistsResponse';
import { readFileLineByLine } from './toolkit/util';
import PlaylistResponse from './models/dto/playlistResponse';
import _ from 'lodash';

const PORT = 4000;
const player = Player.getInstance();

app.get('/', (req, res) => {
  res.render('home', { playlist: player.queue, currentSong: player.getCurrentSong() })
})

app.post('/queueSong', async (req, res) => {
  const newSong = await Provider.getSongInfo(req.body.songURL, req.body.providerType);
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
    const filePath = `${rootPath}/src/playlists/${name}`;
    await file.mv(filePath);
    res.redirect('/');
  } catch (er) {
    res.status(500).send(er)
  }
})

app.get('/playlists', async (req, res) => {
  let playlists = fs.readdirSync(`${rootPath}/src/playlists`);
  playlists = playlists.filter((pl) => pl !== '.gitkeep');

  const response = new PlaylistsResponse();
  playlists.forEach((pl) => {
    const playlistEntry = new PlaylistResponse();
    const tracks = readFileLineByLine(`${rootPath}/src/playlists/${pl}`);
    playlistEntry.name = pl;
    playlistEntry.numberOfTracks = tracks.length;
    response.playlists.push(playlistEntry);
  });

  res.send(response);
});

app.patch('/upvote/:song-url', (req, res) => {
  const urlOfSongToUpvote = req.params['song-url'];

  if (urlOfSongToUpvote == null) {
    res.send(JSON.stringify('Song URL is null'));
  }

  const allSongs = player.queue;

  if (allSongs.length == 0) {
    res.send(JSON.stringify('Queue is empty'));
  }

  // TODO: what happens if there are more than one song that match the URL?
  // legit can happen if the same song appears twice on the playlist
  const foundSong = allSongs.find(song => song.url === urlOfSongToUpvote)

  if (foundSong == null) {
    res.send(JSON.stringify(`No songs were found for the url: ${urlOfSongToUpvote}`));
  }

  const ipOfRequest = req.connection.remoteAddress;

  const userAlreadyVoted = foundSong.voters.find(voter => voter.sourceIp === ipOfRequest);

  if (userAlreadyVoted != null) {

    // user can change downvote to upvote
    if (userAlreadyVoted.isUpVote == false) {
      userAlreadyVoted.isUpVote = true;
    } else {
      res.send(JSON.stringify('User already voted for song'));
    }
  } else {
    foundSong.voters.push( { sourceIp: ipOfRequest, isUpVote: true});
  }

  foundSong.votes++;

  player.queue = _.orderBy(player.queue, ['votes'], ['desc']);

  res.redirect('/');
});

app.patch('/downvote/:song-url/', (req, res) => {
  const urlOfSongToUpvote = req.params['song-url'];

  if (urlOfSongToUpvote == null) {
    res.send(JSON.stringify('Song URL is null'));
  }

  const allSongs = player.queue;

  if (allSongs.length == 0) {
    res.send(JSON.stringify('Queue is empty'));
  }

  const foundSong = allSongs.find(song => song.url === urlOfSongToUpvote)

  if (foundSong == null) {
    res.send(JSON.stringify(`No songs were found for the url: ${urlOfSongToUpvote}`));
  }

  const ipOfRequest = req.connection.remoteAddress;

  const userAlreadyVoted = foundSong.voters.find(voter => voter.sourceIp === ipOfRequest);

  if (userAlreadyVoted != null) {

    // user can change upvote to downvote
    if (userAlreadyVoted.isUpVote == true) {
      userAlreadyVoted.isUpVote = false;
    } else {
      res.send(JSON.stringify('User already voted for song'));
    }
  } else {
    foundSong.voters.push( { sourceIp: ipOfRequest, isUpVote: false});
  }

  foundSong.votes--;

  player.queue = _.orderBy(player.queue, ['votes'], ['desc']);

  res.redirect('/');
});

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
})

import app from './app';
const PORT = 4000;

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
})
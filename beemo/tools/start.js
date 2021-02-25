import concurrently from 'concurrently';
concurrently([
  { command: 'npm:watch:scss', name: 'scss:watch', prefixColor: '#eb596e' },
  { command: 'npm:watch:webpack', name: 'webpack:watch', prefixColor: '#98acf8' },
  { command: 'npm:server:start', name: 'server:nodemon', prefixColor: '#16c79a' }
], {
  killOthers: ['failure', 'success'],
}).then(() => {
  console.log('GoodBye Beemo World~!!');
})
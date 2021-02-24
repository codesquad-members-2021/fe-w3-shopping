const concurrently = require('concurrently');
concurrently([
  'npm:watch:*',
  'npm:server:start',
], {
  killOthers: ['failure', 'success'],
}).then(() => {
  console.log('GoodBye Beemo World~!!');
})
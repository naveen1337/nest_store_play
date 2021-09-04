var sqlite3 = require('sqlite3').verbose();
import query from '../dbModals';

let newDb = new sqlite3.Database(
  'nest_play.sqlite3',
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err: any) => {
    if (err) {
      console.log('Err', err);
    }
  },
);

newDb.on('open', async () => {
  console.log('Db Connection Opened');
  let dbQuery = new query('Admin', 'admin');
  let dbResponse = await dbQuery.insert({ name: 1 });
  console.log(dbResponse);
});

export default newDb;

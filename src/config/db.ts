var sqlite3 = require('sqlite3').verbose();

let newDb = new sqlite3.Database(
  'nest_play.sqlite3',
  sqlite3.OPEN_READWRITE,
  (err: any) => {
    if (err) {
      console.log('Err', err);
    }
  },
);



export default newDb;

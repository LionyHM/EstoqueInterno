export const databaseMysql = require('knex')({
    client: 'mysql2',
    connection: {
        host : process.env.HOSTMYSQL,
        user : process.env.USERMYSQL,
        password : process.env.PASSWORDMYSQL,
        database : process.env.DATABASEMYSQL,
        timezone: 'UTC',
        dateStrings: true,
    }
  }); 

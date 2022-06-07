
export const database = require('knex')({
    client: 'oracledb',
    connection: {
        host : process.env.HOST,
        user : process.env.USER,
        password : process.env.PASSWORD,
        database : process.env.DATABASE
      }
  }); 

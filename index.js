import {faker} from '@faker-js/faker';

import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'password'
});

try {
    const results = await connection.query('SHOW TABLES');
    console.log(results);
  } catch (error) {
    console.log(error);
  }
connection.end();

let getRandomUser = () =>{
    return {
      userId: faker.string.uuid(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }
console.log(getRandomUser());
  
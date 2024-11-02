import {faker} from '@faker-js/faker';

import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'password'
});

let getRandomUser = () =>{
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ]
};

let users = [];
for(let i = 0;i<100;i++){
  users[i] = getRandomUser();
}

let q = "INSERT INTO user (id, username, email, password) VALUES ?";

  try {
    const results = await connection.query(q,[users]);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
connection.end();


  
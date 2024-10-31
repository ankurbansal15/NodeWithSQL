# Node With MySQL

This project contains all the code examples and exercises I completed while learning how to integrate Node.js with MySQL.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This repository serves as a collection of code snippets and projects that demonstrate how to use Node.js with MySQL. It covers various aspects such as connecting to a MySQL database, performing CRUD operations, and handling database errors.

## Installation

To get started, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/yourusername/NodeWithMySQL.git
cd NodeWithMySQL
npm install
```

## Usage

Before running the examples, make sure you have a MySQL server running and update the database configuration in the `config.js` file.

To run a specific example, use the following command:

```bash
node examples/example-file.js
```

## Examples

### Connecting to MySQL

```javascript
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});
```

### Performing a Query

```javascript
connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    console.log(results);
});
```

### Closing the Connection

```javascript
connection.end((err) => {
    if (err) throw err;
    console.log('Connection closed.');
});
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or additions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
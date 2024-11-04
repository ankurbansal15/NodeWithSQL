const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs");
app.set("view engine", path.join(__dirname, "/views"));

app.listen(8080, () => {
  console.log("Listening on port 8080...");
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "password",
});

app.get("/", (req, res) => {
  let query = "SELECT count(*) FROM user";
  try {
    connection.query(query, (error, result) => {
      if (error) throw error;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (error) {
    console.log(error);
    res.send("Oops..! Something went wrong in DB");
  }
});

app.get("/user",(req,res)=>{
  let query = "SELECT * FROM user";
  try {
    connection.query(query, (error, users) => {      
      if (error) throw error;
      res.render("showusers.ejs",{users});
    });
  } catch (error) {
    console.log(error);
    res.send("Oops..! Something went wrong in DB");
  }
})

app.get("/user/:id/edit",(req,res)=>{
  let {id} = req.params;
  let query = `SELECT * FROM user WHERE id='${id}'`
  try {
    connection.query(query, (error, users) => {      
      if (error) throw error;
      console.log(users);
      let user = users[0];
      res.render("edit.ejs",{user});
    });
  } catch (error) {
    console.log(error);
    res.send("Oops..! Something went wrong in DB");
  }
})

app.patch("/user/edit/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPassword, username: newUsername } = req.body;
  let query = `SELECT * FROM user WHERE id="${id}"`;
  try {
    connection.query(query, (error, result) => {
      if (error) throw error;
      let user = result[0];
      if (formPassword != user.password) {
        res.send("WRONG Password!");
      } else {
        let query2 = `UPDATE user SET username="${newUsername}" WHERE id="${id}"`;
        connection.query(query2, (error, result) => {
          if (error) throw error;
          res.redirect("/user");
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.send("Oops..! Something went wrong in DB");
  }
});

app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/user/new", (req, res) => {
  let { username, email, password, confirmPassword } = req.body;
  let query = `INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)`;
  let user = [`${faker.string.uuid()}`, username, email, password];

  if (password !== confirmPassword) {
    res.send("Password doesn't match!");
  } else if (password.length < 8) {
    res.send("Password must have atleast 8 characters long!");
  } else {
    try {
      connection.query(query, user, (error, result) => {
        if (error) throw error;
        res.redirect("/user");
      });
    } catch (error) {
      console.log(error);
      res.send("Oops..! Something went wrong in DB");
    }
  }
});

app.get("/user/delete/:id", (req, res) => {
  let { id } = req.params;
  let query = `SELECT * FROM user WHERE id="${id}"`;
  try {
    connection.query(query, (error, result) => {
      if (error) throw error;
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (error) {
    console.log(error);
    res.send("Oops..! Something went wrong in DB");
  }
});

app.delete("/user/delete/:id", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let query = `SELECT * FROM user WHERE id="${id}"`;
  try {
    connection.query(query, (error, result) => {
      if (error) throw error;
      let user = result[0];
      if (password != user.password) {
        res.send("WRONG Password!");
      } else {
        let query2 = `DELETE FROM user WHERE id="${id}"`;
        connection.query(query2, (error, result) => {
          if (error) throw error;
          res.redirect("/user");
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.send("Oops..! Something went wrong in DB");
  }
});

import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "userdata"

})

// const db = mysql.createConnection({
//   host: "firstdb.cdsygs0ao1t2.eu-north-1.rds.amazonaws.com",
//   user: "admin",
//   password: "7aDZW8ekPKX5cmQldj9V",
//   database: "userdata"

// })

app.get('/', (req, res) => {
  const sql = "SELECT * FROM userdata";
  db.query(sql, (err, result) => {
    if(err) return res.json({Message: 'Error in server'});
    return res.json(result);
  })
})

app.post('/sign-up', (req, res) => {
  const sql = "INSERT INTO userdata (`name`, `email`, `password`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
  ]
  db.query(sql, [values], (err, data) => {
    if(err) {
      return res.json(err)
    }
    return res.json(data);
  })
})

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM userdata WHERE `email` = ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if(err) {
      return res.json(err)
    }
    if(data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Fail");
    }
  })
})

app.delete('/delete/:id', (req, res) => {
  const sql = "DELETE FROM userdata WHERE ID = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if(err) return res.json({Message: "Error in the server"});
    return res.json(data);
  })
})

app.put('/update-status/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = "UPDATE userdata SET status = ? WHERE ID = ?";
  db.query(sql, [status, id], (err, data) => {
    if (err) return res.json({ Message: "Error in the server" });
    return res.json(data);
  });
});

app.delete('/delete-multiple', (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ Message: 'Invalid request. Please provide an array of userdata IDs to delete.' });
  }

  const sql = "DELETE FROM userdata WHERE ID IN (?)";
  db.query(sql, [ids], (err, data) => {
    if (err) return res.status(500).json({ Message: 'Error in the server' });
    return res.json(data);
  });
});

app.put('/update-multiple-status', (req, res) => {
  const { ids, status } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0 || status === undefined) {
    return res.status(400).json({ Message: 'Invalid request. Please provide an array of user IDs and status to update.' });
  }

  const sql = "UPDATE userdata SET status = ? WHERE ID IN (?)";

  db.query(sql, [status, ids], (err, data) => {
    if (err) {
      return res.status(500).json({ Message: 'Error in the server' });
    }

    return res.json(data);
  });
});


app.listen(8081, () => {
  console.log("listening");
});

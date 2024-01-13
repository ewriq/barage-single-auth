const { db } = require("./Connect");

function temp(token) {
    
  db.serialize(function() {
    db.run(
      "CREATE TABLE IF NOT EXISTS token (id INTEGER PRIMARY KEY, value TEXT)"
    );

    db.get("SELECT * FROM token", function (err, row) {
      if (err) {
        console.error(err.message);
        return;
      }

      if (row) {
        db.run(
          "UPDATE token SET value = ? WHERE id = ?",
          [token, row.id],
          function (err) {
            if (err) {
              console.error(err.message);
            } else {
    
            }
          }
        );
      } else {
        db.run("INSERT INTO token (value) VALUES (?)", [token], function (err) {
          if (err) {
            console.error(err.message);
          } else {
          }
        });
      }
    });
  });
}


function getToken(callback) {
    db.get("SELECT value FROM token", function(err, row) {
      if (err) {
        console.error(err.message);
        callback(null);
      } else if (row) {
        const token = row.value;
        callback(token);
      } else {
        callback(null);
      }
    });
  }

module.exports = { temp, getToken };
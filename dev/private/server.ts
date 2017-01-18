module.exports = {
  start: function(database) {
    const path = require('path');
    const formidable = require('formidable');
    const express = require('express');
    const crypto = require('crypto');
    const app = express();

    /** home */
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, "../public/views", "home.view.html"));
    });

    // TODO: clean user input from possible JS code

    /** login routing */
    app.route('/login')
      .get((req, res) => {
        res.sendFile(path.join(__dirname, "../public/views", "login.view.html"));
      })
      .post((req, res) => {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
          const hash = crypto.createHash('sha256');
          hash.update(fields.pass);
          res.redirect('/');
        });
      });

    /**
     * signup routing
     * database variable used to emit createUser event
     */
    app.route('/signup')
      .get((req, res) => {
        res.sendFile(path.join(__dirname, "../public/views", "signup.view.html"));
      })
      .post((req, res) => {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
          const hash = crypto.createHash('sha256');
          hash.update(fields.pass);
          database.emit('createUser', fields.email, fields.username, hash.digest('hex'));

          res.redirect('/');
        });
      });

    app.listen(4444);
  }
};

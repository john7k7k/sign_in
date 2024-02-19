const connection = require('../my_modules/sql')();
require("dotenv").config();

connection.showStatus();
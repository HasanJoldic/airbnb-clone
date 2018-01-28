var Config = require("./build/shared/config/Config").default; // import from es6 default export

var baseConfig = { // TODO: add db seeders configuration here!
  "username": Config.database.username,
  "password": Config.database.password,
  "database": Config.database.database,
  "host": Config.database.host,
  "port": Config.database.port,
  "dialect": Config.database.dialect,
};

console.log("Config: ", baseConfig);

// we set a custom process specific variable to let other modules know that we are running via the sequelize-cli util (= e.g. don't initialize our own custom storage provider within the models)
// process.env["SEQUELIZE_CLI_PROCESS"] = true

// these settings are only used by the sequelize-cli tool (e.g. for migrations and scaffolding)
module.exports = {
  "development": baseConfig,
  "test": baseConfig,
  "production": baseConfig
};
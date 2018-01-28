if (!process.env.NODE_ENV) {
    console.error("Error: No NODE_ENV set! EXITING...");
    process.exit(1);
}

console.log("Using NODE_ENV: ", process.env.NODE_ENV);

interface DatabaseConfig { // http://docs.sequelizejs.com/en/latest/api/sequelize/
    dialect: string; // The dialect of the database you are connecting to. One of mysql, postgres, sqlite, mariadb and mssql.
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
    native: boolean; // A flag that defines if native library shall be used or not. Currently only has an effect for postgres
}

class Config {
    // Current set server environment
    static env: string = process.env.NODE_ENV;
    static isProductionEnvironment = process.env.NODE_ENV === "production";

    // Hapi base config
    static cors: boolean = true;
    static host: string = process.env.SERVER_HOST || "0.0.0.0";
    static port: string = process.env.SERVER_PORT || "8000";

    static base_url: string = process.env.SERVER_BASE_URL;

    // Sequelize config
    static database: DatabaseConfig = {
        dialect: "mysql",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        native: true
    };
}

export default Config;
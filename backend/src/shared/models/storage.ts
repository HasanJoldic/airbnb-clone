import * as path from "path";
import Config from "../../shared/config/Config";
const Sequelize = require("sequelize");
import * as Promise from "bluebird"; // cls patched bluebird promise
// Model imports:
import User from "./User";
import Provider from "./Provider";
import Client from "./Client";
import RegistrationToken from "./RegistrationToken";
import AccessToken from "./AccessToken";
// Model glue: (these will get initialized by sequelize)
const MODEL_FACTORY_FUNCTIONS = {
    User,
    Provider,
    Client,
    RegistrationToken,
    AccessToken
};
// Settings
class Storage {
    private _models: any = {};
    private _sequelize;
    constructor() {
        // Don't auto-initialize our custom storage provider if we are running in the sequelize-cli context!
        /* tslint:disable:no-string-literal */
        if (process.env["SEQUELIZE_CLI_PROCESS"]) {
            return;
        }
        /* tslint:enable:no-string-literal */
        this.initialize();
    }
    get models(): any {
        if (!this._sequelize) {
            throw new Error("cannot get models from a disconnected storage");
        }
        return this._models;
    }
    get sequelize(): any {
        if (!this._sequelize) {
            throw new Error("cannot get sequelize from a disconnected storage");
        }
        return this._sequelize;
    }
    reinitialize(newSequelize = true, newUmzug = true, newModels = true): void {
        if (newSequelize) {
            this.initSequelize();
        }
        if (newModels) {
            this.initModels();
        }
    }
    disconnect(): void {
        if (this._sequelize) {
            this._sequelize.close();
        }
        this._models = {};
        this._sequelize = null;
    }

    bulkDestroyThenImport(bulkData) {
        return this.bulkDestroy().then(() => this.bulkImport(bulkData));
    }

    bulkImport(bulkData): Promise<void> {
        if (process.env.NODE_ENV !== "test") {
            console.error("Error: NODE_ENV is not 'test'! EXITING...");
            process.exit(1);
        }
        const self: Storage = this;
        let promises = [];
        for(let key in bulkData) {
            promises.push(new Promise(function(resolve, reject) {
                resolve(self._models[key].bulkCreate(bulkData[key]));
            }));
        }
        return Promise.all(promises)
        .then(function() {
            return undefined;
        }).catch((e) => {
            console.error("info: bulkImport fatal error", e );
            throw e;
        });
    }

    bulkDestroy(): Promise<void> {
        if (process.env.NODE_ENV !== "test") {
            console.error("Error: NODE_ENV is not 'test'! EXITING...");
            process.exit(1);
        }
        const self: Storage = this;
        let promises = [];
        for(let key in self._models) {
            promises.push(new Promise(function(resolve, reject) {
                resolve(self._models[key].destroy({
                    where: {}
                }));
            }));
        }
        return Promise.all(promises)
        .then(function() {
            return undefined;
        }).catch((e) => {
            console.error("info: bulkDestroy fatal error", e );
            throw e;
        });
    }

    private initialize(): void {
        this.initSequelize();
        this.initModels();
    }
    private initSequelize(): void {
        // Sequelize instance
        this._sequelize = new Sequelize(
            Config.database.database, 
            Config.database.username, 
            Config.database.password, 
            Config.database
        );
    }
    private initModels(): void {
        this._models = {};
        // first populate _models with sequelize instance models...
        Object.keys(MODEL_FACTORY_FUNCTIONS).forEach((modelName) => {
            this._models[modelName] = MODEL_FACTORY_FUNCTIONS[modelName](this._sequelize, Sequelize);
        });

        // then make model associations...
        Object.keys(this._models).forEach((modelName) => {
            if ("associate" in this._models[modelName]) {
                this._models[modelName].associate(this._models);
            }
        });
    }
}
const storage: Storage = new Storage();
export default storage;
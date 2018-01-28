import * as Hapi from "hapi";

import routes from "./routes/routes";
import * as Good from "good";

import { isExpired } from "../shared/utils/utils";

import storage from "../shared/models/storage";

// Create a new Hapi server
const server: any = new Hapi.Server({
  connections: {
    routes: {
      cors: true
    }
  }
});

// Set server port
server.connection({
    host: "localhost", // host needs to be set in any case, else tests will not run through!
    port: 3000

});

const validate = function (decoded, request, callback) {
    if (decoded.type === "client") {
        return storage.models.Client.findOne({
            where: {
                accessToken: decoded.accessToken
            }
        }).then(client => {
            if (isExpired(client.accessTokenCreatedAt)) {
                return callback(null, false);
            }
            return callback(null, true);
        });
    } else if (decoded.type === "worker") {
        return storage.models.Worker.findOne({
            where: {
                accessToken: decoded.accessToken
            }
        }).then(worker => {
            if (isExpired(worker.accessTokenCreatedAt)) {
                return callback(null, false);
            }
            return callback(null, true);
        });
    } else {
        return callback(null, false);
    }
};

server.register(require("hapi-auth-jwt2"), () => {
    server.auth.strategy("jwt", "jwt", "optional", { 
        key: "NeverShareYourSecret",          // Never Share your secret key
        validateFunc: validate,            // validate function defined above
        verifyOptions: { algorithms: [ "HS256" ] } // pick a strong algorithm
    });
});

server.register([
    {
        register: require("inject-then"),
    },
    {
        register: Good,
        options: {
            reporters: {
                console: [{
                    module: "good-squeeze",
                    name: "Squeeze",
                    args: [{
                        response: "*",
                        log: "error"
                    }]
                }, {
                    module: "good-console"
                }, "stdout"]
            }
        }
    }
], (err) => {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start((err) => {
        if (err) {
            throw err;
        }
        server.log("info", "Server running at: " + server.info.uri);
    });
});

server.route(routes);

export default server;
const Sequelize = require("sequelize");
import * as Boom from "boom";
import * as Joi from "joi";
import * as jwt from "jsonwebtoken";

import Config from "../../shared/config/Config";
import storage from "../../shared/models/storage";

export function getWorkers(request, reply) {
    let promise = storage.models.Worker.find({
        where: {
            city: request.query.city,
            gender: request.query.gender ? request.query.gender : "woman",
            forMen: request.query.forMen ? request.query.forMen : true,
            forWomen: request.query.forWomen ? request.query.forWomen : false        }
    }).then(workers => {
        return workers.map(worker => {
            return worker.getSearchJson();
        });
    });

    reply(promise);
}
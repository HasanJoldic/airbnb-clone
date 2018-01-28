import * as Joi from "joi";

import * as types from "./types";

export const Price = Joi.object().required().keys({
    amount: Joi.number().required().integer().min(1),
    unit: Joi.string().required().valid("EUR", "USD")
});

export const HomepageGirlResponse = Joi.object().required().keys({
    publicName: Joi.string().required(),

}).label("HomepageGirlResponse");

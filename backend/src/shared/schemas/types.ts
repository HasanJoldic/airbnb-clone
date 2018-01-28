import * as Joi from "joi";

export const uidv4 = Joi.string().guid().required().label("uidv4")
					.description("uidv4 (type)")
					.example("0102cad9-f620-4fd0-bb05-0e1a91784213");
					
export const iso8601Datestring = Joi.date().iso().required()
					.label("iso8601Datestring").description("iso8601Datestring (type)")
					.example("2015-11-29T08:00:00.000Z");

export const email = Joi.string().allow(null).trim().lowercase()
					.max(255).email().label("email")
					.description("email (type): trimed and pattern matched for email, Max 255 long")
					.example("office@enkidoo.de"); // attention, this might be negative in the future, therefore no range constraints are applied.

export const password = Joi.string().trim().min(6).options({convert: false})
					.example("testpassword1"); // important, do not convert!
import * as Joi from "joi";
import * as types from "../types";

export interface IRegisterPayload {
    email: string;
    password: string;
    userType: "client"|"provider";
    dateOfBirth: string;
}

export const RegisterPayload = Joi.object().required().keys({
    email: types.email.required(),
    password: types.password.required(),
    userType: Joi.string().required().regex(/(client)|(provider)/),
    dateOfBirth: types.iso8601Datestring.required()
}).label("RegisterPayload");

export interface IRegisterResponse {
    email: string;
    password: string;
}

export const RegisterResponse = Joi.object().required().keys({
    email: types.email.required(),
    accessToken: Joi.string().required()
}).label("RegisterResponse");
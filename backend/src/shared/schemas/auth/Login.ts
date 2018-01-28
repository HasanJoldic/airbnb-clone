import * as Joi from "joi";
import * as types from "../types";

export interface ILoginPayload {
    email: string;
    password: string;
}

export const LoginPayload = Joi.object().required().keys({
    email: types.email.required(),
    password: types.password.required()
}).label("LoginPayload");

export interface ILoginResponse {
    email: string;
    password: string;
}

export const LoginResponse = Joi.object().required().keys({
    email: types.email.required(),
    accessToken: Joi.string().required()
}).label("LoginResponse");
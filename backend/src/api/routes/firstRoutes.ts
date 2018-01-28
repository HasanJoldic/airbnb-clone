import * as Joi from "joi";
/*
import * as ctrl from "../controllers/auth";

import Token from "../../shared/schemas/auth/Token";

import RegisterPostRequest from "../../shared/schemas/auth/RegisterPostRequest";
import AuthProfile from "../../shared/schemas/auth/AuthProfile";
import BearerHeader from "../../shared/schemas/auth/BearerHeader";
import TokenRequest from "../../shared/schemas/auth/TokenRequest";

import * as types from "../../shared/schemas/types";

import {
    forgotPasswordSchema,
    forgotPasswordResponseSchema,
    setForgottenPasswordSchema
} from "../../shared/schemas/ForgotPasswordSchema";

import * as statusCodes from "./statusCodes";
*/
import { HomepageGirlResponse } from "../../shared/schemas/Girl";
import { getIndexPage } from "../controllers/firstRoutesController";

const routes = [
  {
    method: "GET",
    path: "/",
    handler: getIndexPage,
    config: {

    }
  }
];

export default routes;
import * as Joi from "joi";
import * as ctrl from "../controllers/auth";
import { getIndexPage } from "../controllers/firstRoutesController";

import { LoginPayload, LoginResponse} from "../../shared/schemas/auth/Login";
import { RegisterPayload, RegisterResponse} from "../../shared/schemas/auth/Register";

const routes = [
    {
        method: "POST",
        path: "/api/v1/auth/register",
        handler: ctrl.register,
        config: {
            description: "Registers a real user (non guest user) with your application and returns a temporary access token for that user",
            auth: false,
            validate: {
                payload: RegisterPayload
            }
        }
    },
    {
        method: "GET",
        path: "/api/v1/auth/validateRegistration",
        handler: ctrl.validateRegistration,
        config: {
            description: "Registers a real user (non guest user) with your application and returns a temporary access token for that user",
            auth: false
        }
    },
    {
        method: "POST",
        path: "/api/v1/auth/login",
        handler: ctrl.login,
        config: {
            description: "Email-password login; returns a json web token",
            auth: false,
            validate: {
                payload: LoginPayload
            },
            response: {
                schema: LoginResponse
            }
        }
    },
    {
        method: "POST",
        path: "/api/v1/auth/forgotPassword",
        handler: ctrl.forgotPassword,
        config: {
            description: "Registers a real user (non guest user) with your application and returns a temporary access token for that user",
            auth: false
        }
    }
];

export default routes;
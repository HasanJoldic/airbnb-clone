import * as Joi from "joi";
import * as ctrl from "../controllers/search";

const routes = [
    {
        method: "POST",
        path: "/api/v1/search/getWorkers",
        handler: ctrl.getWorkers,
        config: {
            description: "Get a list of workers for a given city",
            auth: false
        }
    }
];

export default routes;
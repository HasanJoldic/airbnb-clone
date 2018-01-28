/*
import * as _ from "lodash";
import logger from "../../shared/util/logger";

import auth from "./auth";
import monitoring from "./monitoring";
import appContent from "./appContent";
import assetsStatic from "./assetsStatic";
import pushToken from "./pushToken";
import appUser from "./appUser";

import cmsUsers from "./cms/cmsUsers";
import cmsUserProfile from "./cms/cmsUserProfile";
import cmsAppUsers from "./cms/appUsers";
import cmsAppContent from "./cms/appContent";
import cmsSettings from "./cms/settings";
import cmsGuilds from "./cms/guilds";
import cmsGuildReports from "./cms/guildReports";
import cmsCompanies from "./cms/companies";
import cmsReportDefinitions from "./cms/reportDefinitions";

import reportDefinition from "./report/definition";
import reportContent from "./report/content";
import reportContentActions from "./report/actions";
import reportAttachments from "./report/attachments";
*/
import firstRoutes from "./firstRoutes";
import auth from "./auth";

const routes = [
    ...firstRoutes,
    ...auth
];
console.log(routes);
/*
const routes = [].concat(
    auth,
    monitoring,
    appContent,
    assetsStatic,
    pushToken,
    appUser,

    cmsUsers,
    cmsUserProfile,
    cmsAppContent,
    cmsSettings,
    cmsAppUsers,
    cmsGuilds,
    cmsGuildReports,
    cmsCompanies,
    cmsReportDefinitions,

    reportDefinition,
    reportContent,
    reportContentActions,
    reportAttachments
);

// add some sugar to the routes description string (e.g. about required permission scope, ...)
// * auto add the required permission scope definitions to the route description (useful for logging and hapi-swagger display)
let sugaredRoutes = [];
_.each(routes, (route) => {
    let sugaredRoute = route;
    const { auth, description }  = route.config;

    if (!description) {
        sugaredRoute.config.description = "No route description supplied";
    }

    if (auth !== false) {
        sugaredRoute.config.description += ` | @authenticated`; // signal that this endpoint is for authenticated users only
        if (auth && auth.scope) {
            sugaredRoute.config.description += ` [${auth.scope}]`; // add the definied permission scopes
        } else {
            sugaredRoute.config.description += ` [*]`; // signal that all permission scopes are allowed.
        }
    }

    sugaredRoutes.push(sugaredRoute);
});

// for logging information only...
const routesLogInformationObject = _.map(sugaredRoutes, (route) => {
    const { path } = route;
    return {
        path,
        description: route.config.description
    };
});

export function getInfo() {
    return routesLogInformationObject;
}

*/

//export default sugaredRoutes;

export default routes;
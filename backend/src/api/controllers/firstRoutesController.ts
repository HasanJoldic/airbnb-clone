import * as Joi from "joi";
import storage from "../../shared/models/storage";

/**
 * checks if the given login informations are right and returns a token response
 * For each strategy you first validate the given payload and next you check if the given payload is ok.
 */
export function getIndexPage(request, response) {
    let promise = storage.models.Client.findOne({
		where: {
			uid: "test-uid"
		}
	}).then(clientInstance => {
		return "JSON.stringify(clientInstance.getJsonObjectForClient())";
	});

	return response(promise);
}
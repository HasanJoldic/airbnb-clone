import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import Server from "../../../api/Api";
import storage from "../../../shared/models/storage";
import bulkData from "../../bulkData";
const Chai = require("chai");
const mocha = require("mocha");
const { describe, it } = mocha;
const assert = Chai.assert;

const loginRequestSuccess = {
  method: "POST",
  url: "/api/v1/auth/login",
  payload: {
  	email:"joldic.hasan@gmail.com",
  	password: "passw0rd"
  }
}

const loginRequestFailure = {
  method: "POST",
  url: "/api/v1/auth/login",
  payload: {
  	email:"joldic.hasan@gmail.com",
  	password: "passw0rd1"
  }
}

const registerRequestSuccess = {
  method: "POST",
  url: "/api/v1/auth/register",
  payload: {
  	email:"office@enkidoo.de",
  	password: "passw0rd1",
  	userType: "client",
  	dateOfBirth: new Date()
  }
}

describe("auth-routes", function () {
	before(function() {
		Server.start(function(err) {
			if (err) {
				throw err;
			}
			Server.log("info", "Server running at: " + Server.info.uri);
		})
	});
	beforeEach(function() {
		return storage.bulkDestroyThenImport(bulkData);
	});
  	after(function() {
    	storage.bulkDestroy();
  	});
  	it("login works with correct credentials, /api/v1/auth/login", function () {
    	return Server.injectThen(loginRequestSuccess)
      	.then(function(res) {
      		const decoded = jwt.verify(res.result.accessToken, "NeverShareYourSecret");
      		return storage.models.AccessToken.findOne({
      			where: {
      				token: decoded.accessToken
      			}
      		}).then(function(accessToken) {
      			assert.equal(decoded.accessToken, accessToken.token);
      		});
	    });
    });
    it("login fails with incorrect credentials, /api/v1/auth/login", function () {
    	return Server.injectThen(loginRequestFailure)
      	.then(function(res) {
      		assert.equal(res.result.accessToken, undefined);
	    });
    });
    it("creates a registration token when registering", function () {
    	return Server.injectThen(registerRequestSuccess)
      	.then(function(res) {
      		console.log(res.result);
      		return storage.models.RegistrationToken.findOne({
      			where: {
      				email: registerRequestSuccess.payload.email
      			}
      		}).then(function(registrationToken) {
      			return bcrypt.compare(registerRequestSuccess.payload.password, registrationToken.password).then(res => {
      				assert.equal(res, true);
      			});
      		});
	    });
    });
});
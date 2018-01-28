const Sequelize = require("sequelize");
import * as Boom from "boom";
import * as Joi from "joi";
import * as bcrypt from "bcrypt";
const uuidv4 = require("uuid/v4");
import * as jwt from "jsonwebtoken";

import Config from "../../shared/config/Config";

import storage from "../../shared/models/storage";
import { isExpired } from "../../shared/utils/utils";
import transporter, { message } from "../../shared/plugins/sendEmails";


const saltRounds = 10;

/**
 * creates a new user account (don't use this for creating admin users, this is only for application users who register)
 */
export function register(request, reply) {
    console.log("one");
    let promise = storage.models.User.findOne({
        where: {
            email: request.payload.email
        }
    }).then(user => {
        console.log("two", user);
    	if (user) {
    		throw new Error("User already exists");
    	}
    	return storage.models.RegistrationToken.findOne({
    		where: {
            	email: request.payload.email
            }
    	});
    }).then(registrationToken => {
        console.log("three");
    	if (registrationToken) {
    		return registrationToken.destroy();
    	}
    }).then(() => {
        console.log("four");
    	return bcrypt.hash(request.payload.password, saltRounds, (err, hash) => {
            console.log("five");
            return storage.models.RegistrationToken.create({
                userType: request.payload.userType,
                dateOfBirth: request.payload.dateOfBirth,
                email: request.payload.email,
                password: hash
            }).then(registrationToken => {
                console.log("six");
                if (!registrationToken) {
                }
                message.to = request.payload.email;
                message.html = `<a href="http://localhost:3000/api/v1/auth/validateRegistration?uid=` +
                                `${registrationToken.uid}>Click link to verify</a>`;
                transporter.sendMail(message, function (err, info) {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log(info);
                    }
                });
                return true;
            });
        });
    }).catch(error => {
        if (error.message === "User already exists") {
            return true;
        } else {
            throw error;
        }
    });

    reply(promise);
}

export function validateRegistration(request, reply) {
    let _registrationTokenInstance = null;
    let _user = null;
    let promise = storage.models.RegistrationToken.findOne({
        where: {
            uid: request.query.uid
        }
    }).then(registrationTokenInstance => {
        _registrationTokenInstance = registrationTokenInstance;
        if(!registrationTokenInstance) {
        }
        //if(isExpired(registrationTokenInstance.createdAt)) {
        //}
        if(request.query.registrationToken === _registrationTokenInstance.token) {
            return storage.models.User.create({
                password: registrationTokenInstance.password,
                dateOfBirth: registrationTokenInstance.dateOfBirth,
                email: registrationTokenInstance.email
            });
            
        }
    }).then(user => {
        if(user) {
            _user = user;
        }
        if (_registrationTokenInstance.userType === "client") {
            return storage.models.Client.create({
                userId: user.id
            });
        } else if (_registrationTokenInstance.userType === "provider") {
            return storage.models.Provider.create({
                userId: user.id
            });
        }
    }).then(() => {
        return _registrationTokenInstance.destroy();    
        
    }).then(() => {
        return _user;
    });

    reply(promise);
}

export function login(request, reply) {
    let promise = storage.models.User.findOne({
        where: {
            email: request.payload.email
        }
    }).then(user => {
        if (!user) {
            throw new Error("no users found");
        } else {
            return bcrypt.compare(request.payload.password, user.password).then(res => {
                if (res) {
                    return storage.models.AccessToken.destroy({
                        where: {
                            userId: user.id
                        }
                    }).then(accessToken => {
                        return storage.models.AccessToken.findOne({
                            where: {
                                userId: user.id
                            }
                        });
                    }).then(accessToken => {
                        if(accessToken) {
                            throw new Error("generic error");
                        }
                        const currentDate = new Date();
                        return storage.models.AccessToken.create({
                            userId: user.id,
                            token: uuidv4(),
                            validUntil: new Date(currentDate.getTime() + 24*60*60*1000)
                        });
                    }).then(accessToken => {
                        if (!accessToken) {
                            throw new Error("Error generating a token");
                        }
                        let _accessToken = jwt.sign({
                            email: user.email,
                            accessToken: accessToken.token,
                        }, "NeverShareYourSecret");
                        return {
                            email: user.email,
                            accessToken: _accessToken
                        };
                    })
                } else {
                    throw new Error("404");
                }
            });
        }
    });

    reply(promise);
}

export function forgotPassword(request, reply) {
    let promise = storage.models.Client.findOne({
        where: {
            email: request.payload.email
        }
    }).then(client => {
        bcrypt.compare(request.payload.password, client.password, function(err, res) {
            if(err) {
                throw err;
            } else if (res) {
                return client.update({
                    accessToken: uuidv4(),
                    accessTokenCreatedAt: new Date()
                }).then(client => {
                    if (!client.accessToken || !client.accessTokenCreatedAt) {
                        throw new Error("Error generating a token");
                    }
                    return jwt.sign({
                        email: client.email,
                        type: "client",
                        accessToken: client.accessToken,
                        accessTokenCreatedAt: client.accessTokenCreatedAt
                    });
                })
            } else {
                return false;
            }
        });
    });

    reply(promise);
}
import moment from "moment";
import axios from"axios";

export const validatePhoneNumber = (phoneNumber) => {
	const isDigits = phoneNumber.match(/\d{6,30}/);
	const isNonDigits = phoneNumber.match(/\D/);

	return (isDigits && !isNonDigits);
}

export const validatePassword = (password) => {
	const isAtLeast8Long = password.match(/.{8,100}/);

	return isAtLeast8Long !== null;
}

export const validateEmail = (email) => {
	return email.match( 	
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

export const validateDateOfBirth = (dateOfBirth) => {
	return moment(dateOfBirth).add(18, "year").isBefore(moment());
}

export const callApi: any = (method, apiUrl, responseType, payload, token) => {
	return axios({
		method: method,
		url: "localhost:3000" + apiUrl,
		responseType: responseType || "json",
		data: payload,
		headers: {authorization: token}
	});
};
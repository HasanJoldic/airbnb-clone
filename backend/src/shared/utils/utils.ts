import * as moment from "moment";

export const getAge = (date) => {
	return moment(date).diff(moment(), "years");
};

export const isExpired = (date) => {
	return moment(date).add(1, "day").isBefore(moment());
};
import React, { Component } from 'react';

import PropTypes from "prop-types";
import { IntlProvider, addLocaleData } from "react-intl";
import de from "react-intl/locale-data/de";

addLocaleData(de);

const Internalization: any = (props) => {
	const { lang } = props;

	const locale = lang.locale;
    const messages = lang.messages;

    return (
    	<IntlProvider key={locale} locale={locale} messages={messages}>
    		{props.children}
    	</IntlProvider>
    );
};

Internalization.propTypes = {
	children: PropTypes.object.isRequired,
    //dispatch: React.PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired
}

Internalization.defaultProps = {
	lang: {
		locale: "de",
		messages: {
			"this": "dieses",
			"word": "wort",
			"will": "will",
			"translate": "translate"
		}
	}
};

export default Internalization;
import React from 'react';
import Menu from './Menu';
import withAuthChecker from '../../helper/withAuthChecker';

const Layout = (props) => {

	return (
		<div id="main_content">
			<Menu {...props} />
		</div>
	);

}

export default withAuthChecker(Layout);
import classNames from 'classnames';
import {
	memo
} from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import './button.css';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default memo(function Button ({
	className,
	children,
	...props
})
{
	return (
		<button className={
			classNames('button', className)
		} data-selectable { ...props }>
			{ children }
		</button>
	);
});

import classNames from 'classnames';
import {
	memo
} from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import './sprite.css';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default memo(function Sprite ({
	name,
	className,
	children
})
{
	return (
		<span className={
			classNames('sprite', `sprite--${name}`, className)
		}>
			{ children }
		</span>
	);
});

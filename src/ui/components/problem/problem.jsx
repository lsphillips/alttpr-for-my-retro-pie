import classNames from 'classnames';
import {
	memo
} from 'react';
import Sprite from '../sprite/sprite.jsx';
import Button from '../button/button.jsx';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import './problem.css';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default memo(function Problem ({
	error,
	className
})
{
	// Computed.
	const message = error instanceof Error ? error.message : error;

	// Handlers.
	async function close ()
	{
		await window.alttpr.close({
			error : true
		});
	}

	// Render.
	return (
		<div className={
			classNames('problem', className)
		}>
			<Sprite className="problem__icon" name="error" />
			<p className="problem__message">
				{ message }
			</p>
			<Button className="problem__close" onClick={ close } autoFocus>
				Exit
			</Button>
		</div>
	);
});

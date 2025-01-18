import classNames from 'classnames';
import {
	memo,
	useEffect,
	useState
} from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import './spinner.css';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default memo(function Spinner ({
	className,
	children
})
{
	// State.
	const [isVisible, setIsVisible] = useState(false);

	// Hooks.
	useEffect(() =>
	{
		const timer = setTimeout(() =>
		{
			setIsVisible(true);

		}, 50);

		return () => clearTimeout(timer);

	}, []);

	// Render
	return (
		<div className={
			classNames('spinner', {
				'spinner--visible' : isVisible
			}, className)
		}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 86.61" className="spinner__triforce">
				<path d="M50 0 25 43.305h50z" className="spinner__triforce-power-piece" />
				<path d="M50 86.61 25 43.305 0 86.61Z" className="spinner__triforce-wisdom-piece" />
				<path d="M75 43.305 50 86.61h50z" className="spinner__triforce-courage-piece" />
			</svg>
			<p className="spinner__text">
				{ children }
			</p>
		</div>
	);
});

import classNames from 'classnames';
import {
	memo,
	useState,
	useEffect
} from 'react';
import encodeQR from '@paulmillr/qr';
import Sprite from '../sprite/sprite.jsx';
import Button from '../button/button.jsx';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import './result.css';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default memo(function Result ({
	hash,
	build,
	hints,
	permalink,
	onPlay,
	className
})
{
	// State.
	const [qrCode, setQrCode] = useState(null);

	// Effects.
	useEffect(() =>
	{
		setQrCode(encodeQR(permalink, 'svg', {
			ecc      : 'low',
			encoding : 'byte',
			version  : 3,
			mask     : 0,
			border   : 0,
			scale    : 8
		}));

	}, [permalink]);

	// Handlers.
	function play ()
	{
		onPlay();
	}

	// Render.
	return (
		<div className={
			classNames('result', className)
		}>
			<h2 className="result__title">
				<Sprite className="result__title-icon" name="success" />
				Game Randomized Successfully!
			</h2>
			<dl className="result__metadata">
				<div className="result__metadatum">
					<dt className="result__metadatum-name">
						Seed Hash
					</dt>
					<dd className="result__metadatum-value"> { hash } </dd>
				</div>
				<div className="result__metadatum">
					<dt className="result__metadatum-name">
						Hints
					</dt>
					<dd className="result__metadatum-value">
						{ hints ? 'On' : 'Off' }
					</dd>
				</div>
				<div className="result__metadatum">
					<dt className="result__metadatum-name">
						ROM Build
					</dt>
					<dd className="result__metadatum-value"> { build } </dd>
				</div>
			</dl>
			<div className="result__qr-code" dangerouslySetInnerHTML={{
				__html : qrCode
			}} />
			<p className="result__bookmark">
				Bookmark the spoiler for later at <a href={ permalink } className="result__permalink">{ permalink }</a>
			</p>
			<Button className="result__play" onClick={ play } autoFocus>
				Start Playing
			</Button>
		</div>
	);
});

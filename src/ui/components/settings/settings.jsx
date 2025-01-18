import classNames from 'classnames';
import {
	memo
} from 'react';
import {
	HeartColor,
	MenuSpeed,
	HeartSpeed
} from '../../../alttpr/settings.js';
import Sprite from '../sprite/sprite.jsx';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import './settings.css';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const Values = {

	// Text.
	[MenuSpeed.Fast]    : 'Fast',
	[MenuSpeed.Instant] : 'Instant',
	[MenuSpeed.Normal]  : 'Normal',
	[MenuSpeed.Slow]    : 'Slow',
	[HeartSpeed.Off]    : 'Off',
	[HeartSpeed.Quater] : 'Quater',
	[HeartSpeed.Half]   : 'Half',
	[HeartSpeed.Normal] : 'Normal',
	[HeartSpeed.Double] : 'Double',

	// Sprites.
	[HeartColor.Red]    : 'red',
	[HeartColor.Blue]   : 'blue',
	[HeartColor.Green]  : 'green',
	[HeartColor.Yellow] : 'yellow'
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default memo(function Settings ({
	heartColor,
	menuSpeed,
	heartSpeed,
	backgroundMusic,
	msu1Resume,
	itemQuickSwap,
	reduceFlashing,
	className
})
{
	return (
		<div className={
			classNames('settings', className)
		}>
			<Sprite className="settings__player" name="player">
				<Sprite className="settings__heart-color" name={
					`heart-color-${ Values[heartColor] }`
				} />
			</Sprite>
			<dl className="settings__gameplay">
				<div className="settings__gameplay-setting">
					<dt className="settings__gameplay-setting-name">
						Heart Beep Speed
					</dt>
					<dd className="settings__gameplay-setting-value">
						{ Values[heartSpeed] }
					</dd>
				</div>
				<div className="settings__gameplay-setting">
					<dt className="settings__gameplay-setting-name">
						Background Music
					</dt>
					<dd className="settings__gameplay-setting-value">
						{ backgroundMusic ? 'On' : 'Off' }
					</dd>
				</div>
				<div className="settings__gameplay-setting">
					<dt className="settings__gameplay-setting-name">
						MSU-1 Resume
					</dt>
					<dd className="settings__gameplay-setting-value">
						{ msu1Resume ? 'On' : 'Off' }
					</dd>
				</div>
				<div className="settings__gameplay-setting">
					<dt className="settings__gameplay-setting-name">
						Menu Speed
					</dt>
					<dd className="settings__gameplay-setting-value">
						{ Values[menuSpeed] }
					</dd>
				</div>
				<div className="settings__gameplay-setting">
					<dt className="settings__gameplay-setting-name">
						Item Quick Swap
					</dt>
					<dd className="settings__gameplay-setting-value">
						{ itemQuickSwap ? 'On' : 'Off' }
					</dd>
				</div>
				<div className="settings__gameplay-setting">
					<dt className="settings__gameplay-setting-name">
						Flash Reduction
					</dt>
					<dd className="settings__gameplay-setting-value">
						{ reduceFlashing ? 'On' : 'Off' }
					</dd>
				</div>
			</dl>
		</div>
	);
});

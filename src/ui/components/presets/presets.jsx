import classNames from 'classnames';
import {
	memo,
	useRef,
	useEffect
} from 'react';
import Preset from './preset.jsx';
import Sprite from '../sprite/sprite.jsx';
import Button from '../button/button.jsx';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import './presets.css';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default memo(function Presets ({
	presets,
	onSelect,
	className
})
{
	// State.
	const first = useRef(null);

	// Effects.
	useEffect(() =>
	{
		first.current?.focus();

	}, [first]);

	// Render.
	return (
		<div className={
			classNames('presets', className)
		}>
			{
				(presets.length > 0) ?
					<>
						<h2 className="presets__title">
							<Sprite className="presets__title-icon" name="choose" />
							Select a randomization preset
						</h2>
						<ul className="presets__items">
							{
								presets.map((preset, i) => (
									<li className="presets__item" key={ preset.name }>
										<Preset { ...preset } ref={ i === 0 ? first : null } onSelect={
											() => onSelect(preset)
										} />
									</li>
								))
							}
						</ul>
					</>
					:
					<p className="presets__no-items-message">
						<Sprite className="presets__no-items-message-icon" name="none" />
						No randomization presets configured...
					</p>
			}
		</div>
	);
});

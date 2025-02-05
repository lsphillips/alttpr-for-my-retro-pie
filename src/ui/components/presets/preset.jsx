import {
	memo
} from 'react';
import {
	Goal,
	World,
	ItemPlacement,
	ItemAccessibility,
	SwordMode,
	DungeonItemShuffle,
	ItemPooling,
	ItemFunctionality,
	EnemyHealth,
	EnemyDamage
} from '../../../alttpr/settings.js';
import Sprite from '../sprite/sprite.jsx';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import './preset.css';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const Settings = {

	// Text.
	[World.Standard]                            : 'Standard',
	[World.Open]                                : 'Open',
	[World.Inverted]                            : 'Inverted',
	[World.Retro]                               : 'Retro',
	[ItemPlacement.Basic]                       : 'Basic',
	[ItemPlacement.Advanced]                    : 'Advanced',
	[ItemAccessibility.Inventory]               : '100% Inventory',
	[ItemAccessibility.Locations]               : '100% Items',
	[ItemAccessibility.None]                    : 'Required Only',
	[SwordMode.Standard]                        : 'Standard',
	[SwordMode.None]                            : 'Swordless',
	[SwordMode.Random]                          : 'Randomized',
	[SwordMode.Assured]                         : 'Assured',

	// Sprites.
	[Goal.DefeatGanon]                          : 'defeat-ganon',
	[Goal.FastGanon]                            : 'fast-ganon',
	[Goal.Dungeons]                             : 'all-dungeons',
	[Goal.Pedestal]                             : 'master-sword-pedestal',
	[Goal.TriforceHunt]                         : 'triforce-hunt',
	[Goal.GanonHunt]                            : 'ganon-triforce-hunt',
	[Goal.Completionist]                        : 'completion',
	[DungeonItemShuffle.Standard]               : 'standard',
	[DungeonItemShuffle.MapsCompasses]          : 'maps-compasses',
	[DungeonItemShuffle.MapsCompassesSmallKeys] : 'maps-compasses-small-keys',
	[DungeonItemShuffle.Keysanity]              : 'keysanity',
	[ItemPooling.Standard]                      : 'standard-pool',
	[ItemPooling.Hard]                          : 'hard-pool',
	[ItemPooling.Expert]                        : 'expert-pool',
	[ItemFunctionality.Normal]                  : 'normal-functionality',
	[ItemFunctionality.Hard]                    : 'hard-functionality',
	[ItemFunctionality.Expert]                  : 'expert-functionality',
	[EnemyHealth.Standard]                      : 'standard-health',
	[EnemyHealth.Easy]                          : 'easy-health',
	[EnemyHealth.Hard]                          : 'hard-health',
	[EnemyHealth.Expert]                        : 'expert-health',
	[EnemyDamage.Standard]                      : 'standard-damage',
	[EnemyDamage.Random]                        : 'random-damage',
	[EnemyDamage.Shuffled]                      : 'shuffled-damage'
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function getItemDifficulty (itemPool, itemFunctionality, swords)
{
	return 'item-difficulty-' + Settings[itemPool] + '-' + Settings[itemFunctionality] + (swords === SwordMode.None ? '-swordless' : '');
}

function getEnemyDifficulty (enemyHealth, enemyDamage)
{
	return 'enemy-difficulty-' + Settings[enemyHealth] + '-' + Settings[enemyDamage];
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default memo(function Preset ({
	name,
	goal,
	world,
	crystalsForGanon,
	crystalsForTower,
	itemAccessibility,
	itemPlacement,
	itemFunctionality,
	itemPool,
	swords,
	dungeonItemShuffling,
	enemyDamage,
	enemyHealth,
	hints,
	onSelect
})
{
	// Handlers.
	function select (e)
	{
		e.preventDefault();

		onSelect();
	}

	// Render.
	return (
		<a href="" className="preset" onClick={ select } data-selectable>
			<article className="preset__info">
				<Sprite className="preset__goal" name={
					`goal-${ Settings[goal] }`
				} />
				<div className="preset__name-and-gameplay">
					<h2 className="preset__name">
						{ name }
					</h2>
					<dl className="preset__gameplay-settings">
						<div className="preset__gameplay-setting">
							<dt className="preset__gameplay-setting-name">
								World
							</dt>
							<dd className="preset__gameplay-setting-value"> { Settings[world] } </dd>
						</div>
						<div className="preset__gameplay-setting">
							<dt className="preset__gameplay-setting-name">
								Accessibility
							</dt>
							<dd className="preset__gameplay-setting-value"> { Settings[itemAccessibility] } </dd>
						</div>
						<div className="preset__gameplay-setting">
							<dt className="preset__gameplay-setting-name">
								Placement
							</dt>
							<dd className="preset__gameplay-setting-value"> { Settings[itemPlacement] } </dd>
						</div>
						<div className="preset__gameplay-setting">
							<dt className="preset__gameplay-setting-name">
								Swords
							</dt>
							<dd className="preset__gameplay-setting-value"> { Settings[swords] } </dd>
						</div>
					</dl>
				</div>
				<Sprite className="preset__ganon-requirement" name={
					`ganon-requirement-${crystalsForGanon}`
				} />
				<Sprite className="preset__ganon-tower-requirement" name={
					`ganon-tower-requirement-${crystalsForTower}`
				} />
				<Sprite className="preset__dungeon-item-shuffle" name={
					`dungeon-item-shuffle-${ Settings[dungeonItemShuffling] }`
				} />
				<Sprite className="preset__hints" name={
					hints ? 'hints-on' : 'hints-off'
				} />
				<Sprite className="preset__item-difficulty" name={
					getItemDifficulty(itemPool, itemFunctionality, swords)
				} />
				<Sprite className="preset__enemy-difficulty" name={
					getEnemyDifficulty(enemyHealth, enemyDamage)
				} />
			</article>
		</a>
	);
});

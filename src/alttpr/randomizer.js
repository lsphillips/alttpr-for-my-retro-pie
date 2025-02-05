import {
	customizeRom
} from './customizer.js';
import {
	getPreparationPatch,
	getSeedPatch,
	getSeedPermalink
} from './api-client.js';
import {
	Goal,
	World,
	Glitches,
	ItemPlacement,
	ItemPooling,
	ItemFunctionality,
	ItemAccessibility,
	DungeonItemShuffle,
	EntranceShuffle,
	BossShuffle,
	EnemyShuffle,
	EnemyDamage,
	EnemyHealth,
	SwordMode,
	Language,
	HeartSpeed,
	MenuSpeed,
	HeartColor
} from './settings.js';
import {
	ok,
	fail
} from '../utils/result.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default async function randomize (rom, options = {})
{
	const settings = {
		goal                 : Goal.DefeatGanon,
		world                : World.Standard,
		glitches             : Glitches.None,
		crystalsForGanon     : 7,
		crystalsForTower     : 7,
		itemAccessibility    : ItemAccessibility.Inventory,
		itemPlacement        : ItemPlacement.Advanced,
		itemFunctionality    : ItemFunctionality.Normal,
		itemPool             : ItemPooling.Normal,
		swords               : SwordMode.Random,
		dungeonItemShuffling : DungeonItemShuffle.Standard,
		bossShuffling        : BossShuffle.None,
		entranceShuffling    : EntranceShuffle.Standard,
		enemyShuffling       : EnemyShuffle.Standard,
		enemyDamage          : EnemyDamage.Standard,
		enemyHealth          : EnemyHealth.Standard,
		hints                : true,
		spoilers             : true,
		language             : Language.English,
		heartSpeed           : HeartSpeed.Normal,
		menuSpeed            : MenuSpeed.Normal,
		heartColor           : HeartColor.Red,
		backgroundMusic      : true,
		msu1Resume           : true,
		itemQuickSwap        : false,
		reduceFlashing       : false,
		...options
	};

	const [prepare, preparationPatchError] = await getPreparationPatch();

	if (preparationPatchError)
	{
		return fail(preparationPatchError);
	}

	const [seed, seedPatchError] = await getSeedPatch(settings);

	if (seedPatchError)
	{
		return fail(seedPatchError);
	}

	const game = customizeRom(
		seed.patch(
			prepare(rom)
		),
		settings
	);

	return ok({
		game, hash : seed.hash, build : seed.build, permalink : await getSeedPermalink(seed.hash, settings.language)
	});
}

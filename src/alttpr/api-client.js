import {
	parse,
	apply
} from 'bps';
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
	Language
} from './settings.js';
import {
	ok,
	fail
} from '../utils/result.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const SeedSettingValues =
{
	[Goal.DefeatGanon]                          : 'ganon',
	[Goal.FastGanon]                            : 'fast_ganon',
	[Goal.Dungeions]                            : 'dungeons',
	[Goal.Pedestal]                             : 'pedestal',
	[Goal.TriforceHunt]                         : 'triforce-hunt',
	[Goal.GanonHunt]                            : 'ganonhunt',
	[Goal.Completionist]                        : 'completionist',
	[World.Standard]                            : 'standard',
	[World.Open]                                : 'open',
	[World.Inverted]                            : 'inverted',
	[World.Retro]                               : 'retro',
	[Glitches.Overworld]                        : 'overworld_glitches',
	[Glitches.Hybrid]                           : 'hybrid_major_glitches',
	[Glitches.Major]                            : 'major_glitches',
	[Glitches.Logicless]                        : 'no_logic',
	[Glitches.None]                             : 'none',
	[ItemPlacement.Basic]                       : 'basic',
	[ItemPlacement.Advanced]                    : 'advanced',
	[ItemPooling.Standard]                      : 'normal',
	[ItemPooling.Hard]                          : 'hard',
	[ItemPooling.Expert]                        : 'expert',
	[ItemFunctionality.Normal]                  : 'normal',
	[ItemFunctionality.Hard]                    : 'hard',
	[ItemFunctionality.Expert]                  : 'expert',
	[ItemAccessibility.Inventory]               : 'items',
	[ItemAccessibility.Locations]               : 'locations',
	[ItemAccessibility.None]                    : 'none',
	[DungeonItemShuffle.Standard]               : 'standard',
	[DungeonItemShuffle.MapsCompasses]          : 'mc',
	[DungeonItemShuffle.MapsCompassesSmallKeys] : 'mcs',
	[DungeonItemShuffle.Keysanity]              : 'full',
	[EntranceShuffle.Standard]                  : 'none',
	[EntranceShuffle.Simple]                    : 'simple',
	[EntranceShuffle.Restricted]                : 'restricted',
	[EntranceShuffle.Full]                      : 'full',
	[EntranceShuffle.Crossed]                   : 'crossed',
	[EntranceShuffle.Insanity]                  : 'insanity',
	[BossShuffle.Standard]                      : 'none',
	[BossShuffle.Simple]                        : 'simple',
	[BossShuffle.Full]                          : 'full',
	[BossShuffle.Random]                        : 'random',
	[EnemyShuffle.Standard]                     : 'none',
	[EnemyShuffle.Shuffled]                     : 'shuffled',
	[EnemyShuffle.Random]                       : 'random',
	[EnemyDamage.Standard]                      : 'default',
	[EnemyDamage.Shuffled]                      : 'shuffled',
	[EnemyDamage.Random]                        : 'random',
	[EnemyHealth.Standard]                      : 'default',
	[EnemyHealth.Easy]                          : 'easy',
	[EnemyHealth.Hard]                          : 'hard',
	[EnemyHealth.Expert]                        : 'expert',
	[SwordMode.Standard]                        : 'vanilla',
	[SwordMode.Assured]                         : 'assured',
	[SwordMode.None]                            : 'swordless',
	[SwordMode.Random]                          : 'randomized',
	[Language.English]                          : 'en',
	[Language.French]                           : 'fr',
	[Language.German]                           : 'de',
	[Language.Spanish]                          : 'es'
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function createSeedSettings ({
	goal,
	world,
	glitches,
	crystalsForGanon,
	crystalsForTower,
	itemAccessibility,
	itemPlacement,
	itemFunctionality,
	itemPool,
	swords,
	dungeonItemShuffling,
	bossShuffling,
	entranceShuffling,
	enemyShuffling,
	enemyDamage,
	enemyHealth,
	hints,
	spoilers,
	language
})
{
	/* eslint-disable object-shorthand */

	const crystals = {
		'ganon' : crystalsForGanon.toString(),
		'tower' : crystalsForTower.toString()
	};

	const enemizer = {
		'boss_shuffle'  : SeedSettingValues[bossShuffling],
		'enemy_shuffle' : SeedSettingValues[enemyShuffling],
		'enemy_damage'  : SeedSettingValues[enemyDamage],
		'enemy_health'  : SeedSettingValues[enemyHealth]
	};

	const item = {
		'functionality' : SeedSettingValues[itemFunctionality],
		'pool'          : SeedSettingValues[itemPool]
	};

	return {
		'lang'           : SeedSettingValues[language],
		'mode'           : SeedSettingValues[world],
		'goal'           : SeedSettingValues[goal],
		'glitches'       : SeedSettingValues[glitches],
		'accessibility'  : SeedSettingValues[itemAccessibility],
		'item_placement' : SeedSettingValues[itemPlacement],
		'item'           : item,
		'weapons'        : SeedSettingValues[swords],
		'dungeon_items'  : SeedSettingValues[dungeonItemShuffling],
		'entrances'      : SeedSettingValues[entranceShuffling],
		'crystals'       : crystals,
		'enemizer'       : enemizer,
		'hints'          : hints ? 'on' : 'off',
		'spoilers'       : spoilers ? 'on' : 'off',
		'tournament'     : false
	};
}

function createPreparationPatchFunction (bps)
{
	let patch;

	try
	{
		patch = parse(bps);
	}
	catch
	{
		return fail('Unable to parse the base patch. It is not invalid BPS file.');
	}

	return ok(rom => apply(patch.instructions, rom));
}

function createSeedPatchFunction (instructions)
{
	return rom =>
	{
		instructions.forEach(instruction => Object.keys(instruction).forEach(address => instruction[address].forEach((byte, i) =>
		{
			rom[Number(address) + i] = byte;
		})));

		return rom;
	};
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export async function getPreparationPatch ()
{
	/* eslint-disable camelcase */

	const settings = await fetch('https://alttpr.com/base_rom/settings');

	if (settings.status !== 200)
	{
		return fail(`Unable to identify the base patch. The API responded with status code ${settings.status}.`);
	}

	const {
		base_file
	} = await settings.json();

	const patch = await fetch(`https://alttpr.com/${base_file}`);

	if (patch.status !== 200)
	{
		return fail(`Unable to download the base patch. The API responded with status code ${patch.status}.`);
	}

	const buffer = await patch.arrayBuffer();

	return createPreparationPatchFunction(
		new Uint8Array(buffer)
	);
}

export async function getSeedPatch (settings)
{
	const response = await fetch('https://alttpr.com/api/randomizer', {
		method  : 'POST',
		body    : JSON.stringify(
			createSeedSettings(settings)
		),
		headers : {
			'Content-Type' : 'application/json'
		}
	});

	if (response.status !== 200)
	{
		return fail(`Unable to generate seed. The API responded with status code ${response.status}.`);
	}

	const {
		hash,
		patch,
		spoiler
	} = await response.json();

	return ok({
		hash, build : spoiler?.meta.build, patch : createSeedPatchFunction(patch)
	});
}

export async function getSeedPermalink (hash, language = Language.English)
{
	return `https://alttpr.com/${ SeedSettingValues[language] }/h/${hash}`;
}

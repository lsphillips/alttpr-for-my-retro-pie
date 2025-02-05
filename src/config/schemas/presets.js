import Ajv from 'ajv';
import {
	Goal,
	World,
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
	SwordMode
} from '../../alttpr/settings.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export const presetSchema =
{
	type : 'array',

	items :
	{
		type : 'object',

		properties :
		{
			name : {
				type : 'string'
			},
			goal : {
				type : 'string',
				enum : Object.keys(Goal)
			},
			world : {
				type : 'string',
				enum : Object.keys(World)
			},
			crystalsForGanon : {
				type : 'number'
			},
			crystalsForTower : {
				type : 'number'
			},
			itemAccessibility : {
				type : 'string',
				enum : Object.keys(ItemAccessibility)
			},
			itemPlacement : {
				type : 'string',
				enum : Object.keys(ItemPlacement)
			},
			itemFunctionality : {
				type : 'string',
				enum : Object.keys(ItemFunctionality)
			},
			itemPool : {
				type : 'string',
				enum : Object.keys(ItemPooling)
			},
			swords : {
				type : 'string',
				enum : Object.keys(SwordMode)
			},
			dungeonItemShuffling : {
				type : 'string',
				enum : Object.keys(DungeonItemShuffle)
			},
			bossShuffling : {
				type : 'string',
				enum : Object.keys(BossShuffle)
			},
			entranceShuffling : {
				type : 'string',
				enum : Object.keys(EntranceShuffle)
			},
			enemyShuffling : {
				type : 'string',
				enum : Object.keys(EnemyShuffle)
			},
			enemyDamage : {
				type : 'string',
				enum : Object.keys(EnemyDamage)
			},
			enemyHealth : {
				type : 'string',
				enum : Object.keys(EnemyHealth)
			},
			hints : {
				type : 'boolean'
			}
		},

		required : [
			'name'
		],

		additionalProperties : false
	}
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export function validatePresets (presets)
{
	const validate = new Ajv()
		.compile(presetSchema);

	if (
		!validate(presets)
	)
	{
		return false;
	}

	return true;
}

import Ajv from 'ajv';
import {
	presetSchema
} from './presets.js';
import {
	HeartSpeed,
	MenuSpeed,
	HeartColor
} from '../../alttpr/settings.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export const configSchema =
{
	type : 'object',

	properties :
	{
		baseRomPath : {
			type : 'string'
		},
		targetDirectoryPath : {
			type : 'string'
		},
		heartSpeed : {
			type : 'string',
			enum : Object.keys(HeartSpeed)
		},
		menuSpeed : {
			type : 'string',
			enum : Object.keys(MenuSpeed)
		},
		heartColor : {
			type : 'string',
			enum : Object.keys(HeartColor)
		},
		backgroundMusic : {
			type : 'boolean'
		},
		msu1Resume : {
			type : 'boolean'
		},
		itemQuickSwap : {
			type : 'boolean'
		},
		reduceFlashing : {
			type : 'boolean'
		},
		seedPresets : {
			oneOf : [
				{ type : 'string' },
				presetSchema
			]
		}
	},

	required : [
		'baseRomPath',
		'seedPresets'
	],

	additionalProperties : false
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export function validateConfig (config)
{
	const validate = new Ajv()
		.compile(configSchema);

	if (
		!validate(config)
	)
	{
		return false;
	}

	return true;
}

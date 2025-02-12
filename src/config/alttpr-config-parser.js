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
	HeartSpeed,
	MenuSpeed,
	HeartColor
} from '../alttpr/settings.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function lookup (setting, name, fallback)
{
	return setting[name] || fallback;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export function parseSettings ({
	heartSpeed,
	menuSpeed,
	heartColor,
	backgroundMusic = true,
	msu1Resume = true,
	itemQuickSwap = false,
	reduceFlashing = false
})
{
	return {
		backgroundMusic,
		msu1Resume,
		itemQuickSwap,
		reduceFlashing,
		heartSpeed : lookup(HeartSpeed, heartSpeed, HeartSpeed.Normal),
		menuSpeed : lookup(MenuSpeed, menuSpeed, MenuSpeed.Normal),
		heartColor : lookup(HeartColor, heartColor, HeartColor.Red)
	};
}

export function parsePreset ({
	name,
	goal,
	world,
	glitches,
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
	crystalsForGanon = 7,
	crystalsForTower = 7,
	hints = true,
	spoilers = true
})
{
	return {
		name,
		crystalsForGanon,
		crystalsForTower,
		hints,
		spoilers,
		goal : lookup(Goal, goal, Goal.DefeatGanon),
		world : lookup(World, world, World.Standard),
		glitches : lookup(Glitches, glitches, Glitches.None),
		itemAccessibility : lookup(ItemAccessibility, itemAccessibility, ItemAccessibility.Inventory),
		itemPlacement : lookup(ItemPlacement, itemPlacement, ItemPlacement.Basic),
		itemFunctionality : lookup(ItemFunctionality, itemFunctionality, ItemFunctionality.Normal),
		itemPool : lookup(ItemPooling, itemPool, ItemPooling.Normal),
		swords : lookup(SwordMode, swords, SwordMode.Random),
		dungeonItemShuffling : lookup(DungeonItemShuffle, dungeonItemShuffling, DungeonItemShuffle.Standard),
		bossShuffling : lookup(BossShuffle, bossShuffling, BossShuffle.None),
		entranceShuffling : lookup(EntranceShuffle, entranceShuffling, EntranceShuffle.None),
		enemyShuffling : lookup(EnemyShuffle, enemyShuffling, EnemyShuffle.None),
		enemyDamage : lookup(EnemyDamage, enemyDamage, EnemyDamage.Default),
		enemyHealth : lookup(EnemyHealth, enemyHealth, EnemyHealth.Default)
	};
}

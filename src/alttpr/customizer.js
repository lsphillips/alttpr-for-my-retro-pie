import {
	HeartColor,
	MenuSpeed,
	HeartSpeed
} from './settings.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const HeartSpeeds = {
	[HeartSpeed.Quater] : 0x80,
	[HeartSpeed.Half]   : 0x40,
	[HeartSpeed.Normal] : 0x20,
	[HeartSpeed.Double] : 0x10,
	[HeartSpeed.Off]    : 0x00
};

const MenuSpeeds = {
	[MenuSpeed.Instant] : 0xe8,
	[MenuSpeed.Slow]    : 0x10,
	[MenuSpeed.Normal]  : 0x08,
	[MenuSpeed.Fast]    : 0x04
};

const HeartColors = {
	[HeartColor.Red]    : 0x00,
	[HeartColor.Blue]   : 0x01,
	[HeartColor.Green]  : 0x02,
	[HeartColor.Yellow] : 0x03
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function setHeartSpeed (rom, speed)
{
	rom[0x180033] = HeartSpeeds[speed];
}

function setHeartColor (rom, color)
{
	rom[0x187020] = HeartColors[color];
}

function setMenuSpeed (rom, speed)
{
	rom[0x180048] = MenuSpeeds[speed];
	rom[0x6dd9a]  = speed === MenuSpeed.Instant ? 0x20 : 0x11;
	rom[0x6df2a]  = speed === MenuSpeed.Instant ? 0x20 : 0x12;
	rom[0x6e0e9]  = speed === MenuSpeed.Instant ? 0x20 : 0x12;
}

function setBackgroundMusic (rom, enabled)
{
	rom[0x18021a] = enabled ? 0x00 : 0x01;

	return true;
}

function setItemQuickSwap (rom, enabled)
{
	rom[0x18004b] = enabled ? 0x01 : 0x00;

	return true;
}

function setMSU1Resume (rom, enabled)
{
	rom[0x18021d] = enabled ? 0x01 : 0x00;
	rom[0x18021e] = enabled ? 0x01 : 0x00;

	return true;
}

function setReduceFlashing (rom, enabled)
{
	rom[0x18017f] = enabled ? 0x01 : 0x00;

	return true;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export function customizeRom (rom, {
	heartSpeed,
	menuSpeed,
	heartColor,
	backgroundMusic,
	msu1Resume,
	itemQuickSwap,
	reduceFlashing
})
{
	setHeartSpeed(rom, heartSpeed);
	setMenuSpeed(rom, menuSpeed);
	setHeartColor(rom, heartColor);
	setBackgroundMusic(rom, backgroundMusic);
	setMSU1Resume(rom, msu1Resume);
	setItemQuickSwap(rom, itemQuickSwap);
	setReduceFlashing(rom, reduceFlashing);

	return rom;
}

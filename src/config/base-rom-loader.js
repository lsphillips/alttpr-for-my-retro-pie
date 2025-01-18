import {
	readFile
} from 'node:fs/promises';
import crc32 from 'crc-32';
import {
	ok,
	fail
} from '../utils/result.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const Checksum = 0x3322effc;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export async function getBaseRom (path)
{
	let rom;

	try
	{
		rom = await readFile(path, null);
	}
	catch
	{
		return fail(`Base ROM '${path}' does not exist.`);
	}

	if (
		(crc32.buf(rom) >>> 0) !== Checksum
	)
	{
		return fail(`Base ROM '${path}' is not a valid. It must be a "Zelda no Densetsu: Kamigami no Triforce v1.0" ROM.`);
	}

	return ok(rom);
}

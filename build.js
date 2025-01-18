import {
	copy,
	readJson,
	outputJson
} from 'fs-extra/esm';
import {
	build,
	context
} from 'esbuild';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

async function buildInterface ({
	developing
} = {})
{
	const config = {

		entryPoints : [
			'src/ui/index.jsx'
		],

		outdir : 'src/views/assets',

		bundle : true,

		minify : !developing,

		jsx : 'automatic',

		target : [
			'es2022'
		],

		format : 'esm',

		loader : {
			'.png' : 'file'
		},

		sourcemap : developing ? 'linked' : false
	};

	if (developing)
	{
		const ctx = await context(config);

		await ctx.watch();
	}
	else
	{
		await build(config);
	}
}

async function buildApp ()
{
	// 1) Create Main Process Bundle.
	await build({

		entryPoints : [
			'src/main.js'
		],

		outdir : 'build',

		bundle : true,

		minify : true,

		target : [
			'es2022'
		],

		platform : 'node',

		format : 'esm',

		loader : {
			'.html' : 'file',
			'.cjs' : 'file'
		},

		packages : 'external',

		sourcemap : false
	});

	// 2) Create Preload Script Bundle.
	await build({

		entryPoints : [
			'src/preload.cjs'
		],

		outdir : 'build',

		bundle : true,

		minify : true,

		target : [
			'es2022'
		],

		platform : 'node',

		format : 'cjs',

		packages : 'external',

		sourcemap : false
	});

	// 3) Create Application Manifest.
	const {
		name,
		version,
		type,
		description,
		author,
		dependencies
	} = await readJson('package.json');

	await outputJson('build/package.json', {
		name,
		version,
		type,
		description,
		author,
		dependencies,
		main : 'main.js'
	});

	// 4) Copy Views & Assets.
	await copy('src/views', 'build/views');
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

switch (
	process.argv[2]?.toLowerCase()
)
{
	case 'developing' :

		await buildInterface({
			developing : true
		});

		break;

	case 'building' :

		await Promise.all([
			buildInterface(),
			buildApp()
		]);

		break;

	default :

		process.exitCode = 1;

		console.error('Build mode was not provided or was not recognized.');
}

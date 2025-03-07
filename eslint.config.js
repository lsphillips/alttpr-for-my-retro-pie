import protectMeFromMyStupidity             from 'eslint-config-protect-me-from-my-stupidity';
import andFromWritingStupidNodeApplications from 'eslint-config-protect-me-from-my-stupidity/and/from-writing-stupid-node-applications';
import andFromWritingStupidWebApplications  from 'eslint-config-protect-me-from-my-stupidity/and/from-writing-stupid-web-applications';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default [
	{
		ignores : [
			'src/views/assets/**/*',
			'build/**/*',
			'packages/**/*'
		]
	},
	...protectMeFromMyStupidity(),
	...andFromWritingStupidWebApplications([
		'src/ui/**/*.@(js|jsx)'
	]),
	...andFromWritingStupidNodeApplications()
];

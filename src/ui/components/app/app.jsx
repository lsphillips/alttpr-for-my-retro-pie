import {
	useState,
	useEffect
} from 'react';
import Spinner from '../spinner/spinner.jsx';
import Result from '../result/result.jsx';
import Presets from '../presets/presets.jsx';
import Settings from '../settings/settings.jsx';
import Problem from '../problem/problem.jsx';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import './app.css';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default function App ()
{
	// State.
	const [isLoading, setIsLoading]         = useState(false);
	const [problem, setProblem]             = useState(null);
	const [presets, setPresets]             = useState(null);
	const [settings, setSettings]           = useState(null);
	const [isRandomizing, setIsRandomizing] = useState(false);
	const [result, setResult]               = useState(null);

	// Effects.
	useEffect(() =>
	{
		setIsLoading(true);

		window.alttpr.setup()
			.then(([setup, error]) =>
			{
				setPresets(setup.presets);
				setSettings(setup.settings);
				setProblem(error);
			})
			.catch(() =>
			{
				setProblem('Something unexpected went wrong when loading configuration.');
			})
			.finally(() =>
			{
				setIsLoading(false);
			});

	}, []);

	// Handlers.
	async function randomize (preset)
	{
		setIsRandomizing(true);

		try
		{
			const [rom, error] = await window.alttpr.randomize(preset);

			if (error)
			{
				setProblem(error);
			}
			else
			{
				setResult({
					...rom, hints : preset.hints
				});
			}
		}
		catch
		{
			setProblem('Something unexpected went wrong when randomizing the game.');
		}
		finally
		{
			setIsRandomizing(false);
		}
	}

	async function close ()
	{
		await window.alttpr.close();
	}

	// Render.
	let contents = null;

	if (problem)
	{
		contents = (
			<Problem className="app__error" error={ problem } />
		);
	}
	else if (isLoading || isRandomizing)
	{
		contents = (
			<Spinner className="app__spinner">
				{ isLoading ? 'Loading configuration' : 'Randomizing' }
			</Spinner>
		);
	}
	else if (result !== null)
	{
		contents = (
			<Result className="app__result" { ...result } onPlay={ close } />
		);
	}
	else if (presets !== null)
	{
		contents = (
			<Presets className="app__presets" presets={ presets } onSelect={ randomize } />
		);
	}

	return (
		<div className="app">
			{ contents }
			{ settings && <Settings className="app__settings" { ...settings } /> }
		</div>
	);
}

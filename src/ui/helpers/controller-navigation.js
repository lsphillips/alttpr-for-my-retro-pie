function onControllerReady (callback)
{
	if (
		navigator.getGamepads().some(g => g !== null)
	)
	{
		callback();
	}
	else
	{
		window.addEventListener('gamepadconnected', () =>
		{
			callback();

		}, { once : true });
	}
}

function getControllerState ()
{
	const [controller] = navigator.getGamepads();

	if (controller == null)
	{
		return null;
	}

	return {
		up     : controller.buttons[12].pressed,
		down   : controller.buttons[13].pressed,
		select : controller.buttons[1].pressed
	};
}

function moveElementInFocus (direction)
{
	const selectable = document.querySelectorAll('[data-selectable]');

	if (selectable.length === 0)
	{
		return;
	}

	const active = document.activeElement;

	if (active === null || active === document.body)
	{
		selectable[direction === 1 ? 0 : selectable.length - 1].focus();

		return;
	}

	for (let i = 0, l = selectable.length; i < l; ++i)
	{
		if (selectable[i] === active)
		{
			selectable[
				Math.min(Math.max(i + direction, 0), l - 1) // Clamp.
			].focus();

			break;
		}
	}
}

function selectElementInFocus ()
{
	const active = document.activeElement;

	if (active !== null && active !== document.body)
	{
		active.click();
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export function setupControllerNavigation ()
{
	onControllerReady(() =>
	{
		document.body.style.cursor = 'none';
	});

	let lastExecutedAt = 0;

	requestAnimationFrame(function loop ()
	{
		const now = Date.now();

		if (
			(now - lastExecutedAt) >= 100
		)
		{
			lastExecutedAt = now;

			const state = getControllerState();

			if (state !== null)
			{
				switch (true) // eslint-disable-line default-case
				{
					case state.up :
						moveElementInFocus(-1);
						break;

					case state.down :
						moveElementInFocus(1);
						break;

					case state.select :
						selectElementInFocus();
						break;
				}
			}
		}

		requestAnimationFrame(loop);
	});
}

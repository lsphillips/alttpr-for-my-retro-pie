import './index.css';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import {
	createRoot
} from 'react-dom/client';
import {
	setupControllerNavigation
} from './helpers/controller-navigation.js';
import App from './components/app/app.jsx';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

setupControllerNavigation();

createRoot(
	document.getElementById('root')
)
	.render(
		<App />
	);

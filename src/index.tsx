import type { Application } from 'typedoc';
import { Java18Theme } from './Java18Theme.js';

/**
 * Called by TypeDoc when loading this theme as a plugin
 */
export function load(app: Application) {
	app.renderer.defineTheme('typedoc-java18-theme', Java18Theme);

	app.on('bootstrapEnd', () => {
		if (app.options.isSet('theme') && app.options.getValue('theme') !== 'typedoc-java18-theme') {
			return app.logger.warn(
				`The theme 'typedoc-java18-theme' is not used because another theme (${app.options.getValue('theme')}) was specified!`
			);
		}

		app.options.setValue('theme', 'typedoc-java18-theme');
	});
}

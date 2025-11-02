import { cpSync } from 'fs';
import { dirname, resolve } from 'path';
import type { PageEvent, Reflection, Renderer } from 'typedoc';
import { DefaultTheme, JSX, RendererEvent } from 'typedoc';
import { fileURLToPath } from 'url';
import { Java18ThemeContext } from './Java18ThemeContext.js';

export class Java18Theme extends DefaultTheme {
	constructor(renderer: Renderer) {
		super(renderer);

		// copy the complete assets
		renderer.on(RendererEvent.END, (event) => {
			const from = resolve(dirname(fileURLToPath(import.meta.url)), '../src/assets/');
			const to = resolve(event.outputDirectory, 'assets/');

			cpSync(from, to, { recursive: true });
		});

		// link the css file
		renderer.hooks.on('head.end', (event) => (
			<>
				<link rel="stylesheet" href={event.relativeURL('assets/typedoc-java18-style.css')} />
			</>
		));

		// set the Shiki theme
		renderer.application.on('bootstrapEnd', () => {
			if (!this.application.options.isSet('lightHighlightTheme')) {
				this.application.options.setValue('lightHighlightTheme', 'java18-light-default');
			}

			if (!this.application.options.isSet('darkHighlightTheme')) {
				this.application.options.setValue('darkHighlightTheme', 'java18-dark-default');
			}
		});
	}

	getRenderContext(pageEvent: PageEvent<Reflection>) {
		return new Java18ThemeContext(this.router, this, pageEvent, this.application.options);
	}
}

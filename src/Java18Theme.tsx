import { cpSync } from 'fs';
import { dirname, resolve } from 'path';
import type {
	ContainerReflection,
	DocumentReflection,
	PageEvent,
	ProjectReflection,
	Reflection,
	Renderer
} from 'typedoc';
import {
	DefaultTheme,
	JSX,
	PageKind,
	RenderTemplate,
	RendererEvent
} from 'typedoc';
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

	render(page: PageEvent): string {
        const templateMapping: Record<string, (_: PageEvent<never>) => JSX.Element> = {
            [PageKind.Index]: this.indexTemplate,
            [PageKind.Document]: this.documentTemplate,
            [PageKind.Hierarchy]: this.hierarchyTemplate,
            [PageKind.Reflection]: this.reflectionTemplate,
        };

        const template = templateMapping[page.pageKind];

        if (!template) {
            throw new Error(`TypeDoc's DefaultTheme does not support the page kind ${page.pageKind}`);
        }

        if (!page.isReflectionEvent()) {
            throw new Error(
                `TypeDoc's DefaultTheme requires that a page model be a reflection when rendering ${page.pageKind}`,
            );
        }

        const templateOutput = this.defaultLayoutTemplate(page, template as RenderTemplate<PageEvent<Reflection>>);
        return "<!DOCTYPE html>" + JSX.renderElement(templateOutput) + "\n";
    }
}

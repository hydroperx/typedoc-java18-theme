import { DefaultThemeRenderContext, JSX, Models, PageEvent } from 'typedoc';
import { footer } from './partials/footer.js';
import { documentTemplate } from 'templates/document.js';
import { reflectionTemplate } from 'templates/reflection.js';

function bind<F, L extends any[], R>(fn: (f: F, ...a: L) => R, first: F) {
    return (...r: L) => fn(first, ...r);
}

export class Java18ThemeContext extends DefaultThemeRenderContext {
	override footer = () => footer(this);

	override documentTemplate: (props: PageEvent<Models.DocumentReflection>) => JSX.Element
		= bind(documentTemplate, this);

	override reflectionTemplate: (props: PageEvent<Models.Reflection>) => JSX.Element
		= bind(reflectionTemplate, this);
}

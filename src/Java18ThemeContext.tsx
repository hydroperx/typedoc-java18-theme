import { DefaultThemeRenderContext } from 'typedoc';
import { footer } from './partials/footer.js';

export class Java18ThemeContext extends DefaultThemeRenderContext {
	override footer = () => footer(this);
}

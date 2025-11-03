import { DefaultThemeRenderContext, DocumentReflection, JSX, PageEvent } from "typedoc";

export const documentTemplate = ({ markdown }: DefaultThemeRenderContext, props: PageEvent<DocumentReflection>) => (
    <div class="tsd-panel tsd-typography">
        <JSX.Raw html={markdown(props.model.content)} />
    </div>
);

# TypeDoc Java 18 Theme

This [TypeDoc](https://github.com/TypeStrong/typedoc) theme uses a design close to JavaDoc theme seen in the Java SE 18 API documentation.

> **Note**: This is a work-in-progress. It is not done, yet.

## Usage

**Install the package with your favourite package manager:**

```text
npm install @hydroperx/typedoc-java18-theme --save-dev
```

```text
pnpm add @hydroperx/typedoc-java18-theme --save-dev
```

```text
yarn add @hydroperx/typedoc-java18-theme --dev
```

**Use the theme when generating your documentation:**

```text
npx typedoc src --plugin @hydroperx/typedoc-java18-theme
```

> [!NOTE]
> This plugin fills the following options if they have not been defined by the user:
> [`theme`](https://typedoc.org/options/output/#theme), [`lightHighlightTheme`](https://typedoc.org/options/output/#lighthighlighttheme), [`darkHighlightTheme`](https://typedoc.org/options/output/#darkhighlighttheme)

---

## Authors

This project started by using [Julian Wowra @JulianWowra's `typedoc-github-theme`](https://github.com/JulianWowra/typedoc-github-theme) as a template, however it is significantly different, so most of `@hydroperx/typedoc-java18-theme` is done by [Matheus Dias de Souza @hydroperx](https://github.com/hydroperx/typedoc-java18-theme).

Also credits to TypeDoc for some of the default theme code.

# @eruptionjs/config ⚙️

Opinionated configuration for projects using Prettier, ESLint, TypeScript and React.

## Installation

```bash
npm install --save-dev @eruptionjs/config
```

## usage

While you have full control over the configuration, you can use the settings in this project as a starting point for your own. In many cases, the default configurations may be all you need.

### Prettier configuration

Install `prettier` on your project, and add the eruptionjs configuration on your `package.json`:

```bash
npm install --save-dev prettier
```

**package.json**
```json
{
  // ... Your existing configuration
  "prettier": "@eruptionjs/config/prettier"
}
```

### TypeScript configuration

The Eruption TypeScript configuration extends the base TypeScript configuration with additional rules and settings.

To use the configuration, add the following to your `tsconfig.json` (create it if it doesn't exist):

```json
{
  "extends": "@eruptionjs/config/typescript",
  "include": ["@eruptionjs/reset.d.ts", "**/*.ts", "**/*.tsx"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### ESLint configuration

The Eruption ESLint configuration extends the base ESLint configuration with additional rules and settings.

To use the configuration, install `eslint` on your project, and add the following to your `eslint.config.js` file (create it if it doesn't exist):

```bash
npm install --save-dev eslint
```

**eslint.config.js**
```js
import { config as defaultConfig } from '@eruptionjs/config/eslint'

/** @type {import("eslint").Linter.Config} */
export default [...defaultConfig]
```

### Biome configuration (Experimental 🧪)

Install `biome` on your project, and add the eruptionjs configuration on your `biome.json` file:

```bash
npm install --save-dev @biomejs/biome
```

**biome.json**
```json
{
  "extends": "@eruptionjs/config/biome"
}
```


## License

MIT @ EruptionJS and its contributors.

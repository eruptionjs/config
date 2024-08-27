# @eruptionjs/config ⚙️

Opinionated configuration for projects using Prettier, ESLint, TypeScript and React.

## Installation

```bash
npm install --save-dev @eruptionjs/config
```

## usage
While you have full control over the configuration, you can use the settings in this project as a starting point for your own. In many cases, the default configurations may be all you need.

### Prettier configuration

Just add the following to your `package.json`:

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

WIP 🚧

## License

MIT @ EruptionJS and its contributors.
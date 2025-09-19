# typescript-lambda-tooling (⚠️ WIP ⚠️)

TypeScript starter for AWS Lambda functions with modern development workflow.

## Project Structure

This repository demonstrates a toolchain for TypeScript projects. Each tool was
chosen to solve specific development workflow challenges while maintaining
simplicity and performance.

### Core Development Tools

#### [TypeScript](https://www.typescript.org/) (`tsconfig.json`)

**Why we chose it:** TypeScript provides static type checking that catches
errors at compile time rather than runtime. This is essential for serverless
functions where deployment failures are expensive.

**Configuration decisions:**

- Strict mode enabled to catch the maximum number of potential bugs
- ESM modules for modern JavaScript compatibility
- Target set to Node 22 for latest language features
- Source maps enabled for debugging in production

**Trade-offs:** Adds compilation step but eliminates entire classes of runtime
errors. The strict configuration might feel restrictive initially but prevents
subtle bugs in distributed systems.

#### [Vitest](https://vitest.dev/) (`vitest.config.js`)

**Why we chose it:** Vitest offers Jest-compatible APIs with significantly
faster execution and native TypeScript support. The V8 coverage provider gives
accurate coverage metrics without additional configuration.

**Configuration decisions:**

- V8 coverage provider for accurate metrics
- 80% coverage thresholds across all metrics to ensure comprehensive testing
- Text, JSON, and HTML reporters for different consumption needs
- Excludes test files, config files, and generated types from coverage

**Trade-offs:** Newer than Jest with smaller ecosystem, but the performance
gains and zero-config TypeScript support outweigh the ecosystem concerns for
most projects.

#### [ESLint](https://eslint.org/) (`eslint.config.js`)

**Why we chose it:** ESLint provides the most comprehensive linting rules with
excellent TypeScript support. The flat config format is cleaner and more
maintainable than legacy configs.

**Configuration decisions:**

- TypeScript ESLint for type-aware linting rules
- Prettier integration to avoid conflicts
- Perfectionist plugin for consistent import/exports sorting
- Modern ES2025 environment settings

**Trade-offs:** Can be slower than alternatives, but the comprehensive rule set
and community support make it the standard for professional TypeScript projects.

#### [Prettier](https://prettier.io/) (`prettier.config.js`)

**Why we chose it:** Prettier eliminates style debates by providing opinionated,
consistent formatting. The minimal configuration prevents teams from getting
bogged down in formatting decisions.

**Configuration decisions:**

- Minimal configuration to avoid style debates
- Consistent with JavaScript ecosystem standards
- Integrates seamlessly with ESLint

**Trade-offs:** Limited configurability, but this is actually a benefit for team
consistency.

### Development Workflow Tools

#### [Husky](https://typicode.github.io/husky/) (`.husky/`)

**Why we chose it:** Husky provides reliable Git hooks that work consistently
across different development environments. Version 9+ simplified the setup
significantly.

**Configuration decisions:**

- Pre-commit hook runs lint-staged for fast feedback
- Commit-msg hook validates commit messages before they're created
- Simple shell scripts that are easy to understand and modify

**Trade-offs:** Requires Git setup, but the early feedback prevents broken code
from entering the repository.

#### [lint-staged](https://github.com/okonet/lint-staged) (`lint-staged.config.js`)

**Why we chose it:** Running linters on entire codebases is slow. lint-staged
only processes changed files, providing fast feedback during development.

**Configuration decisions:**

- Runs Prettier and ESLint only on staged files
- Automatically fixes issues where possible
- Fast feedback loop prevents committing broken code

**Trade-offs:** Another tool to configure, but the performance improvement is
significant for large codebases.

#### [commitlint](https://commitlint.js.org/) (`commitlint.config.js`)

**Why we chose it:** Conventional commits enable automated changelog generation
and semantic versioning. commitlint enforces this format at commit time.

**Configuration decisions:**

- Conventional commit format for automated tooling compatibility
- Integrates with Husky for immediate feedback
- Standard format that tools like semantic-release understand

**Trade-offs:** Requires learning conventional commit format, but the benefits
for automation and changelog generation outweigh the learning curve.

### Build and Deployment Tools

#### [esbuild](https://esbuild.github.io/) (via `package.json` scripts)

**Why we chose it:** esbuild is 10-100x faster than traditional bundlers while
maintaining excellent tree-shaking and minification. Critical for serverless
cold starts.

**Configuration decisions in the build script:**

- `--bundle` to create self-contained executables
- `--platform=node` for Node.js compatibility
- `--target=node22` to match our Node version
- `--format=esm` for modern module system
- `--out-extension:.js=.mjs` to output .mjs files for ESM
- `--minify` for smaller bundle sizes
- `--sourcemap` for debugging in production
- `--external:@aws-sdk/*` to exclude AWS SDK (provided by runtime)
- `--tree-shaking=true` for optimal bundle size
- `--outdir=dist --outbase=src` for clean output structure

**Trade-offs:** Less plugin ecosystem than Webpack, but the performance gains
are essential for serverless deployments where cold start time matters.

### Package Management

#### [Volta](https://volta.sh/) (`package.json`)

**Why we chose it:** Volta ensures consistent Node.js and npm versions across
all development machines, eliminating "works on my machine" issues.

**Configuration decisions:**

- Node 22.19.0 for latest features and LTS stability
- npm 11.6.0 for latest package management features
- Automatic switching when entering project directories

**Trade-offs:** Requires Volta installation, but the consistency benefits are
significant for team development.

### Editor and Environment Tools

#### [VS Code Configuration](https://code.visualstudio.com/docs/getstarted/settings) (`.vscode/`)

**Why we included it:** Consistent editor settings prevent "works on my machine"
issues. The included settings optimize TypeScript development.

**Configuration decisions:**

- TypeScript and ESLint extensions recommended
- Consistent formatting on save
- Debug configuration for testing
- Editor settings that match project conventions

**Trade-offs:** VS Code specific, but it's the most popular TypeScript editor
and settings are easily portable.

#### [EditorConfig](https://editorconfig.org/) (`.editorconfig`)

**Why we chose it:** EditorConfig provides basic editor consistency across
different editors and IDEs, complementing VS Code settings.

**Configuration decisions:**

- Consistent indentation (2 spaces for TypeScript)
- UTF-8 encoding
- LF line endings for cross-platform compatibility

**Trade-offs:** Basic functionality, but provides a baseline that works in any
editor.

#### [Dependabot](https://docs.github.com/en/code-security/dependabot) (`.github/dependabot.yml`)

**Why we chose it:** Manual dependency updates are time-consuming and often
forgotten. Dependabot creates PRs automatically with changelogs.

**Configuration decisions:**

- Daily checks for npm dependencies
- Conventional commit format for automated releases
- Scoped commits for clear change tracking

**Trade-offs:** Creates PR noise, but the security and compatibility benefits
outweigh the minor inconvenience.

## Key Scripts

- `npm run build` - Bundle functions with esbuild for production
- `npm test` - Run tests with Vitest
- `npm run lint` - Check code with ESLint
- `npm run format` - Check formatting with Prettier
- `npm run test:coverage` - Generate coverage reports
- `npm run test:ui` - Interactive test explorer

# Next Starter

A starter repo for getting a NextJS project up and running quickly

## Getting Started

In order to start the development server, run the following commands:

```bash
npm ci
npm run dev
```

Then navigate to [https://localhost:17100](https://localhost:17100).

## Commit Messages

Commit messages should use the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) format. `commitlint` has been installed to validate this usage. This means that all commits should be prefixed appropriately with a tag denoting the kind of code being committed.

- `feat:` A feature, or part of a feature
- `fix:` A bug fix
- `style:` A visual or stylistic change only
- `chore:` An operational task, such as routine maintenance, version control related operations, dependencies, etc.
- `refactor:` A change to the way the code is implemented, without materially changing the feature
- `perf:` A change that is made primarily to improve performance
- `test:` Any changes required to run a specific test or try out a behavior for the purposes of testing
- `cleanup:` Markup and syntactic cleanup that doesn't affect the code output
- `docs:` Documentation-related changes
- `content:` Changes to the project's content, such as copy or media

## Code Linting

ESLint is configured to lint the following:
- Next
- Typescript
- TSDoc comments

If using VS Code, make sure to install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension

To lint outside of the development flow, run `npm run lint`

## Automations

- [Husky](https://typicode.github.io/husky/) is used to perform linting before code can be committed

## Style guide

1. All file names will be in `kebab-case`
2. All component names on import will be `PascalCase`
3. The grid used is a flexbox style system called [Gridlex](https://gridlex.devlint.fr/), its documentation is also available as a [readme in this repo](packages/site/assets/scss/grid/README.md)
4. Color name variables in `SCSS` are obtained from [this resource](https://chir.ag/projects/name-that-color/)

## Directory Structure & Guidelines

- `@/app` - The [AppRouter](https://nextjs.org/docs/app) is used to handle navigation
- SCSS modules are used for component, page and layout styling. `.module.scss` files should be placed in the same directory as the component/page/layout that it's related to. Example of directory structure to use:

```txt
components
  button.tsx
  button.module.scss
  modal.tsx
  modal.module.scss

OR even better:

components
  button
    button.tsx
    button.module.scss
  modal
    modal.tsx
    modal.module.scss
```

- `@/assets` directory contains:
  - **Fonts** (imported in settings.scss)
  - **Global SCSS files**
    - **Editable** - files that could be edited throughout development
      - `global.scss`: Defines core styling elements including typography, body styles, and general element styles that apply throughout the application.
      - `settings.scss`: Defines fundamental project settings like grid width, font settings, and core variables that are used throughout the styling system.
      - `utilities.scss`: Houses utility functions, mixins, and variables for common styling tasks like shadows, typography, and color management.
      - `x-browser.scss`: Contains cross-browser compatibility fixes and workarounds for consistent styling across different browsers.
    - **Core** - these files should not be edited unless absolutely necessary
      - `responsive.scss`: Contains breakpoint definitions and media query mixins for handling responsive design across different screen sizes.
      - `layout-grid.scss`: Provides grid-based layout utilities and classes for structuring the application's layout system.
      - `reset.scss`: Provides CSS reset rules to normalize browser default styles and ensure consistent rendering across different browsers.
      - `normalize.scss`: Implements modern CSS normalization to make browsers render elements more consistently with modern standards.

- `@/components` contains components
- `@/public` contains servable assets
- `@/services` contains modules that offer specific functionality, such as authentication
- `@/lib` contains general, abstract components and utility functions for use throughout the app

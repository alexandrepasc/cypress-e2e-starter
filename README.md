# cypress-e2e-starter
<!-- TOC -->

- [cypress-e2e-starter](#cypress-e2e-starter)
	- [Introduction](#introduction)
	- [Getting Started](#getting-started)
	- [Build and Test](#build-and-test)
		- [Store Credentials](#store-credentials)
		- [Postgres Connection](#postgres-connection)
	- [Contribute](#contribute)
	- [Appendix](#appendix)
		- [Rules](#rules)
			- [indent](#indent)
			- [linebreak-style](#linebreak-style)
			- [quotes](#quotes)
			- [semi](#semi)
			- [camelcase](#camelcase)
			- [curly](#curly)
			- [max-len](#max-len)
			- [no-mixed-spaces-and-tabs](#no-mixed-spaces-and-tabs)
			- [no-trailing-spaces](#no-trailing-spaces)
			- [no-multiple-empty-lines](#no-multiple-empty-lines)
			- [object-curly-newline](#object-curly-newline)
			- [@typescript-eslint/typedef](#typescript-eslinttypedef)
			- [operator-linebreak](#operator-linebreak)
			- [dot-location](#dot-location)
			- [comma-spacing](#comma-spacing)
			- [func-call-spacing](#func-call-spacing)
			- [key-spacing](#key-spacing)
			- [newline-per-chained-call](#newline-per-chained-call)
			- [@typescript-eslint/naming-convention](#typescript-eslintnaming-convention)
			- [sort-imports](#sort-imports)
			- [cypress/no-assigning-return-values](#cypressno-assigning-return-values)
			- [cypress/no-unnecessary-waiting](#cypressno-unnecessary-waiting)
			- [cypress/assertion-before-screenshot](#cypressassertion-before-screenshot)
			- [cypress/no-force](#cypressno-force)
			- [cypress/no-async-tests](#cypressno-async-tests)
			- [cypress/no-pause](#cypressno-pause)
		- [Links](#links)
		- [Steps to create this proj from zero](#steps-to-create-this-proj-from-zero)

<!-- /TOC -->

## Introduction
The objective of this project is to have a starter project that can be used when a new `Cypress` testing project needs to be created. This can be used completely if the new test project is independent from the development one, in the other case this can also be used as a guide.

## Getting Started
To be able to use this project [Node.js](https://nodejs.org/en) and [yarn](https://classic.yarnpkg.com/lang/en/) need to be installed. This project is done using `Typescript` so to be able to use it some knowledge of *javascript*, *typescript*, and how to use `Cypress`. All the information/instructions in this document will be using a `GNU/Linux` operating system.

This project, besides the main objective described in the [Introduction](#introduction), has the idea of setting some structure to organize the files, linting rules to have the code clean, and to implement the `Page Object Model (POM)`.

To lint the project the *ESLint* is set in place with some rules configured in the file `.eslintrc.json` and the rules could be changed, removed or add more. If the *IDE* used is the *VS Code*/*VS Codium* the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension could be installed and configured to give feedback if some rule is broken. Some *VS Code* configurations are already committed in the project, as some configurations for the extension.

To be comfortable using this we should have some knowledge on the OS that is using, and knowledge in the tools that are used.

## Build and Test
Install the project dependencies, they are all defined in the `package.json`, so just run in the project root path:
- `yarn`

Execute the `setup-environment` script to set the pre-commit hook to the `.git` folder:
- `./scripts/setup-environment.sh`

In case the `setup-environment` is not executable execute the following command to give execution permissions to the file:
- `chmod +x scripts/setup-environment.sh`

The `package.json` file has some already created shortcuts to in the `scripts` section to ease the use of `Cypress`. More shortcuts can be added, or change the ones that were already created.

If using the *VS Code* in some cases it will confuse the `Cypress` commands with other libraries when giving the help, to prevent this we should add 1 line at the top of every file that will have `Cypress` code. So in every file add the following line:
- `///<reference types="cypress"/>`

And it is basically it, the requirements are installed and every thing is in place to start creating and executing the tests.

### Store Credentials
It is not a good practice to store credentials to the test environment in the code, since this way they are store in every computer that can clone the project in plain text. A better approach to this that can leverage functionalities from the CI/CD tools is to use environment variables, not the environment variables stored in `Cypress` config file but the `OS` ones. They can be stored in the CI/CD tool and even can be stored as not readable by the users.

`Cypress` can read automatically the `OS` environment variables if we create the variables starting with `CYPRESS_` or `cypress_`, and we can retrieve the values the same way as if we created them in the configuration file.

For example:
```
export CYPRESS_HOST=dev.local
export cypress_api_server=http://localhost:8888/api/v1/
```
Can retrieve the values:
```
Cypress.env()
Cypress.env('HOST')
Cypress.env('api_server') 
```

If we need to have access to the values in the configuration file, if they need to be used in a `task`, we can use the following:
```
config.env.HOST
config.env.api_server
```

### Postgres Connection
When creating *E2E* tests there are some issues testing under a mutable environment, in some cases the information in the environment is generated by a 3rd party or by hardware out of the testing control. With this type of context is hard to add *E2E* tests and to add the most coverage to the project, one way to add some more coverage can be interacting with the environment database, or with 3rd party databases where we can retrieve or add data to bypass or to assert.

For accessing to a `Postgresql` can be used the `pg` package that is a pure *JavaScript* client with some abstractions that enables the connection and query to this type of databases. To implement this and to handle the async operation one way is to use define `Cypress tasks` in the config file and the `.then()` function to wait and use the data retrieved.

`cypress.config.ts`
```
import { Client } from 'pg';
import Query from 'pg/lib/query';

on('task', {
	async connectDB() {
		const client: typeof Client = new Client({
			host:     config.env.db_host,
			port:     config.env.db_port,
			database: config.env.db_dbname,
			user:     config.env.db_user,
			password: config.env.db_passwd,
			ssl:      true
		});

		await client.connect();

		const res: Query = await client.query('SELECT * FROM thetable order by created_at desc');

		await client.end();

		return res.rows[0];
	}
});
```

`test.cy.ts`
```
cy.visit('/');

cy.task('connectDB')
	.then((row: unknown) => {
		cy.log(row['data']);
		
		cy.get('#input')
			.type(row['data']);
	});
```

Links to the `pg` official repository are in the [Links](#links) section.

There are still some tests to be done to better understand how to implement this in real tests and how useful this can be.

There is an issue using this package related with certificates, to bypass it we can use the `NODE_TLS_REJECT_UNAUTHORIZED` environment variable. The variable should be set to `0` in the environment before stating the tests.

- `export NODE_TLS_REJECT_UNAUTHORIZED=0 && yarn cy:open:chrome`

## Contribute
If a you want to change, correct, improve the project create an `issue` in the project `Issues` screen with the proposal and the necessary documentation. If the proposal or correction has already the implementation developed link the branch with the change in the `issue`.

## Appendix

### Rules
#### indent
This rule enforces a consistent indentation style.
- error
- tab

#### linebreak-style
This rule enforces consistent line endings independent of operating system, VCS, or editor used across your codebase.
- error
- unix

#### quotes
This rule enforces the consistent use of either backticks, double, or single quotes.
- error
- single

#### semi
This rule enforces consistent use of semicolons.
- error
- always

#### camelcase
Enforce camelcase naming convention.
- error

#### curly
This rule is aimed at preventing bugs and increasing code clarity by ensuring that block statements are wrapped in curly braces. It will warn when it encounters blocks that omit curly braces.
- error
- all

#### max-len
This rule enforces a maximum line length to increase code readability and maintainability. The length of a line is defined as the number of Unicode characters in the line.
- error
- code: 150

#### no-mixed-spaces-and-tabs
This rule disallows mixed spaces and tabs for indentation.
- error

#### no-trailing-spaces
This rule disallows trailing whitespace (spaces, tabs, and other Unicode whitespace characters) at the end of lines.
- error

#### no-multiple-empty-lines
This rule aims to reduce the scrolling required when reading through your code. It will warn when the maximum amount of empty lines has been exceeded.
- error
- max: 1
- maxBOF: 0
- maxEOF: 1

#### object-curly-newline
This rule requires or disallows a line break between { and its following token, and between } and its preceding token of object literals or destructuring assignments.
- error
- multiline: true

#### @typescript-eslint/typedef
This rule can enforce type annotations in locations regardless of whether they're required. This is typically used to maintain consistency for element types that sometimes require them.
- error
- "variableDeclaration": true,
- "variableDeclarationIgnoreFunction": false,
- "arrowParameter": true,
- "parameter": true,
- "propertyDeclaration": true

#### operator-linebreak
This rule enforces a consistent linebreak style for operators.
- error
- after

#### dot-location
This rule aims to enforce newline consistency in member expressions. This rule prevents the use of mixed newlines around the dot in a member expression.
- error
- property

#### comma-spacing
This rule enforces consistent spacing before and after commas in variable declarations, array literals, object literals, function parameters, and sequences.
- error
- "before": false
- "after": true

#### func-call-spacing
This rule requires or disallows spaces between the function name and the opening parenthesis that calls it.
- error
- never

#### key-spacing
This rule enforces consistent spacing between keys and values in object literal properties. In the case of long lines, it is acceptable to add a new line wherever whitespace is allowed.
- error
- "align": "value"
- "afterColon": true

#### newline-per-chained-call
This rule requires a newline after each call in a method chain or deep member access. Computed property accesses such as instance[something] are excluded.
- error
- "ignoreChainWithDepth": 1

#### @typescript-eslint/naming-convention
Enforcing naming conventions helps keep the codebase consistent, and reduces overhead when thinking about how to name a variable.
- error
- "selector": ["variable", "function"]
- "format": ["camelCase"]
- "leadingUnderscore": "forbid"
- "trailingUnderscore": "forbid"

#### sort-imports
- error
- "ignoreCase": true,
- "ignoreDeclarationSort": false,
- "ignoreMemberSort": false,
- "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
- "allowSeparatedGroups": true

#### cypress/no-assigning-return-values
- error

#### cypress/no-unnecessary-waiting
- error

#### cypress/assertion-before-screenshot
- warn

#### cypress/no-force
- warn

#### cypress/no-async-tests
- error

#### cypress/no-pause
- error

### Links
- [Cypress](https://www.cypress.io/)
- [Cypress configuration](https://docs.cypress.io/guides/references/configuration)
- [Cypress typescript](https://docs.cypress.io/guides/tooling/typescript-support)
- [Cypress plugins](https://docs.cypress.io/plugins)
- [Cypress Environment Variables](https://docs.cypress.io/guides/guides/environment-variables)
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Typescript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/docs/latest/rules/)
- [pg](https://github.com/brianc/node-postgres)
- [pg FAQ](https://github.com/brianc/node-postgres/wiki/FAQ)

### Steps to create this proj from zero
1. yarn init
2. yarn add --dev typescript
3. yarn add --dev cypress
4. ./node_modules/cypress/bin/cypress open
5. press E2E Testing button
6. press Continue button
7. select a browser and press Start E2E Testing in ...
8. press Create new spec button
9. press Create spec, and Okay, run the spec buttons
10. yarn add --dev eslint eslint-plugin-cypress
11. npm init @eslint/config
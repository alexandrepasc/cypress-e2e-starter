# cypress-e2e-starter
- [cypress-e2e-starter](#cypress-e2e-starter)
	- [Introduction](#introduction)
	- [Getting Started](#getting-started)
	- [Build and Test](#build-and-test)
	- [Contribute](#contribute)
	- [Appendix](#appendix)
		- [Steps to create this proj from zero](#steps-to-create-this-proj-from-zero)

## Introduction
Thhe objective of this project is to have a starter project that can be used when a new `Cypress` testing project needs to be created. This can be used completelly if the new test project is independent from the development one, in the other case this can also be used as a guide.

## Getting Started
To be able to use this project [Node.js](https://nodejs.org/en) and [yarn](https://classic.yarnpkg.com/lang/en/) need to be installed. This project is done using `Typescript` so to be able to use it some knowledge of *javascript*, *typescript*, and how to use `Cypress`. All the information/intructions in this document will be using a `GNU/Linux` operating system.

## Build and Test
## Contribute
## Appendix

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

https://docs.cypress.io/guides/tooling/typescript-support
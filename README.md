# Cypress End-to-End Testing — SWE 437, Team 7

A small React + Vite login page used as the demo application for our class
presentation on **[Cypress](https://www.cypress.io/)**, and the Cypress test
suite that exercises it.

Everything here runs locally with two commands. No account, no API key, no
server of our own.

**Team:** Tur-Erdene Bekhtur · Trang Vu · Jusleen Khural · Syed Talha Shahab

---

## What Cypress is and why we chose it

Cypress is an open-source JavaScript testing framework that runs **inside the
browser**, alongside the application under test. Where Selenium sends each
command across the network to a WebDriver process, Cypress test code shares the
page's own run loop. That architecture is what gives it automatic waiting,
step-by-step time travel, and direct access to the running application.

It covers end-to-end, component, API and accessibility testing. This project
demonstrates **end-to-end testing**: driving a real browser through a real user
flow — typing into a login form and checking what the page says back.

---

## Prerequisites

| Requirement | Version used here | Check with |
|---|---|---|
| Node.js | 25.x (18+ works) | `node -v` |
| npm | 11.x | `npm -v` |

Cypress is installed as a **dev dependency**, not a production one — the app
does not need it to run, only the tests do.

---

## Quick start

```bash
git clone <this-repo-url>
cd team7-project-cypress
npm install          # installs React, Vite and Cypress
```

Then, in **two terminals**:

```bash
# terminal 1 — serve the app
npm run dev          # http://localhost:5173

# terminal 2 — open the Cypress app
npm run cy:open      # pick "E2E Testing", then a browser, then a spec
```

Or run the whole suite headlessly in one command — it starts the dev server,
runs every spec, and shuts the server down again:

```bash
npm test
```

### How this project was built from scratch

Useful for the installation section of the presentation:

```bash
npm create vite@latest team7-project-cypress -- --template react
cd team7-project-cypress
npm install
npm install cypress --save-dev    # install Cypress
npx cypress verify                # confirm the binary is usable
npx cypress open                  # Launchpad creates config + folders
```

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server on port 5173 |
| `npm run cy:open` | Open the interactive Cypress app (time travel, live reload) |
| `npm run cy:run` | Run all specs headlessly — the dev server must already be up |
| `npm test` | Start the server, run all specs, stop the server |
| `npm run build` | Production build |

---

## The demo application

A login form at `/` with deliberately simple, fully visible rules.

**Demo accounts**

| Email | Password |
|---|---|
| `student@gmu.edu` | `cypress123` |
| `team7@gmu.edu` | `swe437` |

**Behavior**

| Input | Result |
|---|---|
| Either field empty | `Email and password are required.` |
| Email with no `@` | `Please enter a valid email address.` |
| Wrong email or password | `Invalid email or password.` |
| Valid demo account | `Welcome back, <name>!` |
| Show / Hide button | Toggles the password between masked and plain text |

The login call is delayed by 600 ms (`LOGIN_DELAY_MS` in `src/auth.js`) on
purpose, so the page is genuinely asynchronous. That is what makes Cypress's
automatic waiting worth demonstrating: the tests never call `sleep()`.

### Test selectors

Every element the tests touch carries a `data-cy` attribute. Cypress
[recommends this](https://docs.cypress.io/app/core-concepts/best-practices#Selecting-Elements)
because it survives CSS and copy changes that would break a class-based selector.

| Selector | Element |
|---|---|
| `[data-cy="login-form"]` | The form |
| `[data-cy="login-heading"]` | "Sign in" heading |
| `[data-cy="email-input"]` | Email field |
| `[data-cy="password-input"]` | Password field |
| `[data-cy="toggle-password"]` | Show / Hide button |
| `[data-cy="login-button"]` | Submit button |
| `[data-cy="loading-message"]` | Shown while the login call is in flight |
| `[data-cy="error-message"]` | Validation and failure messages |
| `[data-cy="success-message"]` | Successful login message |

---

## Project layout

```
team7-project-cypress/
├── cypress.config.js              Cypress config — baseUrl, spec pattern
├── vite.config.js                 Vite config — port 5173
├── src/
│   ├── auth.js                    validateCredentials() — the logic under test
│   ├── LoginPage.jsx              the login form
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
└── cypress/
    ├── e2e/
    │   └── setup.cy.js                 smoke test — proves the setup works
    └── support/
        ├── commands.js                 add custom commands here
        └── e2e.js                      loaded before every spec
```

New spec files go in `cypress/e2e/` and must end in `.cy.js` to be picked up.

---

## Who works where

Each person writes their own spec file, so nobody edits the same file at the
same time. Create your file in `cypress/e2e/` when you start.

| Person | Role | Spec file to create |
|---|---|---|
| Tur-Erdene | Introduction, class materials, login page | `src/`, `README.md` (done) |
| Trang | Installation and setup | `cypress/e2e/setup.cy.js` (done), `cypress.config.js` |
| Jusleen | Writing tests, assertions, execution | `cypress/e2e/basic-login.cy.js` |
| Syed | Advanced testing and debugging | `cypress/e2e/advanced.cy.js` |

The login page is finished and ready to test against — see the behavior and
selector tables above for everything it does.

Suggested workflow:

```bash
git checkout -b jusleen/basic-tests    # branch named after you
# write your tests
npm test                               # confirm they pass
git add .
git commit -m "test: add basic login tests"
git push -u origin jusleen/basic-tests
```

---

## Anatomy of a test

The smoke test in `setup.cy.js`, which is as small as a Cypress test gets:

```js
describe('Cypress setup', () => {
  it('opens the homepage', () => {
    cy.visit('/')
    cy.get('body').should('be.visible')
  })
})
```

Real tests follow the same shape, structured as **Arrange–Act–Assert**: set up
the inputs, act on the page, then assert on the result.

| Code | Meaning |
|---|---|
| `describe()` | Groups related tests |
| `it()` | One individual test |
| `beforeEach()` | Runs before every test in the group |
| `cy.visit('/')` | Opens the app — relative, because `baseUrl` is set |
| `cy.get(selector)` | Selects an element, retrying until it exists |
| `.type()` / `.click()` | Act on the element |
| `.should(...)` | Assertion — retried until it passes or times out |

Cypress retries `cy.get()` and `.should()` automatically for up to 4 seconds.
That is why there is no `sleep()` anywhere even though login takes 600 ms.

---

## Seeing a test fail

Part of the presentation is showing what a failure looks like. Two kinds are
worth demonstrating, and telling them apart is one of the most useful skills in
automated testing:

1. **A wrong expectation** — assert on text the page does not show. Cypress
   prints expected vs. actual. The *test* is wrong.
2. **A bug in the app** — change something in `src/auth.js`, such as removing
   the `.trim()` call or flipping a comparison, and watch a previously passing
   test start failing. The *app* is wrong.

A third case looks like a failure but is neither: a selector that matches
nothing times out after 4 seconds. That usually means the test is out of date.

### Restoring the working version

After experimenting — breaking a test, injecting a bug into `src/auth.js`,
whatever — this puts everything back:

```bash
git restore .            # discard all local changes
```

If you have already committed something you want to undo:

```bash
git reset --hard origin/main
```

Both are safe here: there is no uncommitted work worth keeping in a demo clone.

---

## Further reading

- [Why Cypress?](https://docs.cypress.io/app/get-started/why-cypress) — architecture and key differences
- [Install Cypress](https://docs.cypress.io/app/get-started/install-cypress)
- [Writing your first test](https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test)
- [Choose a testing type](https://docs.cypress.io/app/core-concepts/testing-types) — E2E vs. component
- [Retry-ability](https://docs.cypress.io/app/core-concepts/retry-ability) — how auto-waiting works
- [Best practices](https://docs.cypress.io/app/core-concepts/best-practices) — including `data-*` selectors
- [Assertions reference](https://docs.cypress.io/app/references/assertions)

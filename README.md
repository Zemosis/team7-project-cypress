# Cypress End-to-End Testing — SWE 437, Team 7

A small React + Vite login page and a **[Cypress](https://www.cypress.io/)**
test suite that exercises it. Everything runs locally: no account, no API key,
no server of our own.

Cypress is an open-source JavaScript testing framework that runs **inside the
browser**, alongside the app under test. This project demonstrates
**end-to-end testing**: driving a real browser through a login flow and checking
what the page says back.

**Team:** Tur-Erdene Bekhtur · Trang Vu · Jusleen Khural · Syed Talha Shahab

---

## Prerequisites

| Requirement | Version | Check with |
|---|---|---|
| Node.js | 20.19+ or 22.12+ | `node -v` |
| npm | comes with Node | `npm -v` |
| Git | any recent version | `git --version` |

---

## Quick start

```bash
git clone https://github.com/Zemosis/team7-project-cypress
cd team7-project-cypress
npm install          # installs React, Vite and Cypress
```

Then, in **two terminals**:

```bash
# terminal 1: serve the app
npm run dev          # http://localhost:5173

# terminal 2: open the Cypress app
npm run cy:open      # pick "E2E Testing", then a browser, then a spec
```

Or run the whole suite headlessly in one command. It starts the dev server,
runs every spec, and shuts the server down again:

```bash
npm test
```

| Command | What it does |
|---|---|
| `npm run dev` | Start the app on port 5173 |
| `npm run cy:open` | Open the interactive Cypress app (time travel, live reload) |
| `npm run cy:run` | Run all specs headlessly (the app must already be running) |
| `npm test` | Start the app, run all specs, stop the app |

---

## The demo application

A login form at `/` with deliberately simple rules.

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

Login is delayed by 600 ms on purpose (`LOGIN_DELAY_MS` in `src/auth.js`), so
the page is genuinely asynchronous. The tests still never call `sleep()`:
Cypress waits automatically.

### Test selectors

Every element the tests touch has a `data-cy` attribute. Cypress
[recommends this](https://docs.cypress.io/app/core-concepts/best-practices#Selecting-Elements)
because it keeps working when CSS classes or wording change.

| Selector | Element |
|---|---|
| `[data-cy="login-form"]` | The form |
| `[data-cy="login-heading"]` | "Sign in" heading |
| `[data-cy="email-input"]` | Email field |
| `[data-cy="password-input"]` | Password field |
| `[data-cy="toggle-password"]` | Show / Hide button |
| `[data-cy="login-button"]` | Submit button |
| `[data-cy="loading-message"]` | Shown while login is in progress |
| `[data-cy="error-message"]` | Validation and failure messages |
| `[data-cy="success-message"]` | Successful login message |

---

## Project layout

```
team7-project-cypress/
├── cypress.config.js           Cypress config: baseUrl, spec pattern
├── vite.config.js              Vite config: port 5173
├── src/
│   ├── auth.js                 validateCredentials(): the logic under test
│   ├── LoginPage.jsx           the login form
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
└── cypress/
    ├── e2e/                    test files (specs)
    │   ├── setup.cy.js
    │   ├── basic-login.cy.js
    │   └── advanced.cy.js
    └── support/
        ├── commands.js         add custom commands here
        └── e2e.js              loaded before every spec
```

Cypress finds tests through `specPattern` in `cypress.config.js`: every file in
`cypress/e2e/` whose name ends in `.cy.js` is a spec. A new file outside that
folder, or without the `.cy.js` ending, is ignored.

---

## The example tests

| Spec | What it shows |
|---|---|
| `setup.cy.js` | Smoke tests: the app loads and the login form renders. If these fail, the problem is the setup, not the app. |
| `basic-login.cy.js` | A successful login with three assertions (loading message, welcome message, no error), then a data-driven loop over several bad logins. Includes one test that **fails on purpose** (`DEMO: fails on purpose`) so you can read a failure. |
| `advanced.cy.js` | Controlling time with `cy.clock()` and `cy.tick()`: the login button stays disabled for exactly 600 ms, then the welcome message appears. |

### Anatomy of a test

The smallest test in `setup.cy.js`:

```js
describe('Cypress setup', () => {
  it('opens the homepage', () => {
    cy.visit('/')
    cy.get('body').should('be.visible')
  })
})
```

Larger tests follow the same shape, structured as **Arrange–Act–Assert**: set up
the inputs, act on the page, then assert on the result.

| Code | Meaning |
|---|---|
| `describe()` | Groups related tests |
| `it()` | One individual test |
| `beforeEach()` | Runs before every test in the group |
| `cy.visit('/')` | Opens the app (a relative path works because `baseUrl` is set) |
| `cy.get(selector)` | Finds an element, retrying until it exists |
| `.type()` / `.click()` | Acts on the element |
| `.should(...)` | Assertion, retried until it passes or times out |

Cypress retries `cy.get()` and `.should()` for up to 4 seconds. That is why no
test needs `sleep()` even though login takes 600 ms.

---

## Seeing a test fail

There are two kinds of failure, and telling them apart is one of the most useful
skills in automated testing:

1. **The test is wrong.** It asserts on text the page never shows. Cypress
   prints expected vs. actual. The demo test in `basic-login.cy.js` is this
   kind.
2. **The app is wrong.** Change something in `src/auth.js`, such as removing a
   `.trim()` call or flipping a comparison, and a test that used to pass starts
   failing.

A selector that matches nothing times out after 4 seconds. That usually means
the test is out of date with the page, not that the app is broken.

### Restoring the working version

After experimenting, this discards all your local changes:

```bash
git restore .
```

If you also made commits you want to throw away:

```bash
git reset --hard origin/main     # deletes your local commits too
```

---

## Further reading

- [Why Cypress?](https://docs.cypress.io/app/get-started/why-cypress): architecture and key differences
- [Install Cypress](https://docs.cypress.io/app/get-started/install-cypress)
- [Writing your first test](https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test)
- [Choose a testing type](https://docs.cypress.io/app/core-concepts/testing-types): E2E vs. component
- [Retry-ability](https://docs.cypress.io/app/core-concepts/retry-ability): how auto-waiting works
- [Best practices](https://docs.cypress.io/app/core-concepts/best-practices): including `data-*` selectors
- [Assertions reference](https://docs.cypress.io/app/references/assertions)

<details>
<summary>Recreating this project from scratch</summary>

```bash
npm create vite@latest team7-project-cypress -- --template react
cd team7-project-cypress
npm install
npm install cypress --save-dev    # install Cypress as a dev dependency
npx cypress verify                # confirm Cypress is usable
npx cypress open                  # the Launchpad creates the config and folders
```

</details>

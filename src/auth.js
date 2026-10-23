// Authentication logic for the demo login page.
//
// This is deliberately a plain function with no React or network code so that
// it is easy to read during the presentation -- and easy to break on purpose
// when Person 4 demonstrates debugging a failing test.

export const DEMO_USERS = [
  { email: 'student@gmu.edu', password: 'cypress123', name: 'Student' },
  { email: 'team7@gmu.edu', password: 'swe437', name: 'Team 7' },
]

// How long a "server" round trip takes, in milliseconds. The delay is what
// lets Cypress demonstrate automatic waiting: the test never calls sleep(),
// it just asserts on the result and Cypress retries until it appears.
export const LOGIN_DELAY_MS = 600

export function validateCredentials(email, password) {
  if (!email.trim() || !password.trim()) {
    return { ok: false, message: 'Email and password are required.' }
  }

  if (!email.includes('@')) {
    return { ok: false, message: 'Please enter a valid email address.' }
  }

  const user = DEMO_USERS.find(
    (candidate) =>
      candidate.email.toLowerCase() === email.trim().toLowerCase() &&
      candidate.password === password,
  )

  if (!user) {
    return { ok: false, message: 'Invalid email or password.' }
  }

  return { ok: true, message: `Welcome back, ${user.name}!`, user }
}

// Simulates an asynchronous call to a login API.
export function login(email, password) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(validateCredentials(email, password)), LOGIN_DELAY_MS)
  })
}

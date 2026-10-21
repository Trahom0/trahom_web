// Makes the line for ADMIN_PASSWORDS (website admin at /admin) on your own computer.
// The password itself is never stored anywhere: only a one-way scrypt hash goes to Vercel.
//
//   node scripts/admin-password.mjs info@trahom.org
//
// Copy the printed line into Vercel → Settings → Environment Variables → ADMIN_PASSWORDS (Production).
// For several people, join their lines with ";".
import { randomBytes, scrypt } from 'crypto';
import readline from 'readline';

const N = 32768;
const r = 8;
const p = 1;

// One prompt for all questions. While a password is typed, only the question stays on screen (readline
// redraws the line on every key press, so the question is re-written and the typed characters are not).
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
let muted = false;
let currentQuestion = '';
rl._writeToOutput = (chunk) => {
  if (!muted) {
    rl.output.write(chunk);
  } else if (/[\r\n]$/.test(chunk)) {
    rl.output.write('\n');
  } else if (chunk.includes(currentQuestion)) {
    rl.output.write(`\r\x1b[K${currentQuestion}`);
  }
};
const ask = (question, hidden = false) =>
  new Promise((resolve) => {
    currentQuestion = question;
    muted = hidden;
    rl.question(question, (answer) => {
      muted = false;
      resolve(answer);
    });
    if (hidden) {
      rl.output.write(`\r\x1b[K${question}`);
    }
  });

const isEmail = (value) => /^[^\s@;=]+@[^\s@;=]+\.[^\s@;=]+$/.test(value);

// The email can be given directly: node scripts/admin-password.mjs info@trahom.org
let email = (process.argv[2] ?? '').trim().toLowerCase();
for (let tries = 0; !isEmail(email) && tries < 3; tries += 1) {
  // Some Windows terminals send a stray empty line first, so an empty answer is simply asked again.
  email = (await ask('Email: ')).trim().toLowerCase();
}
if (!isEmail(email)) {
  console.error('That does not look like an email address.');
  rl.close();
  process.exit(1);
}
console.log(`Email: ${email}`);

let password = '';
for (let tries = 0; !password && tries < 3; tries += 1) {
  password = await ask('Password, at least 12 characters (hidden while you type): ', true);
}
if (password.length < 12) {
  console.error('The password must be at least 12 characters.');
  rl.close();
  process.exit(1);
}
const again = await ask('Repeat the password: ', true);
if (again !== password) {
  console.error('The two passwords are different.');
  rl.close();
  process.exit(1);
}

rl.close();

const salt = randomBytes(16);
const hash = await new Promise((resolve, reject) =>
  scrypt(password.normalize('NFKC'), salt, 64, { N, r, p, maxmem: 256 * 1024 * 1024 }, (error, key) =>
    error ? reject(error) : resolve(key)
  )
);

console.log('\nCopy this whole line into ADMIN_PASSWORDS in Vercel (Production):\n');
console.log(`${email}=scrypt$${N}$${r}$${p}$${salt.toString('base64')}$${hash.toString('base64')}`);
console.log('\nThis line is not your password, but keep it private anyway.');

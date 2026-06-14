import bcrypt from 'bcryptjs';

const password = process.argv[2] || 'admin123';

const hash = await bcrypt.hash(password, 12);
console.log(`Password: ${password}`);
console.log(`Hash: ${hash}`);
console.log('\nCopy this hash into ADMIN_PASSWORD_HASH in your .env file:');
console.log(hash);

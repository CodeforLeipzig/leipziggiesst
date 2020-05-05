const fs = require('fs');
const envVars = `
# these are only generated on netlify deploy
API_KEY=${process.env.API_KEY}\n
AUTH0_DOMAIN=${process.env.AUTH0_DOMAIN}\n
AUTH0_CLIENT_ID=${process.env.AUTH0_CLIENT_ID}\n
AUTH0_AUDIENCE=${process.env.AUTH0_AUDIENCE}\n
`;
fs.writeFileSync('./.env', envVars);

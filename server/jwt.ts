let JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET) {
    throw new Error('missing JWT_SECRET in env')
}

export let jwtConfig = {
    SECRET: JWT_SECRET,
}
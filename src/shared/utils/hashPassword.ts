import * as bcrypt from 'bcrypt';

export default async function hashPassword(password: string) {
    const saltOrRounds = 10;

    const hash = await bcrypt.hash(password, saltOrRounds);

    return hash;
}

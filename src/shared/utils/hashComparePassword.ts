import * as bcrypt from 'bcrypt';

export default async function hashComparePassword(
    password: string,
    userPasswordToken: string,
) {
    const isMatch = await bcrypt.compare(password, userPasswordToken);

    return isMatch;
}

import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

function hashPassword(plainPassword) {
    return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(SALT_ROUNDS));
}

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export { hashPassword, isValidPassword }
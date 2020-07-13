/**
 * User credentials validation method
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {string} password_confirmation
 */
export const validateNewUser = (
    name,
    email,
    password,
    password_confirmation
) => {
    if (!name) return "Name field is required.";

    if (password !== password_confirmation) {
        return "Password and confirmation password must match.";
    }

    return validateCredentials(email, password);
};

export const validateCredentials = (email, password) => {
    if (!email || !password) return "Email and password fields are required.";

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return "Email does not have right format.";
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
        return "Password must contain minimum eight characters, at least one letter and one number.";
    }

    if (!(password.length >= 8)) return "Password needs at least 8 characters.";

    return null;
};
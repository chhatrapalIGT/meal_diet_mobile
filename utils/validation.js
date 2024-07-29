export const emailValidation = (value) => {
    let valid = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        valid = true;
    }
    return valid;
};

export const passwordValidation = (value) => {
    let valid = false;
    const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(value)) {
        valid = true;
    }
    return valid;
};

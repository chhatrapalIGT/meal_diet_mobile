export const getUrl = (value) => {
    switch (value) {
        case "login":
            return "auth/login";
        case "register":
            return "auth/register";
        case "change-password":
            return "auth/change-password";
        case "forgot-password":
            return "auth/forgot-password";
        case "reset-password":
            return "auth/reset-password";
        case "findDayWise":
            return "auth/findDayWise";
        case "getProfile":
            return "auth/profile";
        case "updatedProfile":
            return 'auth/updateProfile'
        default:
            break;
    }
};

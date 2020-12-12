import { Alert } from 'react-native';

export const validateEmail = (email) => {
    if (!email) {
        Alert.alert('Validation Failed', 'Please provide an email address');
        return false;
    }

    if (email.indexOf('@') < 0 || email.indexOf('.') < 0) {
        Alert.alert('Validation Failed', 'Please provide a valid email address');
        return false;
    }

    return true;
};

export const validatePassword = (password) => {
    if (!password) {
        Alert.alert('Validation Failed', 'Please provide a password');
        return false;
    }

    return true;
}

export const validatePasswordWithConfirmation = (password, passwordConfirmation) => {
    if (!password) {
        Alert.alert('Validation Failed', 'Please provide a password');
        return false;
    }

    if (password != passwordConfirmation) {
        Alert.alert('Validation Failed', 'Please check that password and confirmation match');
        return false;
    }

    return true;
};

export const validateName = (name) => {
    if (!name) {
        Alert.alert('Validation Failed', 'Please provide a name');
        return false;
    }

    return true;
};

export const validateCredentials = (email, password) => {
    return validateEmail(email)
        && validatePassword(password);
};

export const validateProfile = (email, password, passwordConfirmation, name) => {
    return validateName(name)
        && validateEmail(email)
        && validatePasswordWithConfirmation(password, passwordConfirmation);
};

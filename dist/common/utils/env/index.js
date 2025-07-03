"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvArray = exports.getEnvBoolean = exports.getEnvFloat = exports.getEnvNumber = exports.getEnvVar = void 0;
const getEnvVar = (name, defaultValue) => {
    const value = process.env[name];
    if (!value && !defaultValue) {
        throw new Error(`Environment variable ${name} is required`);
    }
    return value || defaultValue;
};
exports.getEnvVar = getEnvVar;
const getEnvNumber = (name, defaultValue) => {
    const value = process.env[name];
    if (!value && defaultValue === undefined) {
        throw new Error(`Environment variable ${name} is required`);
    }
    const numValue = value ? parseInt(value, 10) : defaultValue;
    if (isNaN(numValue)) {
        throw new Error(`Environment variable ${name} must be a valid number`);
    }
    return numValue;
};
exports.getEnvNumber = getEnvNumber;
const getEnvFloat = (name, defaultValue) => {
    const value = process.env[name];
    if (!value && defaultValue === undefined) {
        throw new Error(`Environment variable ${name} is required`);
    }
    const numValue = value ? parseFloat(value) : defaultValue;
    if (isNaN(numValue)) {
        throw new Error(`Environment variable ${name} must be a valid number`);
    }
    return numValue;
};
exports.getEnvFloat = getEnvFloat;
const getEnvBoolean = (name, defaultValue) => {
    const value = process.env[name];
    if (!value && defaultValue === undefined) {
        throw new Error(`Environment variable ${name} is required`);
    }
    if (!value)
        return defaultValue;
    const lowerValue = value.toLowerCase();
    return lowerValue === 'true' || lowerValue === '1' || lowerValue === 'yes';
};
exports.getEnvBoolean = getEnvBoolean;
const getEnvArray = (name, defaultValue) => {
    const value = (0, exports.getEnvVar)(name, defaultValue);
    return value.split(',').map(item => item.trim()).filter(item => item.length > 0);
};
exports.getEnvArray = getEnvArray;
//# sourceMappingURL=index.js.map
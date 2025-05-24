import * as jwt from "jwt-decode";

export const decodeToken = (token) => {
    if (!token) {
        throw new Error("No token provided");
    }

    const decodeFn = jwt.default || jwt.jwtDecode || jwt;

    if (typeof decodeFn !== "function") {
        throw new Error("Unable to find decode function in jwt-decode module");
    }

    return decodeFn(token);
};

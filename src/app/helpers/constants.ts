export const Constants = {
    accessTokenKey: "accessToken",
    refreshTokenKey: "refreshToken",
    refreshTokenExpiry: "refreshTokenExpiry",

    snackbarDefault: {
        actionString: "X",
        positionTop: "top",
        positionRight: "right",
    },
    gstinRegex: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/])[A-Za-z\d@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/]{8,}$/,
}

export enum DialogSizeOptions{
    small = '250px',
    medium = '300px',
    large = '350px',
}

export interface IUser {
    name: string,
    email: string,
    email_verified: boolean,
    auth_time: number,
    user_id: string,
    firebase: {
        identities: {
            email: string[]
        },
        sign_in_provider: string
    },
    iat: number,
    exp: number,
    aud: string,
    iss: string,
    sub: string,
    uid: string,
    severity: string,
    message: string,
}

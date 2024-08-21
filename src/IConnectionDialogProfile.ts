export interface IConnectionDialogProfile {
    profileName: string,
    server: string,
    authType: AuthType
    user?: string
}

export enum AuthType {
    UsernamePassword = "Username and Password",
    IntegratedAuth = "Integrated Auth",
    CertificateAuth = "Certificate Auth"
}
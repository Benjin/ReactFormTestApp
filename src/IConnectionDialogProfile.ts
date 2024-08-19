export interface IConnectionDialogProfile {
    server: string,
    authType: AuthType
    user?: string
    tenant?: string
}

export enum AuthType {
    SqlAuth = "SQL Authentication",
    IntegratedAuth = "Windows Integrated Auth",
    AzureEntra = "Azure Entra MFA"
}
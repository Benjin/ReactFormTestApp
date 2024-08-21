import "./App.css";
import { ConnectionDialog } from "./ConnectionDialog";
import {
    Dropdown,
    Option,
    FluentProvider,
    webLightTheme,
} from "@fluentui/react-components";
import { AuthType, IConnectionDialogProfile } from "./IConnectionDialogProfile";
import { useState } from "react";

const existingConnections: IConnectionDialogProfile[] = [
    {
        profileName: "Dev",
        server: "localhost",
        authType: AuthType.UsernamePassword,
    },
    {
        profileName: "Prod",
        server: "prodserver",
        authType: AuthType.CertificateAuth,
    },
];

function App() {
    const [selectedConnectionName, setSelectedConnectionName] =
        useState<string>("Dev");

    function getConnection() {
        const conn = selectedConnectionName ? existingConnections.find(c => c.profileName === selectedConnectionName) : undefined;
        return conn;
    }

    return (
        <FluentProvider theme={webLightTheme}>
            <div className="App">
                <ConnectionDialog
                    connection={ getConnection() }
                />
                {existingConnections.length > 0 && (
                    <Dropdown
                        value={selectedConnectionName}
                        onOptionSelect={(e, d) => {
                            if (d.optionValue)
                                setSelectedConnectionName(d.optionValue);
                        }}
                    >
                        {existingConnections.map((connection, index) => {
                            return (
                                <Option
                                    key={index}
                                    value={connection.profileName}
                                >
                                    {connection.profileName}
                                </Option>
                            );
                        })}
                    </Dropdown>
                )}
            </div>
        </FluentProvider>
    );
}

export default App;

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
        authType: AuthType.SqlAuth,
    },
    {
        profileName: "Prod",
        server: "prodserver",
        authType: AuthType.AzureEntra,
    },
];

function App() {
    const [selectedConnectionName, setSelectedConnectionName] =
        useState<string>("");

    return (
        <FluentProvider theme={webLightTheme}>
            <div className="App">
                <ConnectionDialog
                    connection={
                        selectedConnectionName
                            ? existingConnections.find(
                                  (c) =>
                                      c.profileName === selectedConnectionName
                              )
                            : undefined
                    }
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
                                    {connection.server}
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

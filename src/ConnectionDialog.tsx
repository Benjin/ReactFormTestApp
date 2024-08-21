import {
    Dropdown,
    Field,
    Input,
    Textarea,
    Option,
    makeStyles,
    Button,
    Dialog,
    DialogBody,
    useRestoreFocusTarget,
    DialogSurface,
    DialogTitle,
    Text,
    MessageBar,
} from "@fluentui/react-components";
import type { InputProps } from "@fluentui/react-components";
import { AuthType, IConnectionDialogProfile } from "./IConnectionDialogProfile";
import { FormAction, FormProvider, useForm, useFormDispatch } from "./Form";
import { useState } from "react";

const useStyles = makeStyles({
    root: {
        // Stack the label above the field
        display: "flex",
        flexDirection: "column",
        // Use 2px gap below the label (per the design system)
        gap: "2px",
        // Prevent the example from taking the full width of the page (optional)
        maxWidth: "400px",
    },
});

interface ConnectionDialogState {
    connection: IConnectionDialogProfile;
    errors: Partial<Record<keyof IConnectionDialogProfile, string>>;
}

function connectionDialogReducer(
    state: ConnectionDialogState,
    action: FormAction
): void {
    switch (action.action) {
        case "set": {
            if (!action.property || action.value === undefined)
                throw new Error('Action "set" requires property and value');

            state[action.property as keyof ConnectionDialogState] =
                action.value;
            break;
        }
        case "setConnectionProperty": {
            if (!action.property || action.value === undefined)
                throw new Error(
                    'Action "setConnectionProperty" requires property and value'
                );

            state.connection[
                action.property as keyof IConnectionDialogProfile
            ] = action.value;

            break;
        }
        case "validate": {
            state.errors = {};

            if (
                state.connection.server !== undefined &&
                state.connection.server.trim() === ""
            ) {
                state.errors.server = "Server is required";
            }

            if (state.connection.authType === AuthType.UsernamePassword) {
                if (
                    state.connection.user !== undefined &&
                    state.connection.user.trim() === ""
                ) {
                    state.errors.user = "Username is required";
                }
            }

            break;
        }
        default:
            console.log("Unknown action", action);
            break;
    }
}

interface ConnectionDialogProps {
    connection?: IConnectionDialogProfile;
}

function getInitialConnection(): IConnectionDialogProfile {
    return {
        profileName: "Placeholder",
        server: "placeholder.database.com",
        authType: AuthType.IntegratedAuth,
    };
}

export function ConnectionDialog({ connection }: ConnectionDialogProps) {
    const initialState: ConnectionDialogState = {
        connection: connection ?? getInitialConnection(),
        errors: {},
    };

    console.log(initialState);

    return (
        <FormProvider<ConnectionDialogState>
            initialState={initialState}
            reducer={connectionDialogReducer}
        >
            <ConnectionDialogForm />
        </FormProvider>
    );
}

export function ConnectionDialogForm(props: InputProps) {
    const state = useForm<ConnectionDialogState>();
    const dispatch = useFormDispatch();
    const styles = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const restoreFocusTargetAttribute = useRestoreFocusTarget();

    return (
        <div className={styles.root}>
            <h1>Connection Dialog</h1>

            <Field label="Server" validationMessage={state.errors.server}>
                <Input
                    value={state.connection.server}
                    onChange={(e) => {
                        dispatch({
                            action: "setConnectionProperty",
                            property: "server",
                            value: e.target.value,
                        });
                        dispatch({
                            action: "validate",
                            property: "",
                            value: undefined,
                        });
                    }}
                />
            </Field>

            <Field label="Authentication Type">
                <Dropdown
                    value={state.connection.authType}
                    onOptionSelect={(e, d) => {
                        dispatch({
                            action: "setConnectionProperty",
                            property: "authType",
                            value: d.optionValue,
                        });
                    }}
                >
                    {Object.values(AuthType).map((type) => (
                        <Option key={type}>{type}</Option>
                    ))}
                </Dropdown>
            </Field>

            {state.connection.authType === AuthType.UsernamePassword && (
                <Field label="Username" validationMessage={state.errors.user}>
                    <Input
                        value={state.connection.user ?? ""}
                        onChange={(e) => {
                            dispatch({
                                action: "setConnectionProperty",
                                property: "user",
                                value: e.target.value,
                            });
                            dispatch({
                                action: "validate",
                                property: "",
                                value: undefined,
                            });
                        }}
                    />
                </Field>
            )}

            <Button
                {...restoreFocusTargetAttribute}
                appearance="primary"
                onClick={() => {
                    setDialogOpen(true);
                }}
                disabled={Object.values(state.errors).some((error) => !!error)}
            >
                Connect
            </Button>

            <Textarea
                value={JSON.stringify(state.connection)}
                readOnly={true}
                disabled={true}
            />

            {Object.values(state.errors).length > 0 && (
                <MessageBar intent="error">
                    {Object.values(state.errors).join("\n")}
                </MessageBar>
            )}

            <Dialog
                open={dialogOpen}
                onOpenChange={(_e, data) => setDialogOpen(data.open)}
            >
                <DialogSurface>
                    <DialogTitle>Connection successful!</DialogTitle>
                    <DialogBody>
                        <Text>
                            You've connected with{" "}
                            <code>{JSON.stringify(state.connection)}</code>
                        </Text>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
        </div>
    );
}

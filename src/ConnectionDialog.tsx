import { Dropdown, Field, Input, Textarea, Option, makeStyles, Button } from "@fluentui/react-components";
import type { InputProps } from "@fluentui/react-components";
import { useConnection, useConnectionDispatch } from "./ConnectionContext";
import { AuthType, IConnectionDialogProfile } from "./IConnectionDialogProfile";
import { FormAction, FormProvider, useForm, useFormDispatch } from "./Form";

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

  const initialConnectionProfile: IConnectionDialogProfile = {
    server: "benjin.database.windows.net",
    authType: AuthType.SqlAuth
  };
  
  function formReducer<T>(formData: T, action: FormAction): T {
    switch (action.type) {
      case 'set': {
        if (!action.property || action.value === undefined) throw new Error('Action "set" requires property and value');
        
        const output: T = {
         ...formData,
         [action.property]: action.value
        } ;      
  
        return output;
      }
      default:
        return formData;
    }
  }

export function ConnectionDialog() {
    return (
        <FormProvider initialState={initialConnectionProfile} reducer={ formReducer }>
            <ConnectionDialogForm />
        </FormProvider>
    )
}

export function ConnectionDialogForm(props: InputProps) {
    const connection = useForm<IConnectionDialogProfile>();
    const dispatch = useFormDispatch();
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <h1>Connection Dialog</h1>
            
            <Field
                label="Server"
            >
                <Input
                    value={connection.server}
                    onChange={e => {
                        dispatch({
                            type: "set",
                            property: "server",
                            value: e.target.value
                        })
                    }}
                />
            </Field>

            
            <Field
                label="Authentication Type"
            >
                <Dropdown
                    value={connection.authType}
                    onOptionSelect={(e, d) => {
                        dispatch({
                            type: "set",
                            property: "authType",
                            value: d.optionValue
                        })
                    }}
                >
                    {Object.values(AuthType).map((type) => (<Option key={type}>{type}</Option>))}
                </Dropdown>
            </Field>

            {
                connection.authType === AuthType.SqlAuth &&
                    <Field
                    label="Username"
                >
                    <Input
                        value={connection.user}
                        onChange={e => {
                            dispatch({
                                type: "set",
                                property: "user",
                                value: e.target.value
                            })
                        }}
                    />
                </Field>
            }
            {
                connection.authType === AuthType.AzureEntra &&
                <Field
                    label="Tenant"
                >
                    <Dropdown
                        value={connection.tenant}
                        onOptionSelect={(e, d) => {
                            dispatch({
                                type: "set",
                                property: "tenant",
                                value: d.optionValue
                            })
                        }}
                    >
                        {["Corp tenant", "Personal tenant", "AME tenant"].map((type) => (<Option key={type}>{type}</Option>))}
                    </Dropdown>
                </Field>
            }

            <Button>
                Connect
            </Button>

            <Textarea
                value={JSON.stringify(connection)}
                readOnly={true}
                disabled={true}
            />
        </div>
    );
}
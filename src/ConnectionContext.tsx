import { createContext, useContext, useReducer, ReactNode } from 'react';
import { AuthType, IConnectionDialogProfile } from './IConnectionDialogProfile';

interface Action {
  type: 'set';
  property: string;
  value: any;
}

const ConnectionContext = createContext<IConnectionDialogProfile | null>(null);

const ConnectionDispatchContext = createContext<React.Dispatch<Action> | null>(null);

export function ConnectionProvider({ children }: { children: ReactNode }) {
  const [connection, dispatch] = useReducer(connectionReducer, initialConnectionProfile);

  return (
    <ConnectionContext.Provider value={connection}>
      <ConnectionDispatchContext.Provider value={dispatch}>
        {children}
      </ConnectionDispatchContext.Provider>
    </ConnectionContext.Provider>
  );
}

export function useConnection() {
  const context = useContext(ConnectionContext);
  if (context === null) throw new Error('useConnection must be used within a ConnectionProvider');
  return context;
}

export function useConnectionDispatch() {
  const context = useContext(ConnectionDispatchContext);
  if (context === null) throw new Error('useConnectionDispatch must be used within a ConnectionProvider');
  return context;
}

function connectionReducer(connection: IConnectionDialogProfile, action: Action): IConnectionDialogProfile {
  switch (action.type) {
    case 'set': {
      if (!action.property || action.value === undefined) throw new Error('Action "set" requires property and value');
      
      const output: IConnectionDialogProfile = {
       ...connection,
       [action.property]: action.value
      } ;      

      return output;
    }
    default:
      return connection;
  }
}

const initialConnectionProfile: IConnectionDialogProfile = {
    server: '',
    authType: AuthType.SqlAuth
};
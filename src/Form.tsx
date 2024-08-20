import { createContext, useContext, useReducer, ReactNode } from 'react';

const FormContext = createContext<any | null>(null);

const FormDispatchContext = createContext<React.Dispatch<FormAction> | null>(null);

export interface FormAction {
    type: 'set';
    property: string;
    value: any;
  }

interface FormProviderProps<T> {
    initialState: T;
    reducer: (state: T, action: FormAction) => T;
    children: ReactNode;
  }

export function FormProvider<T>({ initialState, reducer, children }: FormProviderProps<T>) {
  const [formData, dispatch] = useReducer(reducer, initialState);

  return (
    <FormContext.Provider value={formData}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  );
}

export function useForm<T>() {
  const context = useContext<T>(FormContext);
  if (context === null) throw new Error('useForm must be used within a FormProvider');
  return context;
}

export function useFormDispatch() {
  const context = useContext(FormDispatchContext);
  if (context === null) throw new Error('useFormDispatch must be used within a FormProvider');
  return context;
}


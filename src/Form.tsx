import { createContext, useContext, ReactNode } from 'react';
import { ImmerReducer, useImmerReducer } from 'use-immer';

const FormContext = createContext<any | null>(null);

const FormDispatchContext = createContext<React.Dispatch<FormAction> | null>(null);

export interface FormAction {
    action: string;
    property: string;
    value: any;
  }

interface FormProviderProps<TState> {
    initialState: TState;
    reducer: ImmerReducer<TState, FormAction>;
    children: ReactNode;
}

export function FormProvider<TState>({ initialState, reducer, children }: FormProviderProps<TState>) {
  const [formData, dispatch] = useImmerReducer(reducer, initialState);

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


import './App.css';
import { ConnectionDialog } from './ConnectionDialog';
import { ConnectionProvider } from './ConnectionContext';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <div className="App">
        Hello!
        <ConnectionProvider>
          <ConnectionDialog />
        </ConnectionProvider>
      </div>
    </FluentProvider>
  );
}

export default App;

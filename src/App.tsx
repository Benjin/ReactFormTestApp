import './App.css';
import { ConnectionDialog } from './ConnectionDialog';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <div className="App">
        <ConnectionDialog />
      </div>
    </FluentProvider>
  );
}

export default App;

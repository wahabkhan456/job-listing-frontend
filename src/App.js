import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Routes from "./routes";
import { Provider } from 'react-redux'
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store} >
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
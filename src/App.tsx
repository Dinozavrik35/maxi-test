import { Provider } from "react-redux";
import UserList from "./components/UserList";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <UserList />
    </Provider>
  );
}

export default App;

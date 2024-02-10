import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { App as AntdApp } from "antd";
import { store } from "./store/store";
import Users from "./pages/Users";

const GlobalStyles = createGlobalStyle`
  * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
  }

  body {
    overflow-x: hidden;
  }

  .ant-notification-notice-message {
    margin-bottom: 0 !important;
  }
`;

function App() {
    return (
      <AntdApp>
        <GlobalStyles />
        <Provider store={store}>
            <Users />
        </Provider>
      </AntdApp>
    );
}

export default App;

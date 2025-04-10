import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import App from "./App";
import './i18n/config';

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

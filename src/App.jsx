import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import store from "./utils/store";
import Requests from "./components/Requests";
import Connections from "./components/Connections";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Body />}>
                        <Route path="/" element={<Feed />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/requests" element={<Requests />} />
                        <Route path="/connections" element={<Connections />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;

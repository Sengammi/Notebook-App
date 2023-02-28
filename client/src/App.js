import './App.css';
import Header from "./components/Header";
import {BrowserRouter} from "react-router-dom";
import {UseRoutes} from "./RoutesPages"
import { AuthContext } from "./context/auth.context";
import { useAuth } from "./hooks/auth.hook"

const App = () =>  {
    const { login, logout, token, userId, isReady } = useAuth()
    const isLogin = !!token
    const routes = UseRoutes(isLogin);


    return (
    <AuthContext.Provider value={{ login, logout, token, userId, isReady, isLogin }}>
        <div className="App">
            <BrowserRouter>
                <Header />
                {routes}
            </BrowserRouter>
        </div>
    </AuthContext.Provider>
);
}

export default App;

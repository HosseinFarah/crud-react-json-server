import { BrowserRouter as Router ,Routes,Route } from "react-router-dom";
import App from './App.jsx';
import User from './User.jsx';
import Countries from './Countries.jsx';
import CountryInfo from './CountryInfo.jsx';

const routes = (
    <Router>
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:name" element={<CountryInfo />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    </Router>
    );

export default routes;
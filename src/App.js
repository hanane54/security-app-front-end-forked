import "./App.css";
import ClientPage from "./pages/ClientPage";
import { Routes, Route } from "react-router-dom";
import OrderPage from "./pages/OrderPage";
import HomePage from "./pages/HomePage";
import ClientOrdersPage from "./pages/ClientOrdersPage";
import EmissionPage from "./pages/EmissionPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/clients" element={<ClientPage />} />
      <Route path="/orders" element={<OrderPage />} />
      <Route path="/clients-orders" element={<ClientOrdersPage />} />
      <Route path="/emission" element={<EmissionPage />} />
    </Routes>
  );
}

export default App;

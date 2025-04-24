import './App.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Documents from "./pages/Documents.jsx";
import Clients from "./pages/Clients.jsx";
import Destinations from "./pages/Destinations.jsx";
import Reports from "./pages/Reports.jsx";
import Misc from "./pages/Misc.jsx";
import Header from "./tags/Header.jsx";
import Footer from "./tags/Footer.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/docs", element: <Documents /> },
  { path: "/clients", element: <Clients /> },
  { path: "/destinations", element: <Destinations /> },
  { path: "/reports", element: <Reports /> },
  { path: "/misc", element: <Misc /> },
]);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;


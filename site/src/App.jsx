import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import useStore from "./store";
import LoginPage from "./pages/Login";
import ChatApp from "./pages/Chat";

function App() {
  const userName = useStore((state) => state.userName);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/chat"
          element={userName ? <ChatApp /> : <LoginPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;

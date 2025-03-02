import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import MessageScannerPage from "./pages/MessageScannerPage";
import WebsiteScannerPage from "./pages/WebsiteScannerPage";
import EmailAnalysisPage from "./pages/EmailAnalysisPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="message-scanner" element={<MessageScannerPage />} />
        <Route path="website-scanner" element={<WebsiteScannerPage />} />
        <Route path="email-analysis" element={<EmailAnalysisPage />} />
      </Route>
    </Routes>
  );
}

export default App;
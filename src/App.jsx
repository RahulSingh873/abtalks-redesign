import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DemoStateProvider } from "./lib/DemoStateContext";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ChallengeDay from "./pages/ChallengeDay";

export default function App() {
  return (
    <DemoStateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/day/:dayNumber" element={<ChallengeDay />} />
        </Routes>
      </BrowserRouter>
    </DemoStateProvider>
  );
}

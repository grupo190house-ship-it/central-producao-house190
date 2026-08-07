import "@/App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import GeneratorPage from "@/pages/GeneratorPage";
import HistoryPage from "@/pages/HistoryPage";
import ManagePage from "@/pages/ManagePage";
import { Printer, History, Settings } from "lucide-react";

const NAV = [
  { to: "/", label: "Gerar", icon: Printer, end: true, testId: "nav-gerar" },
  { to: "/historico", label: "Histórico", icon: History, testId: "nav-historico" },
  { to: "/cadastros", label: "Cadastros", icon: Settings, testId: "nav-cadastros" },
];

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-20 no-print">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-black text-white rounded-md flex items-center justify-center font-black text-sm tracking-tight">
              H190
            </div>
            <div>
              <div className="text-base font-bold tracking-tight text-zinc-900 leading-none">HOUSE190</div>
              <div className="text-[11px] uppercase tracking-widest text-zinc-500">Central de Produção</div>
            </div>
          </div>
          <nav className="flex items-center gap-1">
            {NAV.map(({ to, label, icon: Icon, end, testId }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                data-testid={testId}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? "bg-black text-white" : "text-zinc-600 hover:bg-zinc-100"
                  }`
                }
              >
                <Icon className="w-4 h-4" /> {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-5 py-6 no-print">{children}</main>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<GeneratorPage />} />
            <Route path="/historico" element={<HistoryPage />} />
            <Route path="/cadastros" element={<ManagePage />} />
          </Routes>
        </Shell>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;

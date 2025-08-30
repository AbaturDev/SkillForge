import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Layout } from "./Layout";
import { Skills } from "./pages/Skills";
import { SkillDetails } from "./pages/Skill.Details";
import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/skills/:id" element={<SkillDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

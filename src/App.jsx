import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Probleme from "./pages/Probleme";
import Solution from "./pages/Solution";
import Equipe from "./pages/Equipe";
import Telecharger from "./pages/Telecharger";
import Contact from "./pages/Contact";
import { LanguageProvider } from "./context/LanguageContext";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      window.setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo(0, 0);
        }
      }, 0);
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const Layout = ({ children }) => (
  <div className="bg-ink w-full overflow-x-hidden min-h-screen flex flex-col font-body">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

const App = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/probleme" element={<Probleme />} />
            <Route path="/solution" element={<Solution />} />
            <Route path="/equipe" element={<Equipe />} />
            <Route path="/telecharger" element={<Telecharger />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;

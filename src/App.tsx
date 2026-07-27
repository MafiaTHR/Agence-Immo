import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Tarifs from './pages/Tarifs';
import Catalogue from './pages/Catalogue';
import CategoryPage from './pages/CategoryPage';
import PropertyDetail from './pages/PropertyDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import NotFound from './pages/NotFound';

// CategoryPage garde un état interne (filtres, prix max) initialisé une seule
// fois au montage. Comme React Router réutilise la même instance du composant
// en changeant simplement l'URL entre /catalogue/x et /catalogue/y, cet état
// restait figé sur l'ancienne catégorie tant que la page n'était pas rechargée.
// Ce wrapper force un remontage complet à chaque changement de catégorie.
function CategoryPageRoute() {
  const { categorie } = useParams<{ categorie: string }>();
  return <CategoryPage key={categorie} />;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="grain-overlay" aria-hidden="true" />
      <div className="flex min-h-screen flex-col">
        <Header />
        <ScrollToTop />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tarifs" element={<Tarifs />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/catalogue/:categorie" element={<CategoryPageRoute />} />
            <Route path="/bien/:slug" element={<PropertyDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

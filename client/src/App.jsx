import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PlaygroundDecor } from './components/PlaygroundDecor';

import { HomePage } from './pages/HomePage';
import { DocumentsPage } from './pages/DocumentsPage';
import { ServicesPage } from './pages/ServicesPage';
import { PlaygroundZone } from './pages/PlaygroundZone';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-shell selection:bg-amber-200 selection:text-amber-950">
          <PlaygroundDecor />
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/docs" element={<DocumentsPage />} />
              <Route path="/docs/:slug" element={<DocumentsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/kid-zone" element={<PlaygroundZone />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

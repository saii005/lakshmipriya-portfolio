import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const mainNav = [
    { name: 'Overview', path: '/' },
    { name: 'Seminars', path: '/services' },
    { name: 'Presentations', path: '/docs' },
    { name: 'Wonder Lab', path: '/kid-zone' },
  ];

  const audienceLinks = [
    { name: 'Students', path: '/services?category=Student+Seminars+%26+Bootcamps' },
    { name: 'Teens & Youth', path: '/services?category=Teens+%26+College+Students' },
    { name: 'Schools & Educators', path: '/services?category=Schools+%26+Educational+Institutions' },
    { name: 'Parents & Families', path: '/services?category=Parents+%26+Families' },
    { name: 'Holistic Wellness', path: '/services?category=Holistic+Wellness+%26+Leaders' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0] border-b border-[#DED8CD]">
      {/* Primary Header Row */}
      <div className="shell h-20 flex items-center justify-between gap-4">
        {/* Editorial Identity */}
        <Link to="/" className="flex flex-col leading-tight group">
          <span className="font-serif text-[1.45rem] sm:text-[1.6rem] text-[#2A302D] tracking-[-0.02em] group-hover:text-[#9D5A41] transition-colors">
            Lakshmipriya Vinothkumar
          </span>
          <span className="text-[0.62rem] font-bold tracking-[0.19em] uppercase text-[#9D5A41] mt-1">
            Mind Education &bull; Take Your Flight
          </span>
        </Link>

        {/* Desktop Primary Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[0.86rem] font-semibold text-[#2A302D]" aria-label="Main navigation">
          {mainNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `py-1 transition-colors hover:text-[#9D5A41] ${
                  isActive ? 'text-[#9D5A41] border-b border-[#9D5A41]' : ''
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <div className="flex items-center gap-4 pl-2 border-l border-[#DED8CD]">
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `py-1 transition-colors hover:text-[#9D5A41] ${
                    isActive ? 'text-[#9D5A41] border-b border-[#9D5A41]' : ''
                  }`
                }
              >
                Admin Desk
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-[#59625B] hover:text-[#9D5A41] transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <NavLink
              to="/admin/login"
              className={({ isActive }) =>
                `py-1 text-[#59625B] hover:text-[#9D5A41] transition-colors ${
                  isActive ? 'text-[#9D5A41] border-b border-[#9D5A41]' : ''
                }`
              }
            >
              Portal
            </NavLink>
          )}

          <Link
            to="/contact"
            className="border-b border-[#9D5A41] pb-1 text-[#2A302D] hover:text-[#9D5A41] transition-colors"
          >
            Book a seminar &#8599;
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          className="md:hidden px-3 py-2 text-sm font-semibold text-[#2A302D]"
        >
          Menu <span className="ml-1.5">{mobileMenuOpen ? '×' : '☰'}</span>
        </button>
      </div>

      {/* Audience Strip (Matching Reference Site's Secondary Editorial Nav) */}
      <nav
        className="border-t border-[#DED8CD] bg-[#F7F2E9]"
        aria-label="Explore by audience"
      >
        <div className="shell flex items-center justify-between gap-6 overflow-x-auto py-0">
          {audienceLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="py-3 font-serif text-[1.08rem] sm:text-[1.18rem] text-[#2A302D] hover:text-[#9D5A41] whitespace-nowrap transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F0] border-t border-[#DED8CD] px-6 py-6 space-y-4 shadow-md">
          <div className="flex flex-col space-y-3 text-base font-semibold">
            {mainNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#2A302D] hover:text-[#9D5A41] py-1"
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#3D4A3D] py-1"
                >
                  Admin Desk
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-[#9D5A41] py-1"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#59625B] py-1"
              >
                Teacher Portal
              </Link>
            )}
          </div>
          <div className="pt-3 border-t border-[#DED8CD]">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="solid-btn w-full"
            >
              Book a seminar <span>&#8599;</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

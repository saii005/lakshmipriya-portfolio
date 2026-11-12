import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#344438] text-[#F8F5EB] py-16 border-t border-[#243529]">
      <div className="shell">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#4A5E4F]">
          
          {/* Column 1: Identity */}
          <div className="md:col-span-5 space-y-3">
            <Link to="/" className="font-serif text-2xl text-[#FAF7F0] hover:text-[#E8CBB1] transition-colors inline-block">
              Lakshmipriya Vinothkumar
            </Link>
            <p className="text-xs uppercase tracking-[0.16em] text-[#E8CBB1] font-semibold">
              Founder, Take Your Flight &bull; Co-Founder, self to Self
            </p>
            <p className="text-sm text-[#C7D2C6] leading-relaxed max-w-md pt-1">
              Empowering students, educational institutions, and families through mind education, cognitive clarity, and integral human development.
            </p>
          </div>

          {/* Column 2: Offerings */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] font-bold text-[#E8CBB1]">
              Offerings
            </p>
            <ul className="space-y-2 text-sm text-[#DCE5DB]">
              <li>
                <Link to="/" className="hover:text-[#E8CBB1] transition-colors">Overview</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#E8CBB1] transition-colors">Seminars &amp; Masterclasses</Link>
              </li>
              <li>
                <Link to="/docs" className="hover:text-[#E8CBB1] transition-colors">Presentation Decks</Link>
              </li>
              <li>
                <Link to="/kid-zone" className="hover:text-[#E8CBB1] transition-colors">Student Wonder Lab</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#E8CBB1] transition-colors">Book a Seminar</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Correspondence */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] font-bold text-[#E8CBB1]">
              Correspondence
            </p>
            <div className="space-y-2 text-sm text-[#C7D2C6]">
              <p>
                <a href="mailto:reachtolakshmipriya@gmail.com" className="text-[#FAF7F0] hover:text-[#E8CBB1] underline underline-offset-4">
                  reachtolakshmipriya@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+917650992525" className="hover:text-[#FAF7F0]">+91 7650992525</a>
                {' '}&bull;{' '}
                <a href="tel:+919790662672" className="hover:text-[#FAF7F0]">+91 9790662672</a>
              </p>
              <p className="text-xs leading-relaxed pt-1">
                Pondicherry &bull; Chennai &bull; Coimbatore &bull; Bangalore<br />
                Available globally online &amp; in-person by arrangement.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Academic Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#C7D2C6]">
          <p>&copy; {new Date().getFullYear()} Lakshmipriya Vinothkumar. All rights reserved.</p>
          <p>M.Sc. Psychology &bull; MBA (HR) &bull; B.E. EEE &bull; Uni5 (USA) Board of Directors</p>
        </div>
      </div>
    </footer>
  );
};

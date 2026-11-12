import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/client';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

export const DocumentsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(null);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await api.get('/documents');
        if (res.data?.success && res.data.data.length > 0) {
          setDocuments(res.data.data);
          if (slug) {
            const found = res.data.data.find((d) => d.slug === slug);
            setCurrentDoc(found || res.data.data[0]);
          } else {
            setCurrentDoc(res.data.data[0]);
            navigate(`/docs/${res.data.data[0].slug}`, { replace: true });
          }
        }
      } catch (err) {
        console.error('Failed to load documents:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, [slug]);

  useEffect(() => {
    if (documents.length > 0 && slug) {
      const found = documents.find((d) => d.slug === slug);
      if (found) {
        setCurrentDoc(found);
        setCurrentSlideIndex(0);
        setActiveHighlight(null);
      }
    }
  }, [slug, documents]);

  const slides = currentDoc?.slides || [];
  const currentSlide = slides[currentSlideIndex];
  const progressPercent = slides.length > 0 ? ((currentSlideIndex + 1) / slides.length) * 100 : 0;

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      setActiveHighlight(null);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      setActiveHighlight(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <p className="font-serif italic text-xl text-[#59625B]">Loading presentation decks...</p>
      </div>
    );
  }

  return (
    <div className={fullscreen ? 'fixed inset-0 z-50 bg-[#FAF7F0] overflow-y-auto' : ''}>
      {/* Top Editorial Header */}
      <section className="bg-[#EEE6D9] border-b border-[#DED8CD] py-10 lg:py-14">
        <div className="shell flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="kicker">
              Interactive Presentation Deck &bull; {currentDoc?.category || 'Archive'}
            </p>
            <h1 className="font-serif text-[clamp(1.85rem,3.6vw,3rem)] leading-[1.12] text-[#2A302D]">
              {currentDoc?.title || 'Keynote Presentation Decks'}
            </h1>
          </div>

          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="outline-btn py-2.5 px-4 text-xs self-start sm:self-auto shrink-0"
          >
            {fullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{fullscreen ? 'Exit Presenter Mode' : 'Presenter Mode'}</span>
          </button>
        </div>
      </section>

      {/* Deck Body */}
      <section className="py-12 lg:py-16">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Sidebar: Library & Sections */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#F7F2E9] border border-[#DED8CD] p-6 space-y-4">
              <p className="kicker">Document Decks Library</p>
              <div className="divide-y divide-[#DED8CD] border-t border-[#DED8CD]">
                {documents.map((doc) => {
                  const isActive = doc.slug === currentDoc?.slug;
                  return (
                    <Link
                      key={doc.slug}
                      to={`/docs/${doc.slug}`}
                      className={`block py-3.5 transition-colors ${
                        isActive ? 'text-[#9D5A41]' : 'text-[#2A302D] hover:text-[#9D5A41]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] text-[#59625B] mb-1">
                        <span>{doc.category}</span>
                        <span>{doc.slides?.length || 0} Slides</span>
                      </div>
                      <p className={`font-serif text-lg leading-snug ${isActive ? 'italic underline underline-offset-4' : ''}`}>
                        {doc.title}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>

            {slides.length > 0 && (
              <div className="bg-[#FAF7F0] border border-[#DED8CD] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="kicker">Deck Sections</p>
                  <span className="text-xs font-semibold text-[#59625B]">
                    {currentSlideIndex + 1} / {slides.length}
                  </span>
                </div>
                <div className="space-y-1">
                  {slides.map((slide, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentSlideIndex(idx);
                        setActiveHighlight(null);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center gap-3 transition-colors cursor-pointer border-l-2 ${
                        currentSlideIndex === idx
                          ? 'border-[#9D5A41] bg-[#F0E9DC] text-[#2A302D] font-semibold'
                          : 'border-transparent text-[#59625B] hover:text-[#2A302D] hover:bg-[#F7F2E9]'
                      }`}
                    >
                      <span className="text-[11px] font-bold text-[#9D5A41] w-5 shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="truncate">{slide.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-[#F0E9DC] border border-[#DED8CD] p-5 text-xs text-[#59625B] leading-relaxed">
              <p className="kicker mb-1.5">Presenter Tip</p>
              Click any numbered point on the slide to highlight it during classroom seminars or parent orientations.
            </div>
          </aside>

          {/* Right Main Column: Slide Reader */}
          <main className="lg:col-span-8 space-y-6">
            {/* Hairline Progress Bar */}
            <div className="bg-[#DED8CD] h-1 w-full">
              <div
                className="bg-[#3D4A3D] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {currentSlide ? (
              <div className="bg-[#FAF7F0] border border-[#DED8CD] p-8 sm:p-12 space-y-8">
                {/* Slide Header */}
                <div className="space-y-3 pb-6 border-b border-[#DED8CD]">
                  <div className="flex items-center justify-between">
                    <span className="kicker">
                      Slide {currentSlide.slideNumber || currentSlideIndex + 1} of {slides.length}
                    </span>
                    <span className="text-xs text-[#59625B] italic font-serif">
                      {currentDoc?.badge}
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#2A302D] leading-tight">
                    {currentSlide.title}
                  </h2>
                  {currentSlide.subtitle && (
                    <p className="text-base text-[#59625B] leading-relaxed">
                      {currentSlide.subtitle}
                    </p>
                  )}
                </div>

                {/* Bullet Points */}
                <div className="space-y-3">
                  <p className="kicker">Core Insights &amp; Principles</p>
                  <div className="divide-y divide-[#DED8CD] border-y border-[#DED8CD]">
                    {currentSlide.bulletPoints?.map((bp, i) => {
                      const isSelected = activeHighlight === i;
                      return (
                        <div
                          key={i}
                          onClick={() => setActiveHighlight(isSelected ? null : i)}
                          className={`py-4 px-3 flex items-start gap-4 cursor-pointer transition-colors ${
                            isSelected ? 'bg-[#F0E9DC]' : 'hover:bg-[#F7F2E9]'
                          }`}
                        >
                          <span
                            className={`text-xs font-bold pt-0.5 shrink-0 ${
                              isSelected ? 'text-[#9D5A41]' : 'text-[#59625B]'
                            }`}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className={`text-sm sm:text-base leading-relaxed ${isSelected ? 'text-[#2A302D] font-medium' : 'text-[#3E4540]'}`}>
                            {bp}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quote */}
                {currentSlide.quote && (
                  <blockquote className="bg-[#F7F2E9] border-l-2 border-[#9D5A41] px-6 py-5 font-serif italic text-xl text-[#2A302D] leading-relaxed">
                    &ldquo;{currentSlide.quote}&rdquo;
                  </blockquote>
                )}

                {/* Tags */}
                {currentSlide.tags?.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#59625B]">
                    {currentSlide.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="border border-[#DED8CD] px-3 py-1 bg-[#F7F2E9]">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Navigation */}
                <div className="pt-6 border-t border-[#DED8CD] flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={handlePrevSlide}
                    disabled={currentSlideIndex === 0}
                    className="outline-btn py-3 px-5 text-xs disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  {currentSlideIndex === slides.length - 1 ? (
                    <Link to="/contact" className="solid-btn py-3 px-6 text-xs">
                      Book a seminar on this topic <span>&#8599;</span>
                    </Link>
                  ) : (
                    <button onClick={handleNextSlide} className="solid-btn py-3 px-6 text-xs">
                      <span>Next Slide</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="border border-[#DED8CD] p-12 text-center font-serif italic text-xl text-[#59625B]">
                No slides available in this deck.
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  );
};

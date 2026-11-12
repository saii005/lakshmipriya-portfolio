import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/client';
import { Search, X } from 'lucide-react';

export const ServicesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Inquiry Modal state
  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'School Administrator',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: null });

  const categories = [
    'All',
    'Student Seminars & Bootcamps',
    'Teens & College Students',
    'Schools & Educational Institutions',
    'Parents & Families',
    'Holistic Wellness & Leaders',
    'Women Empowerment',
  ];

  useEffect(() => {
    const paramCat = searchParams.get('category');
    if (paramCat && categories.includes(paramCat)) {
      setSelectedCategory(paramCat);
    } else if (!paramCat) {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        if (res.data?.success) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      service.title.toLowerCase().includes(q) ||
      service.description.toLowerCase().includes(q) ||
      service.tagline.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleOpenInquiry = (service) => {
    setSelectedServiceForModal(service);
    setFormData((prev) => ({
      ...prev,
      subject: `Booking / Inquiry for "${service.title}"`,
      message: `Hello Lakshmipriya, we are interested in scheduling "${service.title}" for our institution/cohort. Please share available dates and format.`,
    }));
    setFormStatus({ submitting: false, success: false, error: null });
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: null });
    try {
      const res = await api.post('/inquiries', {
        ...formData,
        serviceInterested: selectedServiceForModal?.title || 'General Seminar Inquiry',
      });
      if (res.data?.success) {
        setFormStatus({ submitting: false, success: true, error: null });
        setTimeout(() => {
          setSelectedServiceForModal(null);
          setFormData({
            name: '',
            email: '',
            phone: '',
            role: 'School Administrator',
            subject: '',
            message: '',
          });
          setFormStatus({ submitting: false, success: false, error: null });
        }, 2200);
      }
    } catch (err) {
      setFormStatus({
        submitting: false,
        success: false,
        error: err.response?.data?.message || 'Failed to submit inquiry. Please try again.',
      });
    }
  };

  return (
    <div>
      {/* Classic Detail Hero */}
      <section className="bg-[#EEE6D9] border-b border-[#DED8CD] py-16 lg:py-24">
        <div className="shell max-w-[1050px] space-y-6">
          <p className="kicker">Active Seminar Catalog &amp; Masterclasses</p>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,4.3rem)] leading-[1.1] tracking-[-0.03em] text-[#2A302D] max-w-[820px]">
            Signature seminars &amp; <em>curricular masterclasses.</em>
          </h1>
          <p className="text-[1.08rem] text-[#59625B] max-w-[660px] leading-relaxed">
            Designed by Lakshmipriya Vinothkumar to awaken cognitive potential, dissolve math anxiety, and equip institutions with transformative pedagogical frameworks.
          </p>
        </div>
      </section>

      {/* Filter & Catalog */}
      <section className="py-16 lg:py-20">
        <div className="shell space-y-12">
          {/* Classic Filter Bar */}
          <div className="border-y border-[#DED8CD] py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="flex items-center gap-5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-sm font-medium pb-1 transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'text-[#9D5A41] border-b border-[#9D5A41] font-semibold'
                      : 'text-[#59625B] hover:text-[#2A302D]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="w-4 h-4 text-[#59625B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search seminars & topics..."
                className="form-control-input pl-10 py-2.5 text-sm"
              />
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="py-20 text-center font-serif italic text-xl text-[#59625B]">
              Loading seminar catalog...
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="border border-[#DED8CD] bg-[#F7F2E9] p-12 text-center space-y-2">
              <h3 className="font-serif text-2xl text-[#2A302D]">No seminars found</h3>
              <p className="text-sm text-[#59625B]">
                Try selecting &ldquo;All&rdquo; or clearing your search keywords.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <article
                  key={service._id}
                  className="bg-[#FAF7F0] border border-[#DED8CD] p-7 flex flex-col justify-between hover:border-[#9D5A41] transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 border-b border-[#DED8CD] pb-3">
                      <span className="kicker">
                        {String(index + 1).padStart(2, '0')} &bull; {service.badge || 'Program'}
                      </span>
                      <span className="text-xs text-[#59625B]">{service.duration}</span>
                    </div>

                    <div>
                      <p className="text-[0.72rem] uppercase tracking-[0.12em] text-[#59625B] mb-1">
                        {service.category}
                      </p>
                      <h2 className="font-serif text-2xl text-[#2A302D] leading-snug">
                        {service.title}
                      </h2>
                      <p className="font-serif italic text-sm text-[#9D5A41] mt-1.5">
                        &ldquo;{service.tagline}&rdquo;
                      </p>
                    </div>

                    <p className="text-sm text-[#59625B] leading-relaxed">
                      {service.description}
                    </p>

                    {service.highlights?.length > 0 && (
                      <div className="bg-[#F7F2E9] border border-[#DED8CD] p-4 space-y-2">
                        <p className="kicker">Takeaways</p>
                        <ul className="space-y-1.5 text-xs text-[#2A302D]">
                          {service.highlights.slice(0, 3).map((hl, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#9D5A41]">&mdash;</span>
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#DED8CD] space-y-4">
                    <p className="text-xs text-[#59625B]">
                      <strong className="text-[#2A302D]">Audience:</strong> {service.audience}
                    </p>
                    <button
                      onClick={() => handleOpenInquiry(service)}
                      className="solid-btn w-full"
                    >
                      Book seminar / syllabus <span>&#8599;</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Institutional Roles Band */}
      <section className="bg-[#E9E6D9] border-t border-[#DED8CD] py-16 lg:py-24">
        <div className="shell space-y-10">
          <div className="space-y-2 max-w-2xl">
            <p className="kicker">Leadership &amp; Institutional Governance</p>
            <h2 className="section-heading">Active strategic roles.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF7F0] border border-[#DED8CD] p-7 space-y-3">
              <p className="kicker">Take Your Flight</p>
              <h3 className="font-serif text-xl text-[#2A302D]">Founder &amp; Chief Visionary</h3>
              <p className="text-sm text-[#59625B] leading-relaxed">
                Leading the flagship movement integrating Astromath, psychological depth, cognitive acceleration, and life blueprints for thousands of young learners.
              </p>
            </div>

            <div className="bg-[#FAF7F0] border border-[#DED8CD] p-7 space-y-3">
              <p className="kicker">Uni5 (USA)</p>
              <h3 className="font-serif text-xl text-[#2A302D]">Board of Directors Member</h3>
              <p className="text-sm text-[#59625B] leading-relaxed">
                Guiding institutional expansion, international outreach across the USA, and hands-on science activities rooted in Indian Knowledge Systems.
              </p>
            </div>

            <div className="bg-[#FAF7F0] border border-[#DED8CD] p-7 space-y-3">
              <p className="kicker">Sri Aurobindo Works</p>
              <h3 className="font-serif text-xl text-[#2A302D]">Counsellor &amp; Curriculum Author</h3>
              <p className="text-sm text-[#59625B] leading-relaxed">
                Shankar Chetty Heritage Home volunteer coordinator, Ashram Kindergarten counsellor, and Big School Mental Education curriculum author in Pondicherry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      {selectedServiceForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A302D]/60 backdrop-blur-[2px]">
          <div className="bg-[#FAF7F0] border border-[#2A302D] p-7 sm:p-9 max-w-lg w-full relative space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedServiceForModal(null)}
              aria-label="Close modal"
              className="absolute top-6 right-6 p-1.5 text-[#59625B] hover:text-[#2A302D] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5 pr-8">
              <p className="kicker">Seminar Booking &amp; Syllabus Request</p>
              <h3 className="font-serif text-2xl text-[#2A302D]">
                {selectedServiceForModal.title}
              </h3>
            </div>

            {formStatus.success ? (
              <div className="bg-[#D8E0D5] border border-[#3D4A3D] p-6 space-y-2">
                <h4 className="font-serif text-xl text-[#2A302D]">
                  Inquiry Dispatched
                </h4>
                <p className="text-sm text-[#3E4540]">
                  Lakshmipriya&apos;s desk will connect with you to discuss cohort scheduling and institutional syllabus options.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                {formStatus.error && (
                  <p className="p-3 bg-[#F9F4EB] border border-[#9D5A41] text-xs font-semibold text-[#9D5A41]">
                    {formStatus.error}
                  </p>
                )}

                <div>
                  <label className="form-field-label">Your Name / Representative *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Principal Radhika Sharma"
                    className="form-control-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="form-field-label">Official Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@institution.edu"
                      className="form-control-input"
                    />
                  </div>
                  <div>
                    <label className="form-field-label">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98450..."
                      className="form-control-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-field-label">Writing on behalf of</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="form-control-input"
                  >
                    <option value="School Administrator">School Principal / Trustee</option>
                    <option value="Teacher">Teacher / Faculty Head</option>
                    <option value="Parent">Parent / Parent Association</option>
                    <option value="Student">Student (College / Teen)</option>
                    <option value="Corporate Professional">Corporate / Organization</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="form-field-label">Audience &amp; Objectives *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-control-input"
                    placeholder="Share grade levels, estimated students, or preferred dates..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus.submitting}
                  className="solid-btn w-full"
                >
                  {formStatus.submitting ? 'Submitting...' : 'Confirm seminar inquiry'} <span>&#8599;</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

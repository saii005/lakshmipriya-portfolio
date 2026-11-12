import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import { Trash2, Plus, X, LogOut, RefreshCw, Mail, Phone } from 'lucide-react';

export const AdminDashboard = () => {
  const { isAuthenticated, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const [showDocModal, setShowDocModal] = useState(false);
  const [newDoc, setNewDoc] = useState({
    title: '',
    slug: '',
    category: 'Educational Philosophy',
    badge: 'New Deck',
    summary: '',
    slideTitle: '',
    slidePoints: '',
  });

  const [showServiceModal, setShowServiceModal] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    slug: '',
    category: 'Student Seminars & Bootcamps',
    badge: 'Popular',
    tagline: '',
    description: '',
    highlights: '',
    audience: 'Students (Grades 5-12)',
    duration: '4-Hour Intensive or 4 Weeks',
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [inqRes, docRes, srvRes] = await Promise.all([
        api.get('/inquiries'),
        api.get('/documents'),
        api.get('/services'),
      ]);
      if (inqRes.data?.success) setInquiries(inqRes.data.data);
      if (docRes.data?.success) setDocuments(docRes.data.data);
      if (srvRes.data?.success) setServices(srvRes.data.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await api.patch(`/inquiries/${id}/status`, { status });
      if (res.data?.success) {
        setInquiries(inquiries.map((i) => (i._id === id ? { ...i, status } : i)));
        showNotification(`Inquiry updated to "${status}"`);
      }
    } catch {
      alert('Failed to update status');
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await api.delete(`/inquiries/${id}`);
      if (res.data?.success) {
        setInquiries(inquiries.filter((i) => i._id !== id));
        showNotification('Inquiry deleted');
      }
    } catch {
      alert('Failed to delete inquiry');
    }
  };

  const handleCreateDocument = async (e) => {
    e.preventDefault();
    try {
      const bullets = newDoc.slidePoints
        .split('\n')
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      const payload = {
        title: newDoc.title,
        slug: newDoc.slug || newDoc.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: newDoc.category,
        badge: newDoc.badge,
        summary: newDoc.summary,
        slides: [
          {
            slideNumber: 1,
            title: newDoc.slideTitle || 'Introduction',
            bulletPoints: bullets.length > 0 ? bullets : ['Key point of this module'],
            quote: 'Every step of learning brings light.',
            tags: ['Overview'],
          },
        ],
      };

      const res = await api.post('/documents', payload);
      if (res.data?.success) {
        setDocuments([...documents, res.data.data]);
        setShowDocModal(false);
        setNewDoc({
          title: '',
          slug: '',
          category: 'Educational Philosophy',
          badge: 'New Deck',
          summary: '',
          slideTitle: '',
          slidePoints: '',
        });
        showNotification('New presentation deck created');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create document');
    }
  };

  const handleDeleteDocument = async (id) => {
    if (!confirm('Delete this presentation document deck?')) return;
    try {
      const res = await api.delete(`/documents/${id}`);
      if (res.data?.success) {
        setDocuments(documents.filter((d) => d._id !== id));
        showNotification('Document deck deleted');
      }
    } catch {
      alert('Failed to delete document');
    }
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      const highlightsArray = newService.highlights
        .split('\n')
        .map((h) => h.trim())
        .filter((h) => h.length > 0);

      const payload = {
        title: newService.title,
        slug: newService.slug || newService.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: newService.category,
        badge: newService.badge,
        tagline: newService.tagline,
        description: newService.description,
        highlights: highlightsArray,
        audience: newService.audience,
        duration: newService.duration,
      };

      const res = await api.post('/services', payload);
      if (res.data?.success) {
        setServices([...services, res.data.data]);
        setShowServiceModal(false);
        setNewService({
          title: '',
          slug: '',
          category: 'Student Seminars & Bootcamps',
          badge: 'Popular',
          tagline: '',
          description: '',
          highlights: '',
          audience: 'Students (Grades 5-12)',
          duration: '4-Hour Intensive or 4 Weeks',
        });
        showNotification('New seminar added to catalog');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create program');
    }
  };

  const handleDeleteService = async (id) => {
    if (!confirm('Delete this program from catalog?')) return;
    try {
      const res = await api.delete(`/services/${id}`);
      if (res.data?.success) {
        setServices(services.filter((s) => s._id !== id));
        showNotification('Program removed from catalog');
      }
    } catch {
      alert('Failed to delete program');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="font-serif italic text-xl text-[#59625B]">Opening administrative desk...</p>
      </div>
    );
  }

  return (
    <div>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#344438] text-[#FAF7F0] px-6 py-3 text-xs font-semibold border border-[#243529]">
          {toast}
        </div>
      )}

      {/* Top Editorial Banner */}
      <section className="bg-[#EEE6D9] border-b border-[#DED8CD] py-12">
        <div className="shell flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="kicker">Administrative Console</p>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#2A302D]">
              Welcome, Lakshmipriya Vinothkumar
            </h1>
            <p className="text-sm text-[#59625B]">
              Manage incoming seminar bookings, interactive presentation decks, and active masterclass catalogs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={loadAllData} className="outline-btn py-2.5 px-4 text-xs">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="outline-btn py-2.5 px-4 text-xs border-[#9D5A41] text-[#9D5A41] hover:bg-[#9D5A41] hover:text-[#FAF7F0]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="shell space-y-10">
          {/* Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border border-[#DED8CD] divide-y lg:divide-y-0 lg:divide-x divide-[#DED8CD] bg-[#F7F2E9]">
            <div className="p-6">
              <p className="kicker">Total Inquiries</p>
              <p className="font-serif text-3xl text-[#2A302D] mt-2">{inquiries.length}</p>
            </div>
            <div className="p-6">
              <p className="kicker">Presentation Decks</p>
              <p className="font-serif text-3xl text-[#2A302D] mt-2">{documents.length}</p>
            </div>
            <div className="p-6">
              <p className="kicker">Seminar Offerings</p>
              <p className="font-serif text-3xl text-[#2A302D] mt-2">{services.length}</p>
            </div>
            <div className="p-6">
              <p className="kicker">Pending Leads</p>
              <p className="font-serif text-3xl text-[#9D5A41] mt-2">
                {inquiries.filter((i) => i.status === 'new').length}
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-8 border-b border-[#DED8CD]">
            {[
              { id: 'inquiries', label: `Seminar Inquiries (${inquiries.length})` },
              { id: 'documents', label: `Presentation Decks (${documents.length})` },
              { id: 'services', label: `Seminar Catalog (${services.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-[#9D5A41] border-b-2 border-[#9D5A41]'
                    : 'text-[#59625B] hover:text-[#2A302D]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Inquiries */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl text-[#2A302D]">
                  Seminar Bookings &amp; Inquiries Pipeline
                </h2>
                <span className="kicker">Live Database</span>
              </div>

              {inquiries.length === 0 ? (
                <div className="border border-[#DED8CD] bg-[#F7F2E9] p-12 text-center text-sm text-[#59625B]">
                  No seminar bookings logged yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div key={inq._id} className="bg-[#FAF7F0] border border-[#DED8CD] p-6 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DED8CD]">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-serif text-xl text-[#2A302D]">{inq.name}</h3>
                            <span className="kicker">{inq.role || 'School Administrator'}</span>
                            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 border border-[#DED8CD] bg-[#F7F2E9] text-[#2A302D]">
                              {inq.status}
                            </span>
                          </div>
                          <p className="text-xs text-[#59625B] mt-1">
                            Received: {new Date(inq.createdAt).toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                            className="form-control-input py-1.5 px-3 text-xs w-auto"
                          >
                            <option value="new">Status: New</option>
                            <option value="contacted">Status: Contacted</option>
                            <option value="completed">Status: Completed</option>
                          </select>
                          <button
                            onClick={() => handleDeleteInquiry(inq._id)}
                            className="p-2 text-[#9D5A41] hover:bg-[#F0E9DC] border border-[#DED8CD] cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-[#2A302D]">
                        <p>
                          <strong>Subject:</strong> {inq.subject}
                        </p>
                        {inq.serviceInterested && (
                          <p className="text-[#9D5A41] font-medium">
                            Program: {inq.serviceInterested}
                          </p>
                        )}
                        <div className="bg-[#F7F2E9] border border-[#DED8CD] p-4 text-sm text-[#3E4540] whitespace-pre-wrap leading-relaxed">
                          {inq.message}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-6 text-xs text-[#59625B]">
                        <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 text-[#2A302D] hover:text-[#9D5A41]">
                          <Mail className="w-3.5 h-3.5" /> {inq.email}
                        </a>
                        {inq.phone && (
                          <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 hover:text-[#2A302D]">
                            <Phone className="w-3.5 h-3.5" /> {inq.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Documents */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-serif text-2xl text-[#2A302D]">
                  Presentation &amp; Document Decks
                </h2>
                <button onClick={() => setShowDocModal(true)} className="solid-btn py-2.5 px-4 text-xs">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create New Deck</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.map((doc) => (
                  <div
                    key={doc._id}
                    className="bg-[#FAF7F0] border border-[#DED8CD] p-6 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="kicker">{doc.category}</span>
                        <span className="text-xs text-[#59625B]">{doc.slides?.length || 0} Slides</span>
                      </div>
                      <h3 className="font-serif text-xl text-[#2A302D]">{doc.title}</h3>
                      <p className="text-xs text-[#59625B] font-mono">/docs/{doc.slug}</p>
                      <p className="text-xs text-[#59625B] line-clamp-2">
                        {doc.summary || 'Hierarchical modular slides for interactive learning.'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#DED8CD] flex items-center justify-between text-xs">
                      <a
                        href={`/docs/${doc.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-[#2A302D] border-b border-[#9D5A41] pb-0.5 hover:text-[#9D5A41]"
                      >
                        Open Deck View &#8599;
                      </a>
                      <button
                        onClick={() => handleDeleteDocument(doc._id)}
                        className="text-[#9D5A41] hover:text-[#2A302D] font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Services */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-serif text-2xl text-[#2A302D]">
                  Seminar &amp; Masterclass Offerings
                </h2>
                <button onClick={() => setShowServiceModal(true)} className="solid-btn py-2.5 px-4 text-xs">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Seminar</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((srv) => (
                  <div
                    key={srv._id}
                    className="bg-[#FAF7F0] border border-[#DED8CD] p-6 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="kicker">{srv.badge}</span>
                        <span className="text-xs text-[#59625B]">{srv.duration}</span>
                      </div>
                      <p className="text-[11px] uppercase tracking-wider text-[#59625B]">{srv.category}</p>
                      <h3 className="font-serif text-xl text-[#2A302D]">{srv.title}</h3>
                      <p className="font-serif italic text-xs text-[#9D5A41]">&ldquo;{srv.tagline}&rdquo;</p>
                      <p className="text-xs text-[#59625B] line-clamp-2">{srv.description}</p>
                    </div>

                    <div className="pt-4 border-t border-[#DED8CD] flex items-center justify-between text-xs">
                      <span className="text-[#59625B]">{srv.audience}</span>
                      <button
                        onClick={() => handleDeleteService(srv._id)}
                        className="text-[#9D5A41] hover:text-[#2A302D] font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal: Create Document Deck */}
      {showDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A302D]/60 backdrop-blur-[2px]">
          <div className="bg-[#FAF7F0] border border-[#2A302D] p-8 max-w-lg w-full relative space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowDocModal(false)}
              className="absolute top-6 right-6 p-1.5 text-[#59625B] hover:text-[#2A302D] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="kicker">Presentation Archive</p>
            <h3 className="font-serif text-2xl text-[#2A302D]">Create New Presentation Deck</h3>

            <form onSubmit={handleCreateDocument} className="space-y-3">
              <div>
                <label className="form-field-label">Deck Title *</label>
                <input
                  type="text"
                  required
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                  placeholder="e.g. Astromath Cognitive Mechanics"
                  className="form-control-input"
                />
              </div>

              <div>
                <label className="form-field-label">Category</label>
                <input
                  type="text"
                  value={newDoc.category}
                  onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                  className="form-control-input"
                />
              </div>

              <div>
                <label className="form-field-label">Slide 1 Title</label>
                <input
                  type="text"
                  value={newDoc.slideTitle}
                  onChange={(e) => setNewDoc({ ...newDoc, slideTitle: e.target.value })}
                  placeholder="e.g. Why Speed Math Sparks Joy"
                  className="form-control-input"
                />
              </div>

              <div>
                <label className="form-field-label">Slide 1 Bullet Points (one per line)</label>
                <textarea
                  rows={3}
                  value={newDoc.slidePoints}
                  onChange={(e) => setNewDoc({ ...newDoc, slidePoints: e.target.value })}
                  placeholder="Pattern recognition vs rote learning&#10;Bilateral brain hemispheric balance"
                  className="form-control-input"
                />
              </div>

              <button type="submit" className="solid-btn w-full">
                Publish Presentation Deck
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Service */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A302D]/60 backdrop-blur-[2px]">
          <div className="bg-[#FAF7F0] border border-[#2A302D] p-8 max-w-lg w-full relative space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowServiceModal(false)}
              className="absolute top-6 right-6 p-1.5 text-[#59625B] hover:text-[#2A302D] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="kicker">Seminar Catalog</p>
            <h3 className="font-serif text-2xl text-[#2A302D]">Add New Seminar / Program</h3>

            <form onSubmit={handleCreateService} className="space-y-3">
              <div>
                <label className="form-field-label">Seminar / Program Title *</label>
                <input
                  type="text"
                  required
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  placeholder="e.g. Astromath Masterclass"
                  className="form-control-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-field-label">Category</label>
                  <select
                    value={newService.category}
                    onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                    className="form-control-input"
                  >
                    <option value="Student Seminars & Bootcamps">Student Seminars &amp; Bootcamps</option>
                    <option value="Teens & College Students">Teens &amp; College Students</option>
                    <option value="Schools & Educational Institutions">Schools &amp; Educational Institutions</option>
                    <option value="Parents & Families">Parents &amp; Families</option>
                    <option value="Holistic Wellness & Leaders">Holistic Wellness &amp; Leaders</option>
                    <option value="Women Empowerment">Women Empowerment</option>
                  </select>
                </div>
                <div>
                  <label className="form-field-label">Badge</label>
                  <input
                    type="text"
                    value={newService.badge}
                    onChange={(e) => setNewService({ ...newService, badge: e.target.value })}
                    placeholder="e.g. Flagship Seminar"
                    className="form-control-input"
                  />
                </div>
              </div>

              <div>
                <label className="form-field-label">Tagline</label>
                <input
                  type="text"
                  required
                  value={newService.tagline}
                  onChange={(e) => setNewService({ ...newService, tagline: e.target.value })}
                  placeholder="e.g. Turning math anxiety into speed mastery"
                  className="form-control-input"
                />
              </div>

              <div>
                <label className="form-field-label">Description</label>
                <textarea
                  rows={2}
                  required
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="form-control-input"
                />
              </div>

              <div>
                <label className="form-field-label">Highlights (one per line)</label>
                <textarea
                  rows={2}
                  value={newService.highlights}
                  onChange={(e) => setNewService({ ...newService, highlights: e.target.value })}
                  placeholder="Vedic 2-second multiplication&#10;Hands-on pattern recognition lab"
                  className="form-control-input"
                />
              </div>

              <button type="submit" className="solid-btn w-full">
                Add Seminar to Live Catalog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

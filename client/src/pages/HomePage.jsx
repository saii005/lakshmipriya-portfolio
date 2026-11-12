import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

export const HomePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'School Administrator',
    serviceInterested: 'Astromath & Speed Math Seminar',
    subject: 'Website Inquiry',
    message: '',
  });
  const [status, setStatus] = useState({ submitting: false, success: false, error: '' });

  const pathways = [
    {
      num: '01',
      title: 'Students & Kids',
      detail: 'Astromath, speed brain acceleration, and joyful mathematical wonder',
      to: '/services?category=Student+Seminars+%26+Bootcamps',
    },
    {
      num: '02',
      title: 'Teens & Youth',
      detail: 'Exam calm, laser focus, and purposeful career blueprints',
      to: '/services?category=Teens+%26+College+Students',
    },
    {
      num: '03',
      title: 'Schools & Educators',
      detail: 'K-12 mental education curricula and empathetic faculty training',
      to: '/services?category=Schools+%26+Educational+Institutions',
    },
    {
      num: '04',
      title: 'Parents & Families',
      detail: 'Conscious parenting and nurturing home ecosystems',
      to: '/services?category=Parents+%26+Families',
    },
    {
      num: '05',
      title: 'Wonder Lab & Decks',
      detail: 'Interactive Vedic pattern engine and keynote presentation decks',
      to: '/kid-zone',
    },
  ];

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: '' });
    try {
      const res = await api.post('/inquiries', {
        ...formData,
        subject: `Homepage Inquiry — ${formData.serviceInterested}`,
      });
      if (res.data?.success) {
        setStatus({ submitting: false, success: true, error: '' });
        setFormData({
          name: '',
          email: '',
          role: 'School Administrator',
          serviceInterested: 'Astromath & Speed Math Seminar',
          subject: 'Website Inquiry',
          message: '',
        });
      }
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: err.response?.data?.message || 'Unable to send your inquiry right now. Please try again.',
      });
    }
  };

  return (
    <div>
      {/* 1. HERO BAND (Warm Linen #F0E9DC) */}
      <section className="bg-[#F0E9DC] border-b border-[#DED8CD]">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-16 lg:py-24">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-7">
            <p className="kicker">
              Mind Education &bull; Integral Development &bull; Take Your Flight
            </p>
            <h1 className="font-serif text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.09] tracking-[-0.035em] text-[#2A302D]">
              The way we nurture a young mind shapes the way they meet <em>the world.</em>
            </h1>
            <p className="text-[1.08rem] text-[#4E5A52] max-w-[580px] leading-[1.72]">
              Maybe a student fears mathematics. Maybe exam anxiety clouds genuine curiosity. Through <strong>Take Your Flight</strong>, institutional consulting, and global masterclasses, I help learners, parents, and schools replace fear with stillness, pattern mastery, and quiet confidence.
            </p>
            <div className="flex flex-wrap items-center gap-8 pt-2">
              <Link to="/contact" className="solid-btn">
                Book a seminar <span>&#8599;</span>
              </Link>
              <a href="#paths" className="under-link">
                Find your pathway <span>&#8595;</span>
              </a>
            </div>
          </div>

          {/* Right Classic Editorial Portrait / Crest Panel */}
          <div className="lg:col-span-5 relative">
            <div className="bg-[#FAF7F0] border border-[#DED8CD] p-8 sm:p-10 space-y-7">
              <div className="border border-[#DED8CD] p-6 sm:p-8 bg-[#F7F2E9] space-y-5">
                <div className="flex items-center justify-between border-b border-[#DED8CD] pb-4">
                  <span className="font-serif text-3xl text-[#2A302D] tracking-tight">LP</span>
                  <span className="kicker">Pondicherry &bull; Global</span>
                </div>
                <div className="space-y-2">
                  <h2 className="font-serif text-2xl text-[#2A302D]">
                    Lakshmipriya Vinothkumar
                  </h2>
                  <p className="text-sm text-[#59625B] leading-relaxed">
                    Founder, <em>Take Your Flight</em> &bull; Co-Founder, <em>self to Self</em> &bull; Board of Directors, Uni5 (USA) &amp; Shakti Foundation.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#DED8CD] space-y-1.5 text-xs text-[#59625B]">
                  <p>M.Sc. Psychology &amp; MBA (HR), University of Madras</p>
                  <p>B.E. Electrical &amp; Electronics &bull; Sri Aurobindo Ashram Alum</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#59625B]">
                <span>10,000+ Students Reached</span>
                <Link to="/docs" className="text-[#9D5A41] hover:underline">
                  View Slide Decks &#8599;
                </Link>
              </div>
            </div>

            {/* Overlapping Editorial Note */}
            <div className="mt-4 lg:mt-0 lg:absolute lg:-bottom-6 lg:-left-8 max-w-[270px] bg-[#FAF7F0] border border-[#DED8CD] px-6 py-4 font-serif italic text-[1.05rem] leading-snug text-[#2A302D] shadow-[0_8px_30px_rgba(52,44,36,0.08)]">
              “The smallest shift in how a child thinks can transform a lifetime of learning.”
            </div>
          </div>
        </div>
      </section>

      {/* 2. PATHWAYS INDEX (#FAF7F0) */}
      <section id="paths" className="py-20 lg:py-28">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12">
            <div className="lg:col-span-3">
              <p className="kicker">Where would you like to begin?</p>
            </div>
            <div className="lg:col-span-5">
              <h2 className="section-heading">
                Every learner has their own story.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm text-[#59625B] max-w-[320px] leading-relaxed">
                Choose the stream you want to explore. Each pathway offers a structured place to begin with greater awareness and practical skill.
              </p>
            </div>
          </div>

          <div className="path-list">
            {pathways.map((item) => (
              <Link key={item.num} to={item.to} className="path-row group">
                <span className="path-num">{item.num}</span>
                <strong className="path-title font-normal">{item.title}</strong>
                <span className="path-detail col-span-2 md:col-span-1">{item.detail}</span>
                <span className="path-arrow" aria-hidden="true">&#8599;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HEART OF THE WORK / QUOTE BAND (#E7DDD0) */}
      <section className="bg-[#E7DDD0] py-20 lg:py-24 border-y border-[#DED8CD]">
        <div className="shell max-w-[920px] text-center space-y-6">
          <p className="kicker">The Heart of the Work</p>
          <blockquote className="font-serif text-[clamp(1.9rem,4vw,3.3rem)] leading-[1.16] tracking-[-0.025em] text-[#2A302D]">
            “When education replaces fear with curiosity and anxiety with stillness, learning becomes a lifelong adventure.”
          </blockquote>
          <p className="text-[#59625B] max-w-[660px] mx-auto leading-relaxed">
            This philosophy becomes practical when brought into ordinary moments: a hesitant hand in math class, a restless mind before board exams, or a teacher seeking deeper connection with their classroom.
          </p>

          {/* Understated Classic Reach Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mt-8 border-t border-[#CFC5B6] text-left">
            <div>
              <p className="font-serif text-3xl text-[#2A302D]">10,000+</p>
              <p className="text-xs text-[#59625B] mt-1">Students &amp; learners reached</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-[#2A302D]">10+</p>
              <p className="text-xs text-[#59625B] mt-1">Countries hosted seminars</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-[#2A302D]">25+</p>
              <p className="text-xs text-[#59625B] mt-1">Signature masterclasses</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-[#2A302D]">Uni5 USA</p>
              <p className="text-xs text-[#59625B] mt-1">Board of Directors</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. APPROACH BAND (#F8F5ED) */}
      <section id="approach" className="bg-[#F8F5ED] py-20 lg:py-28">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-5">
            <p className="kicker">A Practical Way to Begin</p>
            <h2 className="section-heading">
              Look inward.<br />
              <em>Soar outward.</em>
            </h2>
            <p className="text-[#59625B] leading-relaxed max-w-[440px]">
              Academic excellence is more than memorizing formulas. It depends on the stillness we bring to a challenge and our ability to see underlying patterns with clarity.
            </p>
            <div className="pt-2">
              <Link to="/services" className="under-link">
                Browse seminar catalog <span>&#8599;</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 border-b border-[#DED8CD]">
            {[
              {
                num: '01',
                title: 'Quiet the anxious mind',
                desc: 'Practical breathwork protocols and sensory stillness that dissolve exam panic before it takes hold.',
              },
              {
                num: '02',
                title: 'Awaken pattern recognition',
                desc: 'Vedic Astromath and bilateral brain exercises that turn intimidating arithmetic into effortless play.',
              },
              {
                num: '03',
                title: 'Practice integral excellence',
                desc: 'Combine psychological insight, Indian Knowledge Systems, and purposeful communication for lifelong resilience.',
              },
            ].map((step) => (
              <article
                key={step.num}
                className="border-t border-[#DED8CD] grid grid-cols-1 sm:grid-cols-[64px_1fr] gap-3 py-7"
              >
                <span className="text-xs font-bold tracking-wider text-[#9D5A41] pt-1">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-[#2A302D] mb-2">{step.title}</h3>
                  <p className="text-[#59625B] text-[0.96rem] leading-relaxed">{step.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. A FAMILIAR MOMENT (#E8CBB1 Peach Band) */}
      <section className="bg-[#E8CBB1] py-20 lg:py-24">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="bg-[#F9F4EB] border border-[#D8B99D] p-10 sm:p-12 -rotate-1 shadow-[0_12px_36px_rgba(81,58,43,0.1)]">
              <span className="kicker block mb-4">A Familiar Moment</span>
              <p className="font-serif italic text-[1.7rem] sm:text-[2rem] leading-[1.3] text-[#2A302D]">
                “I understood it at home.<br />
                Then the timer started,<br />
                and my mind went blank.”
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <h2 className="section-heading">
              There is more to learning than what is written on the syllabus.
            </h2>
            <p className="text-[#3E4540] leading-relaxed max-w-[560px]">
              A student studies diligently. Yet under pressure, fear overrides memory. Guided cognitive practice helps young learners slow down, recognize the pattern beneath the problem, and respond with calm precision.
            </p>
            <div className="pt-2">
              <Link to="/kid-zone" className="under-link">
                Try the interactive Astromath Wonder Lab &#8599;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT / MEET LAKSHMIPRIYA (#FAF7F0) */}
      <section id="about" className="py-20 lg:py-28">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="editorial-monogram">
              <div className="editorial-monogram-inner space-y-3">
                <p className="kicker">Integral Lineage</p>
                <div className="flex items-center justify-center gap-4 font-serif text-3xl text-[#2A302D]">
                  <span className="italic text-[#9D5A41]">self</span>
                  <span className="w-8 h-[1px] bg-[#9D5A41]" />
                  <span>Self</span>
                </div>
                <p className="text-xs text-[#59625B] tracking-wide uppercase">
                  Take Your Flight &bull; Uni5 USA
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <p className="kicker">A Note From Your Guide</p>
            <h2 className="section-heading">Meet Lakshmipriya.</h2>
            <p className="text-[#59625B] leading-relaxed max-w-[540px]">
              Rooted in the educational ideals of Sri Aurobindo Ashram and trained in Psychology (M.Sc.), Human Resources (MBA), and Engineering (B.E.), Lakshmipriya Vinothkumar has spent over a decade designing transformative learning experiences across India, the United States, Canada, France, Japan, and Singapore.
            </p>
            <p className="text-[#59625B] leading-relaxed max-w-[540px]">
              Rather than asking students to memorize by rote, she invites them to examine how their own mind works—blending cognitive psychology, Vedic Astromath, and Indian Knowledge Systems into practical habits that endure.
            </p>
            <div className="pt-2 flex flex-wrap gap-6">
              <Link to="/docs" className="under-link">
                Read keynote presentation decks &#8599;
              </Link>
              <Link to="/contact" className="under-link">
                Invite for a school seminar &#8599;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WORKING TOGETHER & TESTIMONIALS (#E9E6D9) */}
      <section className="bg-[#E9E6D9] py-20 lg:py-28 border-t border-[#DED8CD]">
        <div className="shell space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-3">
              <p className="kicker">Working Together</p>
              <h2 className="section-heading">
                A seminar shaped by <em>your institution.</em>
              </h2>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <p className="text-[#59625B] leading-relaxed">
                School seminars, student bootcamps, and faculty workshops begin by listening to the specific challenges your learners face. Together, we select the right format—from 2-hour keynotes to multi-week K-12 mental education modules.
              </p>
              <p className="text-[#59625B] leading-relaxed">
                Sessions are conducted in-person across Pondicherry, Chennai, Coimbatore, and Bangalore, as well as live online globally.
              </p>
              <Link to="/services" className="under-link">
                Explore all seminar formats &#8599;
              </Link>
            </div>
          </div>

          {/* 3 Classic Editorial Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-[#CFC9BA]">
            <article className="space-y-4">
              <p className="kicker">Coimbatore &bull; K-12</p>
              <p className="font-serif italic text-lg leading-relaxed text-[#2A302D]">
                “The Astromath seminar was a watershed moment for our middle schoolers. Students who feared mathematics were solving calculations in seconds with glowing smiles.”
              </p>
              <p className="text-xs font-semibold text-[#59625B]">
                Principal M. Soundararajan — K-12 School Leader
              </p>
            </article>

            <article className="space-y-4">
              <p className="kicker">Chennai &bull; Parent</p>
              <p className="font-serif italic text-lg leading-relaxed text-[#2A302D]">
                “Our daughter participated in the Focus Gym and Career Blueprint workshop. Her exam concentration improved dramatically and she approached her board tests with calm confidence.”
              </p>
              <p className="text-xs font-semibold text-[#59625B]">
                Radhika Sundaram — Parent
              </p>
            </article>

            <article className="space-y-4">
              <p className="kicker">Pondicherry &bull; Academic</p>
              <p className="font-serif italic text-lg leading-relaxed text-[#2A302D]">
                “Lakshmipriya brings a rare synthesis of psychological depth, Indian Knowledge Systems, and practical clarity. Our teachers found her workshop deeply empowering.”
              </p>
              <p className="text-xs font-semibold text-[#59625B]">
                Dr. K. Narayanan — Academic Trustee
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 8. SAGE CONTACT BAND (#D8E0D5) */}
      <section id="contact" className="bg-[#D8E0D5] py-20 lg:py-28">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-5">
            <p className="kicker">Take the First Step</p>
            <h2 className="section-heading">
              What is one learning challenge you wish felt different?
            </h2>
            <p className="text-[#455048] leading-relaxed">
              Share a few details about your school, student cohort, or family workshop goals. Lakshmipriya responds personally to coordinate dates and format.
            </p>
            <div className="border-t border-[#ADB9AC] pt-5 mt-8 text-xs text-[#4E5A52] space-y-1.5">
              <p>
                Direct email:{' '}
                <a href="mailto:reachtolakshmipriya@gmail.com" className="underline text-[#2A302D]">
                  reachtolakshmipriya@gmail.com
                </a>
              </p>
              <p>Telephone / WhatsApp: +91 7650992525</p>
            </div>
          </div>

          <form onSubmit={handleInquirySubmit} className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-field-label">Your name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dr. / Principal / Parent name"
                  className="form-control-input"
                />
              </div>
              <div>
                <label className="form-field-label">Email address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@institution.edu"
                  className="form-control-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-field-label">Your role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="form-control-input"
                >
                  <option value="School Administrator">School Administrator / Principal</option>
                  <option value="Parent / Guardian">Parent / Guardian</option>
                  <option value="Educator / Teacher">Educator / Teacher</option>
                  <option value="College / Student">College / Student</option>
                  <option value="Corporate / Organization">Corporate / Organization</option>
                </select>
              </div>
              <div>
                <label className="form-field-label">Pathway of interest</label>
                <select
                  value={formData.serviceInterested}
                  onChange={(e) => setFormData({ ...formData, serviceInterested: e.target.value })}
                  className="form-control-input"
                >
                  <option value="Astromath & Speed Math Seminar">Astromath &amp; Speed Math</option>
                  <option value="Focus Gym & Exam Calm">Focus Gym &amp; Exam Calm</option>
                  <option value="K-12 Mental Education Curriculum">K-12 Mental Education</option>
                  <option value="Teacher Empowerment Workshop">Teacher Empowerment</option>
                  <option value="Conscious Parenting Seminar">Conscious Parenting</option>
                  <option value="Career & Potential Blueprint">Career &amp; Potential Blueprint</option>
                </select>
              </div>
            </div>

            <div>
              <label className="form-field-label">A few words about your goal</label>
              <textarea
                rows="4"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your student group, preferred dates, or questions..."
                className="form-control-input resize-y"
              />
            </div>

            {status.error && (
              <p className="text-xs font-semibold text-[#9D5A41]">{status.error}</p>
            )}
            {status.success && (
              <p className="text-xs font-semibold text-[#344438] bg-[#FAF7F0] border border-[#344438] px-4 py-3">
                Thank you. Your inquiry has been received and recorded for Lakshmipriya&apos;s desk.
              </p>
            )}

            <button type="submit" disabled={status.submitting} className="solid-btn">
              {status.submitting ? 'Sending inquiry...' : 'Send seminar inquiry'} <span>&#8599;</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import api from '../api/client';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'School Administrator',
    subject: '',
    serviceInterested: 'Astromath & Speed Math Seminar',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      const res = await api.post('/inquiries', formData);
      if (res.data?.success) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: 'School Administrator',
          subject: '',
          serviceInterested: 'Astromath & Speed Math Seminar',
          message: '',
        });
      }
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: err.response?.data?.message || 'Failed to submit seminar booking request. Please verify fields.',
      });
    }
  };

  return (
    <div>
      {/* Classic Detail Hero */}
      <section className="bg-[#EEE6D9] border-b border-[#DED8CD] py-16 lg:py-24">
        <div className="shell max-w-[1050px] space-y-6">
          <p className="kicker">Seminar Bookings &amp; Correspondence</p>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,4.3rem)] leading-[1.1] tracking-[-0.03em] text-[#2A302D] max-w-[780px]">
            Begin a conversation for your <em>school or cohort.</em>
          </h1>
          <p className="text-[1.08rem] text-[#59625B] max-w-[640px] leading-relaxed">
            Direct advisory and scheduling channel for school leaders, student cohorts, teacher workshops, and keynote seminars with Lakshmipriya Vinothkumar.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-[#D8E0D5] py-16 lg:py-24">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Correspondence */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <p className="kicker">Direct Channels</p>
              <h2 className="font-serif text-3xl text-[#2A302D]">
                Institutional Contact Desk
              </h2>
              <p className="text-sm text-[#455048] leading-relaxed">
                Lakshmipriya attends direct communications personally to coordinate calendar slots and program objectives.
              </p>
            </div>

            <div className="border-t border-[#ADB9AC] divide-y divide-[#ADB9AC] text-sm">
              <div className="py-5 space-y-1">
                <p className="kicker">Telephone / WhatsApp</p>
                <a href="tel:+917650992525" className="block font-semibold text-[#2A302D] hover:text-[#9D5A41]">
                  +91 7650992525
                </a>
                <a href="tel:+919790662672" className="block text-[#4E5A52] hover:text-[#2A302D]">
                  +91 9790662672
                </a>
              </div>

              <div className="py-5 space-y-1">
                <p className="kicker">Electronic Mail</p>
                <a
                  href="mailto:reachtolakshmipriya@gmail.com"
                  className="block font-semibold text-[#2A302D] underline underline-offset-4 hover:text-[#9D5A41] break-all"
                >
                  reachtolakshmipriya@gmail.com
                </a>
                <a href="mailto:lakeepri@gmail.com" className="block text-[#4E5A52] hover:text-[#2A302D]">
                  lakeepri@gmail.com
                </a>
              </div>

              <div className="py-5 space-y-1">
                <p className="kicker">Regions &amp; Reach</p>
                <p className="font-semibold text-[#2A302D]">
                  Pondicherry &bull; Chennai &bull; Coimbatore &bull; Bangalore
                </p>
                <p className="text-xs text-[#4E5A52]">
                  Global cohorts across USA, Canada, France, Japan &amp; Singapore
                </p>
              </div>
            </div>

            <div className="bg-[#FAF7F0] border border-[#ADB9AC] p-6 space-y-2">
              <p className="kicker">Priority Scheduling</p>
              <p className="font-serif italic text-base text-[#2A302D] leading-relaxed">
                &ldquo;School annual day seminars, board exam preparation bootcamps, and faculty enrichment workshops receive priority date confirmation.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 bg-[#FAF7F0] border border-[#ADB9AC] p-8 sm:p-10 space-y-6">
            <div className="space-y-1.5 border-b border-[#DED8CD] pb-5">
              <p className="kicker">Seminar Inquiry Form</p>
              <h2 className="font-serif text-3xl text-[#2A302D]">
                Schedule a Seminar or Consultation
              </h2>
              <p className="text-xs text-[#59625B]">
                Fill in your institutional or personal requirements below. Inquiries are recorded directly to our desk.
              </p>
            </div>

            {status.success ? (
              <div className="bg-[#D8E0D5] border border-[#3D4A3D] p-8 space-y-4">
                <p className="kicker">Confirmation</p>
                <h3 className="font-serif text-2xl text-[#2A302D]">
                  Seminar Booking Request Dispatched
                </h3>
                <p className="text-sm text-[#3E4540] leading-relaxed">
                  Thank you for reaching out. Lakshmipriya will review your requirements and follow up directly via telephone or email to confirm agenda and schedule.
                </p>
                <button
                  onClick={() => setStatus({ submitting: false, success: false, error: null })}
                  className="solid-btn"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status.error && (
                  <p className="p-3 bg-[#F9F4EB] border border-[#9D5A41] text-xs font-semibold text-[#9D5A41]">
                    {status.error}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-field-label">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. K. Ramanathan"
                      className="form-control-input"
                    />
                  </div>
                  <div>
                    <label className="form-field-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@school.org"
                      className="form-control-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <div>
                    <label className="form-field-label">Inquiring in Capacity of</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="form-control-input"
                    >
                      <option value="School Administrator">School Principal / Trustee</option>
                      <option value="Teacher">Educator / Department Head</option>
                      <option value="Student">Student (High School / College)</option>
                      <option value="Parent">Parent / Family</option>
                      <option value="Corporate Leader">Organization / Corporate Leader</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-field-label">Program of Interest</label>
                    <select
                      value={formData.serviceInterested}
                      onChange={(e) => setFormData({ ...formData, serviceInterested: e.target.value })}
                      className="form-control-input"
                    >
                      <option value="Astromath & Speed Math Seminar">Astromath &amp; Speed Math Seminar</option>
                      <option value="Take Your Flight Student Bootcamp">Take Your Flight Student Bootcamp</option>
                      <option value="Focus Gym: Exam Calm & Attention">Focus Gym: Exam Calm &amp; Attention</option>
                      <option value="Amplify Your Potential Masterclass">Amplify Your Potential Masterclass</option>
                      <option value="K-12 Mind Education Curriculum Consulting">K-12 Mind Education Curriculum Consulting</option>
                      <option value="Conscious Parenting Workshop">Conscious Parenting Workshop</option>
                      <option value="Keynote Speaking & Inauguration">Keynote Speaking &amp; Inauguration</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-field-label">Subject / Purpose *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. On-Campus Astromath Seminar"
                      className="form-control-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-field-label">Details &amp; Preferred Timeline *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about expected student batch size, grades, dates, or campus requirements..."
                    className="form-control-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="solid-btn w-full"
                >
                  {status.submitting ? 'Dispatching request...' : 'Dispatch seminar booking request'} <span>&#8599;</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

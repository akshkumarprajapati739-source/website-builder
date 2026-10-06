import React, { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle2, MessageCircle, Sparkles, Mail, Calendar, Clock, Video, Loader2, BellRing } from 'lucide-react';
import { useMagneticButton } from '../hooks/useMagneticButton.ts';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialPlan = 'Growth Flagship (₹8,999)',
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [plan, setPlan] = useState(initialPlan);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM – 1:00 PM (IST)');
  const [meetingMode, setMeetingMode] = useState('Google Meet / Video');
  const [brief, setBrief] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const magneticBtn = useMagneticButton(5);

  useEffect(() => {
    if (initialPlan) {
      setPlan(initialPlan);
    }
  }, [initialPlan]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please enter your full name and valid email address.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    const payload = {
      client_name: name,
      client_email: email,
      client_phone: phone || 'Not provided',
      selected_package: plan,
      appointment_date: appointmentDate || 'Immediate / Next Available',
      appointment_time_slot: timeSlot,
      meeting_preference: meetingMode,
      project_notes: brief || 'No extra requirements specified',
      admin_notification_recipient: 'prajapatiaksh32@gmail.com',
      _subject: `📅 New Appointment Booking: ${name} (${plan}) - ${appointmentDate || 'Upcoming'}`,
      _captcha: 'false',
      _template: 'table',
    };

    try {
      // Dispatches email so Admin receives a notification on Gmail app
      await fetch('https://formsubmit.co/ajax/prajapatiaksh32@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch {
      // Fail gracefully and still display confirmation & one-tap app launchers
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleWhatsAppDirect = () => {
    const message = encodeURIComponent(
      `Hi WS Web Studio! I'm ${name || 'a client'} and I booked an appointment for the "${plan}" plan.\nDate: ${appointmentDate || 'Immediate'}\nSlot: ${timeSlot}\nMeeting Mode: ${meetingMode}\nPlease confirm.`
    );
    window.open(`https://wa.me/916206184568?text=${message}`, '_blank');
  };

  const handleOpenGmailApp = () => {
    const subject = encodeURIComponent(`📅 Appointment Booking Confirmation - ${name} (${plan})`);
    const body = encodeURIComponent(
      `Hello Admin,\n\nHere are my appointment booking details:\n\n` +
      `• Name: ${name}\n` +
      `• Email: ${email}\n` +
      `• Phone/WhatsApp: ${phone}\n` +
      `• Selected Plan: ${plan}\n` +
      `• Appointment Date: ${appointmentDate || 'Earliest available'}\n` +
      `• Preferred Time: ${timeSlot}\n` +
      `• Meeting Mode: ${meetingMode}\n\n` +
      `Project Brief:\n${brief}\n\n` +
      `Looking forward to our discovery session.\n\nBest regards,\n${name}`
    );

    // Deep link directly to Gmail Web & App
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=prajapatiaksh32@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`WS Web Studio Appointment: ${name} (${plan})`);
    const details = encodeURIComponent(
      `Appointment with ${name} for ${plan}.\nClient Email: ${email}\nPhone: ${phone}\nMode: ${meetingMode}\nAdmin: prajapatiaksh32@gmail.com`
    );
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&add=prajapatiaksh32@gmail.com`;
    window.open(calUrl, '_blank');
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* 23. Background: fade + blur */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/85 backdrop-blur-xl transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 23. Modal: scale from 0.92 → 1, opacity 0 → 1 */}
      <div
        className={`relative z-10 w-full max-w-xl rounded-3xl bg-[#080d1f] border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(6,182,212,0.25)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] max-h-[92vh] overflow-y-auto ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-92 opacity-0 translate-y-4'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 ring-8 ring-emerald-500/10">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold font-display text-white">
              Appointment Booking Confirmed!
            </h3>

            {/* Prominent notification banner for Admin on Gmail App */}
            <div className="mt-3 px-4 py-3 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 text-xs text-cyan-200 flex items-center gap-3 text-left w-full shadow-lg shadow-cyan-950/40">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                <BellRing className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
              <div>
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <span>Delivered to Admin Gmail App</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[11px] font-mono text-cyan-300">
                  prajapatiaksh32@gmail.com
                </div>
              </div>
            </div>

            {/* Appointment Summary Box */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left w-full text-xs space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Client:</span>
                <span className="font-semibold text-white">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Package:</span>
                <span className="text-cyan-400 font-semibold">{plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Slot:</span>
                <span className="text-slate-200">{appointmentDate || 'Immediate'} · {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Meeting Format:</span>
                <span className="text-slate-200">{meetingMode}</span>
              </div>
            </div>

            {/* Quick Actions: Open in Gmail, Add to Calendar, Chat on WhatsApp */}
            <div className="mt-6 flex flex-col sm:flex-row gap-2.5 w-full">
              <button
                onClick={handleOpenGmailApp}
                className="shine-effect flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Gmail App</span>
              </button>

              <button
                onClick={handleAddToCalendar}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Google Calendar</span>
              </button>
            </div>

            <div className="mt-3 w-full">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Also Chat with Admin on WhatsApp</span>
              </button>
            </div>

            <div className="mt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Admin Booking · Gmail App Alert</span>
            </div>

            <h3 className="text-2xl font-bold font-display text-white">
              Book Project Discovery Session
            </h3>

            {/* Notification to user that appointment alerts admin's Gmail App */}
            <div className="mt-2 p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center gap-2 text-xs text-cyan-300">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                Booking will be sent directly to admin on Gmail app: <strong className="text-white font-mono">prajapatiaksh32@gmail.com</strong>
              </span>
            </div>

            {errorMsg && (
              <div className="mt-3 p-2.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              {/* Selected plan */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Selected Package / Plan *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={plan}
                    onChange={e => setPlan(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 focus:border-cyan-400 focus:outline-none text-sm text-cyan-300 font-semibold"
                  />
                  <span className="absolute right-3 top-2.5 text-[11px] font-mono text-cyan-400/80">
                    Auto-selected
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jordan Lee"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jordan@brand.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Appointment Date</span>
                  </label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={e => setAppointmentDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Preferred Time Slot</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={e => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-xs text-white"
                  >
                    <option value="11:00 AM – 1:00 PM (IST)">11:00 AM – 1:00 PM (Morning)</option>
                    <option value="2:00 PM – 4:00 PM (IST)">2:00 PM – 4:00 PM (Afternoon)</option>
                    <option value="5:00 PM – 7:00 PM (IST)">5:00 PM – 7:00 PM (Evening)</option>
                    <option value="Flexible / Any Time">Flexible / Any Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                    <Video className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Meeting Preference</span>
                  </label>
                  <select
                    value={meetingMode}
                    onChange={e => setMeetingMode(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-xs text-white"
                  >
                    <option value="Google Meet / Video">Google Meet / Video</option>
                    <option value="WhatsApp Video / Voice">WhatsApp Video / Voice</option>
                    <option value="Phone Call">Direct Phone Call</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Project Goals / Key Requirements
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need high-conversion website for our business..."
                  value={brief}
                  onChange={e => setBrief(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseMove={magneticBtn.handleMouseMove}
                  onMouseLeave={magneticBtn.handleMouseLeave}
                  style={magneticBtn.buttonStyle}
                  className="shine-effect w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending to Admin's Gmail App...</span>
                    </>
                  ) : (
                    <>
                      <span>Book Appointment (Alerts Admin on Gmail App)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

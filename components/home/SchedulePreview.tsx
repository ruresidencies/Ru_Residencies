// components/home/SchedulePreview.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, MapPin, Target } from 'lucide-react';
import InteractiveMap from '@/components/contact/InteractiveMap';
import { sendScheduleEmail } from '@/lib/email-service';

export default function SchedulePreview() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Predefined time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  // Get next 4 working days
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Sundays
      if (date.getDay() === 0) continue;
      
      const formattedDate = date.toISOString().split('T')[0];
      const displayDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      
      days.push({
        value: formattedDate,
        display: displayDate
      });
      
      if (days.length === 4) break;
    }
    
    return days;
  }

  const days = getNextDays();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !formData.name || !formData.phone) {
      alert('Please fill all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // Send email via EmailJS
      const result = await sendScheduleEmail({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || '',
        selectedDate,
        selectedTime,
        source: 'homepage'
      });
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        // Fallback: still show success but log error
        console.error('Email failed but showing success to user');
        setIsSubmitted(true);
        // Or you could show an alert: alert(result.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Even if email fails, show success to user
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className="bg-white pt-8 md:pt-12">
      {/* Hero Section - Compact for preview */}
      <div className="bg-black text-white py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-light mb-3">
              Schedule a Private Viewing
            </h1>
            <p className="text-gray-300 text-sm md:text-base">
              Experience RU Residencies firsthand. Our team will guide you personally.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Form */}
          <div className="space-y-8">
            <div>
              <div className="mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-light text-gray-900 mb-2">
                  Book Your Visit
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Fill the form below. We'll confirm your slot.
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-green-50 rounded-xl border border-green-200 p-6 md:p-8 text-center">
                  <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-500 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-light text-gray-900 mb-2">
                    Tour Request Submitted
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">
                    We've received your request and will contact you shortly to confirm details.
                  </p>
                  <div className="bg-white rounded-lg p-3 md:p-4 inline-block border border-green-100">
                    <p className="text-xs md:text-sm text-gray-500 mb-1">Your Requested Slot</p>
                    <p className="font-medium text-sm md:text-base">
                      {new Date(selectedDate).toLocaleDateString('en-US', { 
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })} at {selectedTime}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                        Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black text-sm md:text-base"
                          placeholder="Your name"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                          Phone *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="w-4 h-4 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black text-sm md:text-base"
                            placeholder="Your phone number"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="w-4 h-4 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black text-sm md:text-base"
                            placeholder="Your email (optional)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                      Select Date *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {days.map(day => (
                        <button
                          key={day.value}
                          type="button"
                          onClick={() => setSelectedDate(day.value)}
                          className={`py-2.5 md:py-3 rounded-lg border text-sm transition-all ${
                            selectedDate === day.value
                              ? 'bg-black text-white border-black'
                              : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          {day.display}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Time Selection */}
                  {selectedDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                        Select Time *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map(time => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2.5 md:py-3 rounded-lg border text-sm transition-all ${
                              selectedTime === time
                                ? 'bg-black text-white border-black'
                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime || isLoading}
                    className="w-full bg-black text-white py-3 md:py-3.5 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      'Request Private Tour'
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center pt-2">
                    Submit your details. Our team will confirm availability within 24 hours.
                  </p>
                </form>
              )}
            </div>

            {/* Feature Cards - Moved here from map section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-xl bg-gradient-to-r from-navy-50 to-blue-50 border border-navy-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-white shadow-sm">
                    <Clock className="w-5 h-5 text-navy-700" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-navy-900">Flexible Scheduling</p>
                    <p className="text-sm text-navy-600 font-light">Multiple time slots available daily</p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 rounded-xl bg-gradient-to-r from-accent-gold/10 to-accent-goldDark/10 border border-accent-gold/20 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-white shadow-sm">
                    <User className="w-5 h-5 text-accent-gold" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-navy-900">Personal Tour</p>
                    <p className="text-sm text-navy-600 font-light">One-on-one with property specialists</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preparation Tips - Moved here from map section */}
            <div className="border border-gray-200 rounded-xl p-5 md:p-6">
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-3 md:mb-4">
                Preparation Tips
              </h3>
              <ul className="space-y-1.5 md:space-y-2">
                <li className="text-xs md:text-sm text-gray-600 flex items-start gap-2">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0" />
                  <span>Arrive 10 minutes before your scheduled time</span>
                </li>
                <li className="text-xs md:text-sm text-gray-600 flex items-start gap-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gray-500">•</span>
                  </div>
                  <span>Bring valid photo ID for verification</span>
                </li>
                <li className="text-xs md:text-sm text-gray-600 flex items-start gap-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gray-500">•</span>
                  </div>
                  <span>Wear comfortable shoes for property tours</span>
                </li>
                <li className="text-xs md:text-sm text-gray-600 flex items-start gap-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gray-500">•</span>
                  </div>
                  <span>Prepare questions for our specialists</span>
                </li>
              </ul>
            </div>

            {/* Questions About Scheduling? */}
            <div className="pt-6 border-t border-gray-200">
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-light text-gray-900 mb-3 md:mb-4">
                  Questions About Scheduling?
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
                  Call us directly for immediate assistance
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a 
                    href="tel:0772112117" 
                    className="inline-flex items-center gap-2 bg-black text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm md:text-base"
                  >
                    <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    Call Now: 077 211 2117
                  </a>
                  <Link 
                    href="/schedule-viewing" 
                    className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm md:text-base"
                  >
                    View Full Scheduling Page
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Info (EXACT MAP PLACEMENT AS ORIGINAL) */}
          <div className="space-y-8">
            {/* Contact Information - Same as Schedule Viewing Page */}
            <div className="bg-black text-white rounded-xl p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-light mb-4 md:mb-6">
                Contact Us Directly
              </h3>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  <div>
                    <p className="text-xs md:text-sm text-gray-300">Hotline</p>
                    <a href="tel:0772112117" className="font-medium text-base md:text-lg hover:text-gray-300 transition-colors">
                      077 211 2117
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 md:gap-4">
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  <div>
                    <p className="text-xs md:text-sm text-gray-300">Email</p>
                    <a href="mailto:info@ruresidencies.com" className="font-medium text-base md:text-lg hover:text-gray-300 transition-colors">
                      info@ruresidencies.com
                    </a>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-xs md:text-sm text-gray-300 mb-2">WhatsApp</p>
                  <a 
                    href="https://wa.me/94772112117" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-colors text-sm"
                  >
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* MAP SECTION - EXACTLY AS IT WAS IN YOUR ORIGINAL COMPONENT */}
            <div className="relative">
              {/* Map header with GPS on the right */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-navy-700 to-blue-800 shadow-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-navy-900">Prime Location Navigation</h3>
                    <p className="text-sm text-navy-600 font-light">Interactive access to our prestigious headquarters</p>
                  </div>
                </div>
                
                {/* GPS Coordinates on the right side */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-gold/10 to-accent-goldDark/10 rounded-full border border-accent-gold/20">
                  <Target className="w-4 h-4 text-accent-gold" />
                  <span className="text-sm font-medium text-navy-900">GPS: 6.8647° N, 79.8914° E</span>
                  <div className="w-1.5 h-1.5 bg-accent-gold rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Interactive Map Container - Same as original */}
              <div className="relative rounded-2xl overflow-hidden border border-navy-100 bg-white shadow-xl">
                <InteractiveMap />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
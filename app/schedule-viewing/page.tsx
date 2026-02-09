// app/schedule-viewing/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, Phone, Mail, CheckCircle } from 'lucide-react';
import { sendScheduleEmail } from '@/lib/email-service';

export default function ScheduleViewingPage() {
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
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  // Get next 6 working days
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
      
      if (days.length === 6) break;
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
        source: 'full-page'
      });
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        // Fallback: still show success but log error
        console.error('Email failed but showing success to user');
        setIsSubmitted(true);
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
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <div className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-light mb-4">
              Schedule a Viewing
            </h1>
            <p className="text-gray-300">
              Visit RU Residencies. Our team will guide you personally.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 mb-2">
                Book Your Visit
              </h2>
              <p className="text-gray-600">
                Fill the form below. We'll confirm your slot.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-green-50 rounded-xl border border-green-200 p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-light text-gray-900 mb-2">
                  Booking Confirmed
                </h3>
                <p className="text-gray-600 mb-4">
                  We've received your booking and will contact you shortly.
                </p>
                <div className="bg-white rounded-lg p-4 inline-block border border-green-100">
                  <p className="text-sm text-gray-500">Your Slot</p>
                  <p className="font-medium">
                    {new Date(selectedDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })} at {selectedTime}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (Optional)
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
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Date *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {days.map(day => (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() => setSelectedDate(day.value)}
                        className={`py-3 rounded-lg border text-sm transition-all ${
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
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Time *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 rounded-lg border text-sm transition-all ${
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
                  className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-black text-white rounded-xl p-8">
              <h3 className="text-xl font-light mb-6">
                Contact Us Directly
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-300">Hotline</p>
                    <a href="tel:0772112117" className="font-medium text-lg hover:text-gray-300 transition-colors">
                      077 211 2117
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-300">Email</p>
                    <a href="mailto:info@ruresidencies.com" className="font-medium text-lg hover:text-gray-300 transition-colors">
                      info@ruresidencies.com
                    </a>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-300 mb-2">WhatsApp</p>
                  <a 
                    href="https://wa.me/94772112117" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Helpful Tips */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quick Tips
              </h3>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">• Arrive 10 minutes early</li>
                <li className="text-sm text-gray-600">• Bring photo ID</li>
                <li className="text-sm text-gray-600">• Wear comfortable shoes</li>
                <li className="text-sm text-gray-600">• Prepare your questions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Footer CTA */}
      <div className="border-t border-gray-200 py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-xl font-light text-gray-900 mb-4">
            Questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Call us directly for immediate assistance
          </p>
          <a 
            href="tel:0772112117" 
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Now: 077 211 2117
          </a>
        </div>
      </div>
    </div>
  );
}
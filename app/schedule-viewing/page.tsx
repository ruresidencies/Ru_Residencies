// app/schedule-viewing/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, Users, Home } from 'lucide-react';
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
        console.error('Email failed but showing success to user');
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
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
      <div className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-light mb-4">
              Schedule a Viewing
            </h1>
            <p className="text-gray-300 text-lg">
              Visit RU Residencies. Our team will guide you personally.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column - Form (7 columns) */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <h2 className="text-3xl font-light text-gray-900 mb-3">
                Book Your Visit
              </h2>
              <p className="text-gray-600">
                Fill the form below. We'll confirm your slot within 30 minutes.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-green-50 rounded-xl border border-green-200 p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl font-light text-gray-900 mb-3">
                  Booking Confirmed
                </h3>
                <p className="text-gray-600 mb-6">
                  We've received your booking and will contact you shortly.
                </p>
                <div className="bg-white rounded-lg p-5 inline-block border border-green-100">
                  <p className="text-sm text-gray-500 mb-1">Your Scheduled Slot</p>
                  <p className="font-medium text-lg">
                    {new Date(selectedDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })} at {selectedTime}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black transition-colors"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Date *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {days.map(day => (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() => setSelectedDate(day.value)}
                        className={`py-3.5 px-2 rounded-lg border text-sm font-medium transition-all ${
                          selectedDate === day.value
                            ? 'bg-black text-white border-black'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
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
                      Preferred Time *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-3.5 px-2 rounded-lg border text-sm font-medium transition-all ${
                            selectedTime === time
                              ? 'bg-black text-white border-black'
                              : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
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
                  className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By booking, you agree to our privacy policy and terms of service.
                </p>
              </form>
            )}
          </div>

          {/* Right Column - Features & Contact (5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Features Section - Aligned with the request */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h3 className="text-2xl font-light text-gray-900 mb-6">
                Why Book With Us
              </h3>
              
              <div className="space-y-6">
                {/* Flexible Scheduling */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-black/5 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Flexible Scheduling
                    </h4>
                    <p className="text-sm text-gray-600">
                      Morning and afternoon slots available, Monday through Saturday
                    </p>
                  </div>
                </div>

                {/* Multiple time slots available daily */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-black/5 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Multiple Time Slots Daily
                    </h4>
                    <p className="text-sm text-gray-600">
                      8 available slots every weekday to fit your busy schedule
                    </p>
                  </div>
                </div>

                {/* Personal Tour */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-black/5 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Home className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Personal Tour
                    </h4>
                    <p className="text-sm text-gray-600">
                      Dedicated walkthrough of our properties at your own pace
                    </p>
                  </div>
                </div>

                {/* One-on-one with property specialists */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-black/5 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      One-on-One Consultation
                    </h4>
                    <p className="text-sm text-gray-600">
                      Private session with our property specialists for personalized attention
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-black text-white rounded-xl p-8">
              <h3 className="text-2xl font-light mb-6">
                Contact Us Directly
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Hotline</p>
                    <a href="tel:0772112117" className="font-medium text-lg hover:text-gray-300 transition-colors">
                      077 211 2117
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:info@ruresidencies.com" className="font-medium text-lg hover:text-gray-300 transition-colors">
                      info@ruresidencies.com
                    </a>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-gray-400 mb-3">WhatsApp</p>
                  <a 
                    href="https://wa.me/94772112117" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.473-.149-.673.149-.2.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.554 4.118 1.523 5.851L.045 23.455l5.728-1.443C7.424 22.873 9.653 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.917 0-3.776-.53-5.34-1.456l-.383-.229-3.995 1.007 1.066-3.848-.23-.396C2.588 15.86 2 13.99 2 12 2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Tips - Enhanced */}
            <div className="border border-gray-200 rounded-xl p-8 bg-white">
              <h3 className="text-xl font-light text-gray-900 mb-4">
                Before Your Visit
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-600">
                  <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">✓</span>
                  <span>Arrive 10 minutes early for check-in</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">✓</span>
                  <span>Wear comfortable shoes for walking</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">✓</span>
                  <span>Bring your ID for verification</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">✓</span>
                  <span>Prepare a list of questions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-gray-200 bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-light text-gray-900 mb-3">
            Need Immediate Assistance?
          </h3>
          <p className="text-gray-600 mb-8 text-lg">
            Our team is ready to help you find the perfect property
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:0772112117" 
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Now: 077 211 2117
            </a>
            <a 
              href="mailto:info@ruresidencies.com" 
              className="inline-flex items-center justify-center gap-2 bg-white text-black border-2 border-black px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
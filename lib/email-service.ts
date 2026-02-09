// lib/email-service.ts
import emailjs from '@emailjs/browser';

// Initialize with your public key (get from EmailJS dashboard)
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID_HERE';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID_HERE';

emailjs.init(EMAILJS_PUBLIC_KEY);

export interface ScheduleFormData {
  name: string;
  phone: string;
  email?: string;
  selectedDate: string;
  selectedTime: string;
  source?: string; // 'homepage' or 'full-page'
}

export const sendScheduleEmail = async (data: ScheduleFormData): Promise<{ success: boolean; message?: string }> => {
  // Format the date nicely
  const formattedDate = new Date(data.selectedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const templateParams = {
    // Customer information
    customer_name: data.name,
    customer_phone: data.phone,
    customer_email: data.email || 'Not provided',
    
    // Tour details
    tour_date: formattedDate,
    tour_time: data.selectedTime,
    
    // Additional info
    submission_time: new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }),
    property_name: 'RU Residencies',
    source: data.source || 'website',
    
    // Raw data for reference
    raw_date: data.selectedDate,
    raw_time: data.selectedTime
  };

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    
    console.log('Email sent successfully:', response);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { 
      success: false, 
      message: 'Failed to submit. Please try again or contact us directly.' 
    };
  }
};
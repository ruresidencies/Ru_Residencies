'use client';

import { motion } from 'framer-motion';
import { MessageCircle, PhoneCall, Mail } from 'lucide-react';

export default function FloatingContactIcons() {
  const icons = [
    {
      icon: PhoneCall,
      color: 'from-navy-800 to-blue-700',
      link: 'tel:+94773711444',
      delay: 0,
      tooltip: 'Call Us',
    },
    {
      icon: Mail,
      color: 'from-blue-700 to-navy-800',
      link: 'mailto:sales@ruresidencieslk.com',
      delay: 0.2,
      tooltip: 'Email Us',
    },
    {
      icon: MessageCircle,
      color: 'from-navy-900 to-blue-800',
      link: '#',
      delay: 0.4,
      tooltip: 'Live Chat',
    },
  ];

  return (
    <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-50 flex flex-col gap-3">
      {icons.map((item, index) => (
        <motion.a
          key={index}
          href={item.link}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: item.delay, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className={`p-3 rounded-full bg-gradient-to-br ${item.color} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
            <item.icon className="w-5 h-5 text-white" />
          </div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {item.tooltip}
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-slate-900" />
          </div>
        </motion.a>
      ))}
    </div>
  );
}
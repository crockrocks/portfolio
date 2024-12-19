import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, error: false });

  // Replace this with your email
  const targetEmail = "harshpant3703@gmail.com";

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitStatus({ success: false, error: false });
      
      try {
        const form = e.target;
        const formData = new FormData(form);
        
        const response = await fetch(`https://formsubmit.co/${targetEmail}`, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          setSubmitStatus({ success: true, error: false });
          setFormData({ name: '', email: '', subject: '', message: '' });
          setTimeout(() => setSubmitStatus({ success: false, error: false }), 5000);
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error('Submission error:', error);
        setSubmitStatus({ success: false, error: true });
        setTimeout(() => setSubmitStatus({ success: false, error: false }), 5000);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div id='contact' className="section-container">
      <h2 className="section-heading">Get in Touch</h2>
      
      <motion.div 
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="card backdrop-blur-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* These hidden inputs are required for FormSubmit configuration */}
            <input type="hidden" name="_subject" value="New Contact Form Submission" />
            <input type="hidden" name="_captcha" value="true" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value={window.location.href} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-gray-800/50 border ${errors.name ? 'border-red-500' : 'border-gray-700'} 
                    rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 
                    transition-all duration-300`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-gray-800/50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} 
                    rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 
                    transition-all duration-300`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject (Optional)</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 
                  focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={`w-full bg-gray-800/50 border ${errors.message ? 'border-red-500' : 'border-gray-700'} 
                  rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 
                  transition-all duration-300`}
                placeholder="Your message here..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`gradient-button flex items-center gap-2 ${isSubmitting ? 'opacity-75' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: submitStatus.success ? 1 : 0,
              scale: submitStatus.success ? 1 : 0.9,
              y: submitStatus.success ? 0 : 20
            }}
            className={`fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg 
              flex items-center gap-2 shadow-lg ${submitStatus.success ? 'visible' : 'invisible'}`}
          >
            <CheckCircle className="w-5 h-5" />
            <span>Message sent successfully!</span>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: submitStatus.error ? 1 : 0,
              scale: submitStatus.error ? 1 : 0.9,
              y: submitStatus.error ? 0 : 20
            }}
            className={`fixed bottom-8 right-8 bg-red-500 text-white px-6 py-3 rounded-lg 
              flex items-center gap-2 shadow-lg ${submitStatus.error ? 'visible' : 'invisible'}`}
          >
            <AlertCircle className="w-5 h-5" />
            <span>Failed to send message. Please try again.</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
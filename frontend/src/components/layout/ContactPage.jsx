import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from './Footer';

export default function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "",
    subject: "",
    message: "",
    serviceType: "",
    urgency: "normal"
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Support",
      value: "support@atlantical.pt",
      description: "Get answers within 24 hours",
      action: () => window.location.href = "mailto:support@atlantical.pt"
    },
    {
      icon: "📞",
      title: "Phone Support",
      value: "+351 123 456 789",
      description: "Mon-Fri, 9AM-6PM (UTC)",
      action: () => window.location.href = "tel:+351123456789"
    },
    {
      icon: "💬",
      title: "Live Chat",
      value: "Available Now",
      description: "Instant help from our team",
      action: () => {
        // This would open a chat widget
        alert("Chat feature coming soon!");
      }
    },
    {
      icon: "📍",
      title: "Office Location",
      value: "Lisbon, Portugal",
      description: "Schedule an in-person meeting",
      action: () => {
        // This would open maps or scheduling
        alert("Office visits by appointment only");
      }
    }
  ];

  const serviceTypes = [
    { value: "visa-application", label: "Visa Application Support" },
    { value: "housing", label: "Housing Solutions" },
    { value: "banking", label: "Banking & Finance" },
    { value: "legal", label: "Legal Support" },
    { value: "healthcare", label: "Healthcare Setup" },
    { value: "business", label: "Business Setup" },
    { value: "education", label: "Education Services" },
    { value: "general", label: "General Inquiry" },
    { value: "partnership", label: "Partnership Opportunity" }
  ];

  const urgencyLevels = [
    { value: "low", label: "Low - General inquiry", color: "#10b981" },
    { value: "normal", label: "Normal - Response within 24h", color: "#E2725B" },
    { value: "high", label: "High - Response within 4h", color: "#f59e0b" },
    { value: "urgent", label: "Urgent - Immediate attention", color: "#ef4444" }
  ];

  if (submitted) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '3rem',
            textAlign: 'center',
            maxWidth: '600px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✅</div>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: '#059669', 
            marginBottom: '1rem',
            fontFamily: 'Inter, sans-serif'
          }}>
            Message Sent Successfully!
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1.125rem', 
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Thank you for contacting Atlantical! We've received your message and our team will respond to you within {form.urgency === 'urgent' ? 'the next hour' : form.urgency === 'high' ? '4 hours' : '24 hours'}.
          </p>
          
          <div style={{
            background: '#f8fafc',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              color: '#1f2937', 
              marginBottom: '1rem'
            }}>
              What happens next?
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#4b5563' }}>
              <li style={{ marginBottom: '0.5rem' }}>Our team will review your inquiry</li>
              <li style={{ marginBottom: '0.5rem' }}>You'll receive a personalized response via email</li>
              <li style={{ marginBottom: '0.5rem' }}>We'll schedule a consultation if needed</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'linear-gradient(135deg, #E2725B 0%, #A94438 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Return Home
            </button>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'transparent',
                color: '#E2725B',
                border: '2px solid #E2725B',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Send Another Message
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #E2725B 0%, #A94438 100%)',
          color: 'white',
          padding: '4rem 1rem',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '700', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Get In Touch
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            opacity: 0.9, 
            maxWidth: '600px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Ready to start your Portugal journey? Our expert team is here to help you every step of the way.
          </p>
        </div>
      </motion.section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '700', 
              color: '#1f2937', 
              marginBottom: '1.5rem'
            }}>
              Contact Methods
            </h2>
            
            {/* Featured Email Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => window.location.href = "mailto:support@atlantical.pt"}
              style={{
                background: 'linear-gradient(135deg, #E2725B 0%, #A94438 100%)',
                color: 'white',
                padding: '2rem',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 8px 25px rgba(0, 112, 243, 0.3)',
                marginBottom: '1.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 12px 35px rgba(0, 112, 243, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 112, 243, 0.3)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>📧</div>
                <div>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'white', 
                    marginBottom: '0.25rem'
                  }}>
                    Email Support
                  </h3>
                  <p style={{ 
                    color: 'rgba(255, 255, 255, 0.9)', 
                    fontWeight: '600', 
                    marginBottom: '0.25rem',
                    fontSize: '1.125rem'
                  }}>
                    support@atlantical.pt
                  </p>
                </div>
              </div>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                fontSize: '1rem',
                margin: 0,
                lineHeight: '1.5'
              }}>
                Get personalized answers within 24 hours. Our expert team handles all relocation inquiries with dedicated support.
              </p>
            </motion.div>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {contactMethods.slice(1).map((method, index) => (
                <motion.div
                  key={index + 1}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  onClick={method.action}
                  style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '2rem' }}>{method.icon}</div>
                    <div>
                      <h3 style={{ 
                        fontSize: '1.125rem', 
                        fontWeight: '600', 
                        color: '#1f2937', 
                        marginBottom: '0.25rem'
                      }}>
                        {method.title}
                      </h3>
                      <p style={{ 
                        color: '#E2725B', 
                        fontWeight: '600', 
                        marginBottom: '0.25rem'
                      }}>
                        {method.value}
                      </p>
                      <p style={{ 
                        color: '#6b7280', 
                        fontSize: '0.875rem',
                        margin: 0
                      }}>
                        {method.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FAQ Quick Links */}
            <div style={{ 
              background: 'white', 
              padding: '1.5rem', 
              borderRadius: '12px', 
              border: '1px solid #e2e8f0',
              marginTop: '2rem'
            }}>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600', 
                color: '#1f2937', 
                marginBottom: '1rem'
              }}>
                📚 Quick Resources
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={() => navigate('/documents')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#E2725B',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    padding: '0.5rem 0'
                  }}
                >
                  → Document Checklist
                </button>
                <button
                  onClick={() => navigate('/services')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#E2725B',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    padding: '0.5rem 0'
                  }}
                >
                  → Our Services & Pricing
                </button>
                <button
                  onClick={() => navigate('/about')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#E2725B',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    padding: '0.5rem 0'
                  }}
                >
                  → About Our Team
                </button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}
          >
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '700', 
              color: '#1f2937', 
              marginBottom: '1.5rem'
            }}>
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Name and Email Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '600', 
                    color: '#374151', 
                    marginBottom: '0.5rem'
                  }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{ 
                      width: '100%',
                      padding: '12px 16px', 
                      borderRadius: '8px', 
                      border: '1px solid #d1d5db', 
                      fontSize: '16px',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#E2725B'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '600', 
                    color: '#374151', 
                    marginBottom: '0.5rem'
                  }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{ 
                      width: '100%',
                      padding: '12px 16px', 
                      borderRadius: '8px', 
                      border: '1px solid #d1d5db', 
                      fontSize: '16px',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#E2725B'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
              </div>

              {/* Phone and Service Type Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '600', 
                    color: '#374151', 
                    marginBottom: '0.5rem'
                  }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+351 123 456 789"
                    value={form.phone}
                    onChange={handleChange}
                    style={{ 
                      width: '100%',
                      padding: '12px 16px', 
                      borderRadius: '8px', 
                      border: '1px solid #d1d5db', 
                      fontSize: '16px',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#E2725B'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '600', 
                    color: '#374151', 
                    marginBottom: '0.5rem'
                  }}>
                    Service Interest
                  </label>
                  <select
                    name="serviceType"
                    value={form.serviceType}
                    onChange={handleChange}
                    style={{ 
                      width: '100%',
                      padding: '12px 16px', 
                      borderRadius: '8px', 
                      border: '1px solid #d1d5db', 
                      fontSize: '16px',
                      fontFamily: 'Inter, sans-serif',
                      background: 'white'
                    }}
                  >
                    <option value="">Select a service</option>
                    {serviceTypes.map(service => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: '600', 
                  color: '#374151', 
                  marginBottom: '0.5rem'
                }}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="How can we help you?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  style={{ 
                    width: '100%',
                    padding: '12px 16px', 
                    borderRadius: '8px', 
                    border: '1px solid #d1d5db', 
                    fontSize: '16px',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#E2725B'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              {/* Urgency Level */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: '600', 
                  color: '#374151', 
                  marginBottom: '0.5rem'
                }}>
                  Priority Level
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                  {urgencyLevels.map(level => (
                    <label key={level.value} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.75rem',
                      border: `2px solid ${form.urgency === level.value ? level.color : '#e5e7eb'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: form.urgency === level.value ? `${level.color}10` : 'white',
                      transition: 'all 0.2s'
                    }}>
                      <input
                        type="radio"
                        name="urgency"
                        value={level.value}
                        checked={form.urgency === level.value}
                        onChange={handleChange}
                        style={{ marginRight: '0.5rem' }}
                      />
                      <span style={{ 
                        fontSize: '0.875rem',
                        color: form.urgency === level.value ? level.color : '#374151',
                        fontWeight: form.urgency === level.value ? '600' : '400'
                      }}>
                        {level.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: '600', 
                  color: '#374151', 
                  marginBottom: '0.5rem'
                }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  placeholder="Tell us about your Portugal relocation plans and how we can help..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  style={{ 
                    width: '100%',
                    padding: '12px 16px', 
                    borderRadius: '8px', 
                    border: '1px solid #d1d5db', 
                    fontSize: '16px',
                    fontFamily: 'Inter, sans-serif',
                    resize: 'vertical',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#E2725B'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                style={{ 
                  background: loading ? '#9ca3af' : 'linear-gradient(135deg, #E2725B 0%, #A94438 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '16px 32px', 
                  borderRadius: '8px', 
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(0, 112, 243, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid transparent',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Sending...
                  </>
                ) : (
                  <>
                    📧 Send Message
                  </>
                )}
              </button>
            </form>

            {/* Privacy Note */}
            <div style={{
              background: '#f8fafc',
              padding: '1rem',
              borderRadius: '8px',
              marginTop: '1.5rem',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              🔒 <strong>Privacy:</strong> Your information is secure and will only be used to respond to your inquiry. We never share your data with third parties.
            </div>
          </motion.div>
        </div>
      </div>

      {/* Additional Styles */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <Footer />
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Footer from '../layout/Footer';

const SettlementServicesPage = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);

  // Payment handler - redirect to payment page
  const handlePayment = (serviceName, price, type = 'service') => {
    const cleanPrice = typeof price === 'string' ? price.replace(/[^\d]/g, '') : price;
    const priceInCents = parseInt(cleanPrice) * 100; // Convert euros to cents
    
    navigate(`/payment?service=${encodeURIComponent(serviceName)}&price=${priceInCents}&type=${type}`);
  };

  // Handle service booking
  const handleBookService = (serviceTitle) => {
    const service = services.find(s => s.title === serviceTitle);
    if (service) {
      const price = service.pricing.replace(/[^\d]/g, '');
      handlePayment(serviceTitle, price, 'service');
    }
  };

  // Handle package purchase
  const handlePackagePurchase = (packageName, price) => {
    const cleanPrice = price.replace(/[^\d]/g, '');
    handlePayment(packageName, cleanPrice, 'package');
  };

  const services = [
    {
      id: 'banking',
      title: 'Banking & Finance',
      icon: '🏦',
      description: 'Open bank accounts, understand Portuguese banking system, and manage your finances',
      features: [
        'Bank account opening assistance',
        'Home loan consultation',
        'Investment opportunities',
        'Tax optimization strategies',
        'Insurance products comparison',
        'Credit score building'
      ],
      pricing: 'From €150',
      duration: '2-3 business days',
      included: [
        'Bank selection consultation',
        'Document preparation',
        'Appointment scheduling',
        'Translation services',
        'Follow-up support'
      ]
    },
    {
      id: 'housing',
      title: 'Housing Solutions',
      icon: '🏠',
      description: 'Find your perfect home in Portugal with our comprehensive housing services',
      features: [
        'Property search and viewing',
        'Rental assistance',
        'Purchase consultation',
        'Legal document review',
        'Utility setup',
        'Neighborhood guidance'
      ],
      pricing: 'From €300',
      duration: '1-4 weeks',
      included: [
        'Personalized property search',
        'Viewing coordination',
        'Contract negotiation',
        'Legal support',
        'Move-in assistance'
      ]
    },
    {
      id: 'legal',
      title: 'Legal Support',
      icon: '⚖️',
      description: 'Navigate Portuguese legal requirements with expert guidance',
      features: [
        'NIF registration',
        'Residence permit applications',
        'Contract review and translation',
        'Legal document preparation',
        'Court representation',
        'Ongoing legal consultation'
      ],
      pricing: 'From €200',
      duration: '1-2 weeks',
      included: [
        'Initial consultation',
        'Document preparation',
        'Government filing',
        'Status tracking',
        '6-month support'
      ]
    },
    {
      id: 'healthcare',
      title: 'Healthcare Setup',
      icon: '🏥',
      description: 'Access Portuguese healthcare system and find the right medical care',
      features: [
        'Health system registration',
        'Doctor and specialist referrals',
        'Health insurance consultation',
        'Prescription management',
        'Emergency contact setup',
        'Medical record transfer'
      ],
      pricing: 'From €100',
      duration: '1 week',
      included: [
        'SNS registration',
        'Health center assignment',
        'Insurance comparison',
        'Emergency planning',
        'Ongoing support'
      ]
    },
    {
      id: 'education',
      title: 'Education Services',
      icon: '🎓',
      description: 'School enrollment and educational support for families',
      features: [
        'School research and selection',
        'Enrollment assistance',
        'Document validation',
        'Language learning programs',
        'University guidance',
        'Continuing education options'
      ],
      pricing: 'From €250',
      duration: '2-3 weeks',
      included: [
        'School consultation',
        'Application assistance',
        'Document preparation',
        'Interview coaching',
        'Follow-up support'
      ]
    },
    {
      id: 'transport',
      title: 'Transportation',
      icon: '🚗',
      description: 'Get mobile in Portugal with driving licenses, car purchases, and public transport',
      features: [
        'Driving license conversion',
        'Car purchase assistance',
        'Insurance comparison',
        'Public transport guidance',
        'Vehicle registration',
        'Parking solutions'
      ],
      pricing: 'From €120',
      duration: '1-2 weeks',
      included: [
        'License consultation',
        'DMV appointments',
        'Insurance setup',
        'Registration assistance',
        'Transport planning'
      ]
    },
    {
      id: 'language',
      title: 'Language Learning',
      icon: '🗣️',
      description: 'Master Portuguese with personalized language learning programs',
      features: [
        'Private Portuguese lessons',
        'Group classes',
        'Business Portuguese',
        'Certification preparation',
        'Cultural integration',
        'Online learning platforms'
      ],
      pricing: 'From €40/hour',
      duration: 'Ongoing',
      included: [
        'Level assessment',
        'Personalized curriculum',
        'Learning materials',
        'Progress tracking',
        'Cultural context'
      ]
    },
    {
      id: 'business',
      title: 'Business Setup',
      icon: '💼',
      description: 'Start or relocate your business to Portugal with expert guidance',
      features: [
        'Company registration',
        'Business plan development',
        'Tax registration',
        'Accounting setup',
        'Licensing assistance',
        'Banking for business'
      ],
      pricing: 'From €500',
      duration: '2-4 weeks',
      included: [
        'Business consultation',
        'Registration process',
        'Tax setup',
        'Banking assistance',
        'Ongoing support'
      ]
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle Integration',
      icon: '🌟',
      description: 'Integrate into Portuguese culture and build your social network',
      features: [
        'Cultural orientation',
        'Social networking events',
        'Local community connections',
        'Hobby and interest groups',
        'Local services guide',
        'Expat community access'
      ],
      pricing: 'From €80',
      duration: 'Ongoing',
      included: [
        'Cultural workshop',
        'Community introductions',
        'Event invitations',
        'Local guide',
        'Ongoing networking'
      ]
    }
  ];

  const packages = [
    {
      name: 'Essential Package',
      price: '€999',
      description: 'Perfect for individuals starting their Portugal journey',
      services: ['Banking & Finance', 'Legal Support', 'Healthcare Setup'],
      savings: 'Save €150',
      popular: false
    },
    {
      name: 'Family Package',
      price: '€1,799',
      description: 'Comprehensive support for families moving to Portugal',
      services: ['Banking & Finance', 'Housing Solutions', 'Legal Support', 'Healthcare Setup', 'Education Services'],
      savings: 'Save €350',
      popular: true
    },
    {
      name: 'Business Package',
      price: '€2,299',
      description: 'Complete business relocation and setup services',
      services: ['Banking & Finance', 'Legal Support', 'Business Setup', 'Housing Solutions', 'Transportation'],
      savings: 'Save €500',
      popular: false
    },
    {
      name: 'Premium Package',
      price: '€2,999',
      description: 'All-inclusive relocation experience with premium support',
      services: ['All Services Included', 'Priority Support', 'Dedicated Manager'],
      savings: 'Save €800',
      popular: false
    }
  ];

  const ServiceModal = ({ service, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '2rem'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        style={{
          background: 'white',
          borderRadius: '16px',
          padding: '3rem',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
            {service.icon} {service.title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ✕
          </button>
        </div>

        <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem', lineHeight: '1.6' }}>
          {service.description}
        </p>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
            What's Included:
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.5rem' }}>
            {service.included.map((item, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#10b981' }}>✓</span>
                <span style={{ color: '#374151' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0070f3' }}>{service.pricing}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Starting Price</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0070f3' }}>{service.duration}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Timeline</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0070f3' }}>24/7</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Support</div>
          </div>
        </div>

        <button
          onClick={() => handleBookService(service.title)}
          style={{
            background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 20px rgba(0, 112, 243, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Get Started with {service.title}
        </button>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .services-header { padding: 3rem 0 !important; }
          .services-title { font-size: 2.5rem !important; }
          .services-description { font-size: 1.1rem !important; }
          .stats-flex { 
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          .services-grid { grid-template-columns: 1fr !important; }
          .packages-grid { grid-template-columns: 1fr !important; }
          .service-card { margin-bottom: 2rem !important; }
          .cta-section { padding: 3rem 1rem !important; }
          .cta-title { font-size: 2rem !important; }
        }
        @media (max-width: 480px) {
          .services-header { padding: 2rem 0 !important; }
          .services-title { font-size: 2rem !important; }
          .services-description { font-size: 1rem !important; }
          .service-card { padding: 1.5rem !important; }
          .package-card { padding: 1.5rem !important; }
          .stats-flex { gap: 1rem !important; }
        }
      `}</style>
      
      <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
        {/* Header */}
        <header className="services-header" style={{
          background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
          color: 'white',
          padding: '4rem 0',
          marginBottom: '4rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
            <h1 className="services-title" style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              Settlement Services
            </h1>
            <p className="services-description" style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              Comprehensive support services to make your transition to Portugal smooth and successful
            </p>
            
            <div className="stats-flex" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700' }}>500+</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Families Helped</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700' }}>98%</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Success Rate</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700' }}>24/7</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Support</div>
            </div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Services Grid */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1f2937',
            textAlign: 'center',
            marginBottom: '3rem',
            fontFamily: 'Inter, sans-serif'
          }}>
            Our Services
          </h2>
          
          <div className="services-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="service-card"
                style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setSelectedService(service)}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  {service.icon}
                </div>
                
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {service.title}
                </h3>
                
                <p style={{
                  color: '#6b7280',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6',
                  textAlign: 'center',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {service.description}
                </p>
                
                <div style={{
                  display: 'grid',
                  gap: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      color: '#374151'
                    }}>
                      <span style={{ color: '#10b981' }}>✓</span>
                      {feature}
                    </div>
                  ))}
                  {service.features.length > 3 && (
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      fontStyle: 'italic'
                    }}>
                      +{service.features.length - 3} more features
                    </div>
                  )}
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: '#f8fafc',
                  borderRadius: '8px'
                }}>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0070f3' }}>
                      {service.pricing}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {service.duration}
                    </div>
                  </div>
                  <div style={{
                    background: '#0070f3',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    Learn More
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Service Packages */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1f2937',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            Service Packages
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            textAlign: 'center',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            Save money with our bundled service packages designed for different relocation needs
          </p>
          
          <div className="packages-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: pkg.popular ? 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)' : 'white',
                  color: pkg.popular ? 'white' : '#1f2937',
                  padding: '2.5rem',
                  borderRadius: '16px',
                  boxShadow: pkg.popular ? '0 20px 40px rgba(0, 112, 243, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.05)',
                  border: pkg.popular ? 'none' : '1px solid #e5e7eb',
                  position: 'relative',
                  transform: pkg.popular ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
              >
                {pkg.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: 'white',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    Most Popular
                  </div>
                )}
                
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem'
                }}>
                  {pkg.name}
                </h3>
                
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  marginBottom: '0.5rem'
                }}>
                  {pkg.price}
                </div>
                
                <div style={{
                  fontSize: '0.875rem',
                  opacity: 0.8,
                  marginBottom: '1rem'
                }}>
                  {pkg.savings}
                </div>
                
                <p style={{
                  marginBottom: '2rem',
                  opacity: 0.9,
                  lineHeight: '1.6'
                }}>
                  {pkg.description}
                </p>
                
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  marginBottom: '2rem',
                  display: 'grid',
                  gap: '0.75rem'
                }}>
                  {pkg.services.map((service, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ color: pkg.popular ? 'white' : '#10b981' }}>✓</span>
                      {service}
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handlePackagePurchase(pkg.name, pkg.price)}
                  style={{
                    background: pkg.popular ? 'white' : 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
                    color: pkg.popular ? '#0070f3' : 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(0, 112, 243, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Choose {pkg.name}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
          color: 'white',
          padding: '4rem 2rem',
          borderRadius: '20px',
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
            Ready to Start Your Portugal Journey?
          </h2>
          <p style={{ fontSize: '1.125rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Get a free consultation and custom settlement plan tailored to your needs
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/contact')}
              style={{
                background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(0, 112, 243, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              📅 Book Free Consultation
            </button>
            
            <button
              onClick={() => navigate('/contact')}
              style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#1f2937';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              💬 Contact Us
            </button>
          </div>
        </section>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
    <Footer />
    </>
  );
};

export default SettlementServicesPage;
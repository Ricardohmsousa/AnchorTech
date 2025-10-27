import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Footer from '../layout/Footer';

const AboutPage = () => {
  const navigate = useNavigate();
  const teamMembers = [
    {
      name: 'Maria Santos',
      role: 'Founder & CEO',
      image: '👩‍💼',
      bio: 'Former immigration lawyer with 15+ years experience helping families relocate to Portugal. Fluent in Portuguese, English, Spanish, and French.',
      expertise: ['Immigration Law', 'Business Setup', 'Strategic Planning']
    },
    {
      name: 'João Silva',
      role: 'Head of Legal Services',
      image: '👨‍⚖️',
      bio: 'Licensed Portuguese attorney specializing in residency permits, business law, and real estate transactions.',
      expertise: ['Legal Documentation', 'Visa Applications', 'Real Estate Law']
    },
    {
      name: 'Ana Rodriguez',
      role: 'Settlement Coordinator',
      image: '👩‍💻',
      bio: 'Bilingual coordinator who manages client onboarding and ensures smooth transitions for families.',
      expertise: ['Client Relations', 'Housing Solutions', 'Cultural Integration']
    },
    {
      name: 'Carlos Oliveira',
      role: 'Financial Advisor',
      image: '👨‍💰',
      bio: 'Certified financial planner helping clients optimize their finances and investment strategies in Portugal.',
      expertise: ['Banking Setup', 'Investment Planning', 'Tax Optimization']
    }
  ];

  const milestones = [
    {
      year: '2018',
      title: 'Company Founded',
      description: 'TechAnchor was established to help digital nomads and remote workers relocate to Portugal.',
      icon: '🚀'
    },
    {
      year: '2019',
      title: 'First 100 Families',
      description: 'Successfully helped our first 100 families settle in Portugal with comprehensive support.',
      icon: '🏠'
    },
    {
      year: '2020',
      title: 'Service Expansion',
      description: 'Expanded services to include business setup, education, and comprehensive settlement packages.',
      icon: '📈'
    },
    {
      year: '2021',
      title: 'Digital Innovation',
      description: 'Launched our digital platform making relocation services more accessible and efficient.',
      icon: '💻'
    },
    {
      year: '2022',
      title: 'Partnership Network',
      description: 'Built strong partnerships with banks, real estate agencies, and legal firms across Portugal.',
      icon: '🤝'
    },
    {
      year: '2023',
      title: '500+ Success Stories',
      description: 'Reached the milestone of helping over 500 families successfully relocate to Portugal.',
      icon: '🎉'
    }
  ];

  const values = [
    {
      title: 'Transparency',
      description: 'Clear communication and honest guidance throughout your relocation journey.',
      icon: '🔍'
    },
    {
      title: 'Expertise',
      description: 'Deep knowledge of Portuguese law, culture, and practical relocation requirements.',
      icon: '🧠'
    },
    {
      title: 'Personalization',
      description: 'Tailored solutions that fit your unique circumstances and goals.',
      icon: '🎯'
    },
    {
      title: 'Support',
      description: '24/7 support and guidance from application to successful settlement.',
      icon: '🤲'
    },
    {
      title: 'Quality',
      description: 'High-quality services with attention to detail and commitment to excellence.',
      icon: '⭐'
    },
    {
      title: 'Community',
      description: 'Building a supportive community of successful expats in Portugal.',
      icon: '👥'
    }
  ];

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .about-hero { padding: 3rem 0 !important; }
          .about-hero h1 { font-size: 2.5rem !important; }
          .about-hero p { font-size: 1.1rem !important; }
          .stats-grid { gap: 2rem !important; }
          .team-grid { grid-template-columns: 1fr !important; }
          .timeline-grid { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .cta-content { padding: 3rem 1rem !important; }
          .cta-title { font-size: 2rem !important; }
        }
        @media (max-width: 480px) {
          .about-hero h1 { font-size: 2rem !important; }
          .about-hero p { font-size: 1rem !important; }
          .stats-grid { 
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          .section-title { font-size: 2rem !important; }
          .team-card, .timeline-card, .value-card {
            padding: 1.5rem !important;
          }
        }
      `}</style>
      
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        {/* Hero Section */}
        <section className="about-hero" style={{
          background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
          color: 'white',
          padding: '5rem 0',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif' }}
            >
              About TechAnchor
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ 
                fontSize: '1.25rem', 
                opacity: 0.9, 
                maxWidth: '800px', 
                margin: '0 auto 3rem',
                lineHeight: '1.6',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              We're passionate about helping individuals and families make Portugal their new home. 
              Since 2018, we've been the trusted partner for hundreds of successful relocations.
            </motion.p>
            
            <motion.div 
              className="stats-grid"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}
            >
              <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800' }}>500+</div>
              <div style={{ fontSize: '1rem', opacity: 0.8 }}>Families Relocated</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800' }}>98%</div>
              <div style={{ fontSize: '1rem', opacity: 0.8 }}>Success Rate</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800' }}>5+</div>
              <div style={{ fontSize: '1rem', opacity: 0.8 }}>Years Experience</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800' }}>24/7</div>
              <div style={{ fontSize: '1rem', opacity: 0.8 }}>Support Available</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
                Our Mission
              </h2>
              <p style={{ 
                fontSize: '1.125rem', 
                color: '#6b7280', 
                lineHeight: '1.7', 
                marginBottom: '2rem',
                fontFamily: 'Inter, sans-serif'
              }}>
                To make Portugal accessible to everyone seeking a better quality of life, 
                by providing comprehensive, transparent, and personalized relocation services 
                that eliminate the stress and confusion of international moves.
              </p>
              <p style={{ 
                fontSize: '1.125rem', 
                color: '#6b7280', 
                lineHeight: '1.7',
                fontFamily: 'Inter, sans-serif'
              }}>
                We believe that relocating to a new country should be an exciting adventure, 
                not a bureaucratic nightmare. That's why we handle all the complex details 
                so you can focus on building your new life in beautiful Portugal.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                background: 'linear-gradient(135deg, #e6f3ff 0%, #cce7ff 100%)',
                padding: '3rem',
                borderRadius: '20px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🇵🇹</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                Why Portugal?
              </h3>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                textAlign: 'left',
                display: 'grid',
                gap: '0.75rem'
              }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#10b981' }}>✓</span>
                  <span>Excellent quality of life</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#10b981' }}>✓</span>
                  <span>Affordable cost of living</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#10b981' }}>✓</span>
                  <span>Beautiful weather year-round</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#10b981' }}>✓</span>
                  <span>Welcoming expat community</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#10b981' }}>✓</span>
                  <span>EU citizenship pathway</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#10b981' }}>✓</span>
                  <span>Rich culture and history</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1f2937',
            textAlign: 'center',
            marginBottom: '3rem',
            fontFamily: 'Inter, sans-serif'
          }}>
            Our Values
          </h2>
          
          <div className="values-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {value.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '0.75rem',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {value.title}
                </h3>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1f2937',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Meet Our Team
          </h2>
          
          <div className="team-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1rem'
                }}>
                  {member.image}
                </div>
                
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '0.5rem'
                }}>
                  {member.name}
                </h3>
                
                <div style={{
                  fontSize: '1rem',
                  color: '#0070f3',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  {member.role}
                </div>
                
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  fontSize: '0.875rem'
                }}>
                  {member.bio}
                </p>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  justifyContent: 'center'
                }}>
                  {member.expertise.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: '#e6f3ff',
                        color: '#0070f3',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1f2937',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Our Journey
          </h2>
          
          <div style={{ display: 'grid', gap: '2rem' }}>
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: index % 2 === 0 ? '1fr auto 1fr' : '1fr auto 1fr',
                  gap: '2rem',
                  alignItems: 'center'
                }}
              >
                {index % 2 === 0 ? (
                  <>
                    <div style={{ textAlign: 'right' }}>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#1f2937',
                        marginBottom: '0.5rem'
                      }}>
                        {milestone.title}
                      </h3>
                      <p style={{
                        color: '#6b7280',
                        lineHeight: '1.6'
                      }}>
                        {milestone.description}
                      </p>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        color: 'white'
                      }}>
                        {milestone.icon}
                      </div>
                      <div style={{
                        background: '#0070f3',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginTop: '1rem'
                      }}>
                        {milestone.year}
                      </div>
                    </div>
                    
                    <div></div>
                  </>
                ) : (
                  <>
                    <div></div>
                    
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        color: 'white'
                      }}>
                        {milestone.icon}
                      </div>
                      <div style={{
                        background: '#0070f3',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginTop: '1rem'
                      }}>
                        {milestone.year}
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'left' }}>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#1f2937',
                        marginBottom: '0.5rem'
                      }}>
                        {milestone.title}
                      </h3>
                      <p style={{
                        color: '#6b7280',
                        lineHeight: '1.6'
                      }}>
                        {milestone.description}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
            Ready to Start Your Portugal Journey?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            opacity: 0.9,
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Join hundreds of families who have successfully made Portugal their new home with our expert guidance.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/application')}
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
              Get Started Today
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
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default AboutPage;
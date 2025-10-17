import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "../../../components/ProgressIndicator";

// Add CSS animations and responsive styles
const styles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .visa-cta-button {
    background: linear-gradient(135deg, #0070f3 0%, #0053cc 100%);
    transition: all 0.3s ease;
  }
  
  .visa-cta-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 112, 243, 0.3);
  }
  
  .visa-feature-card {
    transition: all 0.3s ease;
  }
  
  .visa-feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12) !important;
  }
  
  @media (max-width: 768px) {
    .visa-features-grid {
      grid-template-columns: 1fr !important;
    }
    
    .visa-types-grid {
      grid-template-columns: 1fr !important;
    }
    
    .visa-process-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

export default function VisaGuidanceService() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Inject styles
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const handleGetStarted = () => {
    navigate("/register");
  };

  const handleContact = () => {
    navigate("/contact");
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div style={{ 
      fontFamily: 'Lato, sans-serif',
      color: '#222',
      lineHeight: '1.6'
    }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '8rem 2rem 6rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.2)',
          zIndex: 1
        }}></div>
        
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '900',
            marginBottom: '1.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Portugal Visa & Residency Guidance
          </h1>
          
          <p style={{ 
            fontSize: '1.3rem',
            marginBottom: '3rem',
            opacity: 0.95,
            lineHeight: '1.6'
          }}>
            Expert step-by-step support for all Portugal visa and residency types. 
            From Digital Nomad to Golden Visa - we've got you covered.
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={handleGetStarted}
              style={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#667eea',
                border: 'none',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: '700',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={e => e.target.style.background = '#ffffff'}
              onMouseOut={e => e.target.style.background = 'rgba(255, 255, 255, 0.9)'}
            >
              Start Your Visa Journey →
            </button>
            
            <button 
              onClick={handleContact}
              style={{ 
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: '700',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={e => {
                e.target.style.background = 'white';
                e.target.style.color = '#667eea';
              }}
              onMouseOut={e => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section style={{ 
        background: '#f8f9fb',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem' 
          }}>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0070f3' }}>500+</div>
              <div style={{ fontSize: '16px', color: '#666' }}>Successful Visa Applications</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#10b981' }}>95%</div>
              <div style={{ fontSize: '16px', color: '#666' }}>Approval Rate</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#f59e0b' }}>30</div>
              <div style={{ fontSize: '16px', color: '#666' }}>Countries Served</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#8b5cf6' }}>⭐ 4.9</div>
              <div style={{ fontSize: '16px', color: '#666' }}>Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Types Section */}
      <section style={{ 
        padding: '6rem 2rem',
        background: '#ffffff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2.8rem', 
              fontWeight: '900',
              marginBottom: '1rem',
              color: '#222'
            }}>
              Popular Portugal Visa Types
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              We help with all visa types - find the perfect path to Portugal for your situation
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem'
          }} className="visa-types-grid">
            {[
              {
                icon: "💻",
                title: "Digital Nomad Visa",
                description: "For remote workers and freelancers earning €2,760+/month",
                benefits: ["1-year renewable", "Work from Portugal", "EU travel access"],
                popular: true
              },
              {
                icon: "🏖️", 
                title: "D7 Passive Income Visa",
                description: "For retirees and passive income earners",
                benefits: ["Renewable pathway", "Family reunification", "Low income requirement"],
                popular: true
              },
              {
                icon: "🏆",
                title: "Golden Visa", 
                description: "Investment-based residency with EU citizenship path",
                benefits: ["€280k+ investment", "Fast-track to citizenship", "No stay requirement"],
                popular: false
              },
              {
                icon: "🎓",
                title: "Student & Work Visas",
                description: "For education and employment opportunities",
                benefits: ["Study in Portugal", "Work authorization", "Post-graduation options"],
                popular: false
              }
            ].map((visa, i) => (
              <div 
                key={i}
                className="visa-feature-card"
                style={{ 
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '2rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0',
                  position: 'relative'
                }}
              >
                {visa.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '20px',
                    background: '#f59e0b',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    MOST POPULAR
                  </div>
                )}
                
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1rem'
                }}>
                  {visa.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: '#222'
                }}>
                  {visa.title}
                </h3>
                <p style={{ 
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {visa.description}
                </p>
                
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0 
                }}>
                  {visa.benefits.map((benefit, j) => (
                    <li key={j} style={{ 
                      color: '#10b981',
                      marginBottom: '0.5rem',
                      fontSize: '14px'
                    }}>
                      ✓ {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section style={{ 
        padding: '6rem 2rem',
        background: '#f8f9fb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2.8rem', 
              fontWeight: '900',
              marginBottom: '1rem',
              color: '#222'
            }}>
              How We Support You
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              lineHeight: '1.6'
            }}>
              Comprehensive guidance every step of the way
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem'
          }} className="visa-features-grid">
            {[
              {
                icon: "🎯",
                title: "Visa Eligibility Assessment",
                description: "We analyze your situation to identify the perfect visa type and ensure you meet all requirements"
              },
              {
                icon: "📋", 
                title: "Document Preparation",
                description: "Complete guidance on paperwork, translations, and document requirements specific to your visa"
              },
              {
                icon: "⏰",
                title: "Timeline Planning", 
                description: "Detailed timelines and milestone tracking to ensure your application stays on schedule"
              },
              {
                icon: "🤝",
                title: "Application Support",
                description: "Review, submission support, and liaison with Portuguese authorities throughout the process"
              }
            ].map((item, i) => (
              <div 
                key={i}
                className="visa-feature-card"
                style={{ 
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '2rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}
              >
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1rem'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: '#222'
                }}>
                  {item.title}
                </h3>
                <p style={{ 
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={{ 
        padding: '6rem 2rem',
        background: '#ffffff'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2.8rem', 
              fontWeight: '900',
              marginBottom: '1rem',
              color: '#222'
            }}>
              Our Visa Application Process
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              lineHeight: '1.6'
            }}>
              Simple 5-step process to your Portugal visa
            </p>
          </div>
          
          <ProgressIndicator 
            currentStep={1}
            steps={[
              "Consultation",
              "Eligibility Check", 
              "Document Prep",
              "Application",
              "Approval"
            ]}
            size="large"
          />
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2rem',
            marginTop: '4rem'
          }} className="visa-process-grid">
            {[
              {
                step: "1",
                title: "Free Consultation",
                description: "Discuss your goals and assess the best visa options"
              },
              {
                step: "2", 
                title: "Eligibility Check",
                description: "Verify requirements and create your personalized plan"
              },
              {
                step: "3",
                title: "Document Preparation", 
                description: "Gather and prepare all required documentation"
              },
              {
                step: "4",
                title: "Application Submission",
                description: "Submit your application and track progress"
              },
              {
                step: "5",
                title: "Visa Approval",
                description: "Receive your visa and start your Portugal journey"
              }
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ 
                  background: i === 0 ? '#667eea' : '#e5e7eb',
                  color: i === 0 ? 'white' : '#666',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  margin: '0 auto 1rem auto'
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#222' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#666', lineHeight: '1.5', fontSize: '0.9rem' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #eaf4ff 0%, #dbeafe 100%)',
        padding: '6rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '900',
            marginBottom: '1rem',
            color: '#222'
          }}>
            Ready to Start Your Visa Application?
          </h2>
          
          <p style={{ 
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '3rem',
            lineHeight: '1.6'
          }}>
            Join hundreds who chose TechAnchor for their Portugal visa. 
            Expert guidance, transparent pricing, proven results.
          </p>
          
          {submitted ? (
            <div style={{ 
              background: '#10b981',
              color: 'white',
              fontWeight: '700', 
              fontSize: '1.2rem', 
              padding: '2rem',
              borderRadius: '15px'
            }}>
              🎉 Thank you! We'll contact you within 24 hours for your free consultation.
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '1rem', 
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}>
              <input
                type="email"
                required
                placeholder="Enter your email for free consultation"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ 
                  padding: '16px 20px', 
                  borderRadius: '12px', 
                  border: '2px solid #e5e7eb', 
                  fontSize: '16px', 
                  minWidth: '300px',
                  fontFamily: 'inherit'
                }}
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className="visa-cta-button"
                style={{ 
                  padding: '16px 32px', 
                  fontSize: '16px',
                  fontWeight: '700',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#ffffff',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                {isLoading ? (
                  <>
                    <span style={{ 
                      display: 'inline-block', 
                      width: '16px', 
                      height: '16px', 
                      border: '2px solid #ffffff', 
                      borderTopColor: 'transparent', 
                      borderRadius: '50%', 
                      animation: 'spin 1s linear infinite',
                      marginRight: '8px'
                    }}></span>
                    Processing...
                  </>
                ) : (
                  'Get Free Consultation →'
                )}
              </button>
            </form>
          )}
          
          <div style={{ 
            fontSize: '14px', 
            color: '#666'
          }}>
            💬 Free consultation • 🎯 Personalized guidance • ⚡ Expert support
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ 
        padding: '6rem 2rem',
        background: '#f8f9fb'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '900',
            marginBottom: '3rem',
            textAlign: 'center',
            color: '#222'
          }}>
            Frequently Asked Questions
          </h2>
          
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                question: "How long does the visa process take?",
                answer: "Processing times vary by visa type: Digital Nomad (2-3 months), D7 (3-6 months), Golden Visa (6-12 months). We provide detailed timelines during consultation."
              },
              {
                question: "Do I need to be in Portugal to apply?",
                answer: "Most visa applications can be started from your home country through Portuguese consulates. We guide you through the specific requirements for your location."
              },
              {
                question: "What are the income requirements?",
                answer: "Requirements vary: Digital Nomad (€2,760/month), D7 (€760/month minimum), Golden Visa (€280k+ investment). We help verify your eligibility."
              },
              {
                question: "Can my family apply with me?", 
                answer: "Yes! Most visas allow family reunification. Spouses and dependent children can typically be included in your application."
              }
            ].map((faq, i) => (
              <div 
                key={i}
                style={{ 
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden'
                }}
              >
                <h3 style={{ 
                  padding: '1.5rem',
                  margin: 0,
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#222',
                  borderBottom: '1px solid #f1f5f9'
                }}>
                  {faq.question}
                </h3>
                <div style={{ 
                  padding: '1.5rem',
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export const meta = {
  title: "Portugal Visa & Residency Guidance | TechAnchor",
  description: "Get expert support for all Portugal visa and residency types. We guide you through paperwork, eligibility, and the application process.",
  keywords: "Portugal visa help, residency permit Portugal, digital nomad visa, D7 visa, golden visa, Portugal immigration"
};

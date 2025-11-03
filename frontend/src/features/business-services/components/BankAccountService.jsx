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
  
  .bank-cta-button {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    transition: all 0.3s ease;
  }
  
  .bank-cta-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
  }
  
  .bank-feature-card {
    transition: all 0.3s ease;
  }
  
  .bank-feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12) !important;
  }
  
  @media (max-width: 768px) {
    .bank-features-grid {
      grid-template-columns: 1fr !important;
    }
    
    .bank-benefits-grid {
      grid-template-columns: 1fr !important;
    }
    
    .bank-process-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

export default function BankAccountService() {
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
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
          background: 'rgba(0, 0, 0, 0.1)',
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
            Open Your Portuguese Bank Account
          </h1>
          
          <p style={{ 
            fontSize: '1.3rem',
            marginBottom: '3rem',
            opacity: 0.95,
            lineHeight: '1.6'
          }}>
            Expert guidance to open your Portuguese bank account easily and securely. 
            Connect with trusted banking partners and start your financial life in Portugal.
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
                color: '#10b981',
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
              Start Banking Setup →
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
                e.target.style.color = '#10b981';
              }}
              onMouseOut={e => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              Get Banking Advice
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
              <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#10b981' }}>300+</div>
              <div style={{ fontSize: '16px', color: '#666' }}>Successful Bank Account Opens</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#E2725B' }}>5</div>
              <div style={{ fontSize: '16px', color: '#666' }}>Trusted Banking Partners</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#f59e0b' }}>72h</div>
              <div style={{ fontSize: '16px', color: '#666' }}>Average Processing Time</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#8b5cf6' }}>⭐ 4.8</div>
              <div style={{ fontSize: '16px', color: '#666' }}>Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why You Need a Portuguese Bank Account */}
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
              Why You Need a Portuguese Bank Account
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Essential for daily life and financial operations in Portugal
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem'
          }} className="bank-benefits-grid">
            {[
              {
                icon: "💰",
                title: "Salary & Income",
                description: "Receive your Portuguese salary, freelance payments, and other income directly"
              },
              {
                icon: "🏠", 
                title: "Housing & Utilities",
                description: "Pay rent, mortgage, utilities, and other monthly expenses with local banking"
              },
              {
                icon: "🛒",
                title: "Daily Purchases", 
                description: "Use Portuguese debit/credit cards for shopping, online purchases, and subscriptions"
              },
              {
                icon: "📱",
                title: "Digital Services",
                description: "Access Portuguese apps, services, and government portals that require local banking"
              }
            ].map((item, i) => (
              <div 
                key={i}
                className="bank-feature-card"
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

      {/* Banking Partners Section */}
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
              Our Trusted Banking Partners
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              lineHeight: '1.6'
            }}>
              We work with Portugal's leading banks to find the best fit for you
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem'
          }} className="bank-features-grid">
            {[
              {
                bank: "Millennium BCP",
                icon: "🏛️",
                title: "Full-Service Banking",
                description: "Complete banking services with English support and expat-friendly approach",
                benefits: ["English customer service", "International transfers", "Digital banking app"]
              },
              {
                bank: "Santander Portugal",
                icon: "🌍", 
                title: "International Focus",
                description: "Strong international presence with services tailored for expats and global clients",
                benefits: ["Global network", "Multi-currency accounts", "Investment services"]
              },
              {
                bank: "Caixa Geral",
                icon: "🇵🇹",
                title: "Portugal's Largest Bank", 
                description: "State-owned bank with extensive branch network and comprehensive services",
                benefits: ["Largest ATM network", "Government partnerships", "Mortgage specialists"]
              },
              {
                bank: "Digital Banks",
                icon: "📱",
                title: "Modern Digital Banking",
                description: "App-based banking with innovative features and competitive rates",
                benefits: ["Mobile-first experience", "Low fees", "Fast account opening"]
              }
            ].map((item, i) => (
              <div 
                key={i}
                className="bank-feature-card"
                style={{ 
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '2rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  color: '#222',
                  textAlign: 'center'
                }}>
                  {item.bank}
                </h3>
                <h4 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#10b981',
                  textAlign: 'center'
                }}>
                  {item.title}
                </h4>
                <p style={{ 
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  {item.description}
                </p>
                
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0 
                }}>
                  {item.benefits.map((benefit, j) => (
                    <li key={j} style={{ 
                      color: '#10b981',
                      marginBottom: '0.5rem',
                      fontSize: '14px',
                      textAlign: 'center'
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
              How We Help You Open Your Account
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              lineHeight: '1.6'
            }}>
              Simple 4-step process to get your Portuguese bank account
            </p>
          </div>
          
          <ProgressIndicator 
            currentStep={1}
            steps={[
              "Consultation",
              "Documentation", 
              "Bank Selection",
              "Account Opening"
            ]}
            size="large"
          />
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem',
            marginTop: '4rem'
          }} className="bank-process-grid">
            {[
              {
                step: "1",
                title: "Initial Consultation",
                description: "Discuss your banking needs and identify the best bank options"
              },
              {
                step: "2", 
                title: "Document Preparation",
                description: "Gather required documents and ensure everything is ready"
              },
              {
                step: "3",
                title: "Bank Selection", 
                description: "Choose the perfect bank based on your specific requirements"
              },
              {
                step: "4",
                title: "Account Opening",
                description: "Complete the application process and activate your account"
              }
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ 
                  background: i === 0 ? '#10b981' : '#e5e7eb',
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
        background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
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
            Ready to Open Your Portuguese Bank Account?
          </h2>
          
          <p style={{ 
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '3rem',
            lineHeight: '1.6'
          }}>
            Join hundreds who chose Atlantical for their Portuguese banking. 
            Expert guidance, trusted partners, secure process.
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
              🎉 Thank you! We'll contact you within 24 hours to start your banking setup.
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
                placeholder="Enter your email to get started"
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
                className="bank-cta-button"
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
                  'Start Banking Setup →'
                )}
              </button>
            </form>
          )}
          
          <div style={{ 
            fontSize: '14px', 
            color: '#666'
          }}>
            🏦 Trusted partners • 🔒 Secure process • ⚡ Fast setup
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
                question: "What documents do I need to open a bank account?",
                answer: "You'll need your passport, NIF (Portuguese tax number), proof of address in Portugal, and proof of income. We guide you through the specific requirements for each bank."
              },
              {
                question: "How long does it take to open an account?",
                answer: "The process typically takes 1-2 weeks from document submission to account activation. Some digital banks can be faster, while traditional banks may take longer."
              },
              {
                question: "Can I open an account before moving to Portugal?",
                answer: "Some banks allow remote account opening for certain visa holders. We help determine your options and guide you through the process based on your situation."
              },
              {
                question: "Are there fees for Portuguese bank accounts?", 
                answer: "Most banks charge monthly maintenance fees (€2-15) and transaction fees. We help you find accounts with the best fee structures for your usage patterns."
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
  title: "Open a Portuguese Bank Account | Atlantical",
  description: "Open a bank account in Portugal easily and securely. Get expert support and connect with trusted banking partners.",
  keywords: "Portugal bank account, open bank account Portugal, expat banking, move to Portugal bank"
};

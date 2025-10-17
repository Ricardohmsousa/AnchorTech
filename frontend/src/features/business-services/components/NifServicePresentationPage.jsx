
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "../../../components/ProgressIndicator";
import { layout, card, section } from "../../../styles/sharedStyles";

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
  
  .nif-cta-button {
    background: linear-gradient(135deg, #0070f3 0%, #0053cc 100%);
    transition: all 0.3s ease;
  }
  
  .nif-cta-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 112, 243, 0.3);
  }
  
  .nif-feature-card {
    transition: all 0.3s ease;
  }
  
  .nif-feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12) !important;
  }
  
  @media (max-width: 768px) {
    .nif-features-grid {
      grid-template-columns: 1fr !important;
    }
    
    .nif-process-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

export default function NifServicePresentationPage() {
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

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <style>{`
        .nif-hero-title { font-size: 3.5rem; font-weight: 900; }
        .nif-feature-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .nif-feature-card:hover { transform: translateY(-8px); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12); }
        .nif-cta-button { transition: all 0.3s ease; background: linear-gradient(135deg, #0070f3 0%, #0051cc 100%); }
        .nif-cta-button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0, 112, 243, 0.4); }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .nif-hero-title { font-size: 2.5rem !important; }
          .nif-hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .nif-features-grid { grid-template-columns: 1fr !important; }
          .nif-process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
        padding: '8rem 2rem 6rem 2rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }} />
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center'
        }} className="nif-hero-grid">
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ 
                background: 'rgba(255, 255, 255, 0.15)', 
                color: '#ffffff', 
                padding: '8px 20px', 
                borderRadius: '25px', 
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                🇵🇹 Essential Service
              </span>
            </div>
            
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: '900', 
              margin: '0 0 1.5rem 0', 
              lineHeight: '1.1'
            }} className="nif-hero-title">
              Get Your Portuguese
              <br />
              <span style={{ color: '#00d4ff' }}>NIF Tax Number</span>
            </h1>
            
            <p style={{ 
              fontSize: '1.2rem', 
              margin: '0 0 2.5rem 0', 
              lineHeight: '1.6',
              opacity: 0.9
            }}>
              Secure your Portuguese NIF quickly and remotely. <strong>Required for banking, housing, and all official transactions</strong> in Portugal. Our expert team makes it simple and stress-free.
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              flexWrap: 'wrap'
            }}>
              <button 
                className="nif-cta-button"
                style={{ 
                  padding: '16px 32px', 
                  fontSize: '18px',
                  fontWeight: '700',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  minWidth: '180px'
                }} 
                onClick={handleGetStarted}
              >
                🚀 Start Application
              </button>
              
              <button 
                style={{ 
                  padding: '16px 32px', 
                  fontSize: '18px',
                  fontWeight: '600',
                  borderRadius: '12px',
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  minWidth: '180px'
                }} 
                onClick={handleContact}
              >
                💬 Ask Questions
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div style={{ 
              marginTop: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              fontSize: '14px',
              opacity: 0.9,
              flexWrap: 'wrap'
            }}>
              <div>⚡ 5-7 business days</div>
              <div>🔒 100% secure process</div>
              <div>🇬🇧 English support</div>
            </div>
          </div>
          
          {/* Visual Element */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '2rem',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              maxWidth: '350px',
              width: '100%'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                padding: '1.5rem',
                color: '#333',
                textAlign: 'center'
              }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#0070f3', fontWeight: '700' }}>NIF Application Status</h4>
                <div style={{ 
                  background: '#f0f9ff',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#0070f3' }}>123 456 789</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Your Portuguese NIF</div>
                </div>
                <div style={{ fontSize: '13px', color: '#10b981' }}>
                  ✅ Application Approved
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why You Need NIF Section */}
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
              Why Do You Need a NIF?
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              The NIF (Número de Identificação Fiscal) is Portugal's tax identification number - essential for life in Portugal
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem'
          }} className="nif-features-grid">
            {[
              {
                icon: "🏦",
                title: "Banking & Finance",
                description: "Required for opening bank accounts, getting loans, and all financial transactions"
              },
              {
                icon: "🏠", 
                title: "Housing & Contracts",
                description: "Essential for renting property, signing leases, and utility contracts"
              },
              {
                icon: "💼",
                title: "Work & Business", 
                description: "Needed for employment contracts, freelancing, and starting a business"
              },
              {
                icon: "📱",
                title: "Daily Services",
                description: "Required for phone plans, internet, insurance, and government services"
              }
            ].map((item, i) => (
              <div 
                key={i}
                className="nif-feature-card"
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
              How It Works
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              lineHeight: '1.6'
            }}>
              Simple 4-step process to get your Portuguese NIF
            </p>
          </div>
          
          <ProgressIndicator 
            currentStep={1}
            steps={[
              "Submit Documents",
              "Processing", 
              "Tax Office Review",
              "NIF Delivered"
            ]}
            size="large"
          />
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem',
            marginTop: '4rem'
          }} className="nif-process-grid">
            {[
              {
                step: "1",
                title: "Submit Documents",
                description: "Upload your passport and proof of address through our secure platform"
              },
              {
                step: "2", 
                title: "Processing",
                description: "Our specialists review your documents and prepare your application"
              },
              {
                step: "3",
                title: "Tax Office Review", 
                description: "Your application is submitted to the Portuguese tax authorities"
              },
              {
                step: "4",
                title: "NIF Delivered",
                description: "Receive your NIF digitally within 5-7 business days"
              }
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ 
                  background: i === 0 ? '#0070f3' : '#e5e7eb',
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
            Ready to Get Your NIF?
          </h2>
          
          <p style={{ 
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '3rem',
            lineHeight: '1.6'
          }}>
            Join thousands of expats who chose TechAnchor for their Portuguese NIF. 
            Fast, secure, and hassle-free process with English support.
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
              🎉 Thank you! We'll contact you within 24 hours to start your NIF application.
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
                placeholder="Enter your email for pricing"
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
                className="nif-cta-button"
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
                  'Get Pricing & Start →'
                )}
              </button>
            </form>
          )}
          
          <div style={{ 
            fontSize: '14px', 
            color: '#666'
          }}>
            💸 Transparent pricing • 🔒 Secure process • ⚡ 5-7 days delivery
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
                question: "How long does it take to get my NIF?",
                answer: "Typically 5-7 business days from document submission. We'll keep you updated throughout the process."
              },
              {
                question: "What documents do I need?",
                answer: "Just your passport and proof of address (utility bill, bank statement, or rental agreement). We'll guide you through the specific requirements."
              },
              {
                question: "Can I apply without being in Portugal?",
                answer: "Yes! Our service is designed for remote applications. You can get your NIF from anywhere in the world."
              },
              {
                question: "Is my NIF valid forever?", 
                answer: "Yes, your Portuguese NIF is permanent and doesn't expire. You'll use the same number for all your time in Portugal."
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
};

export const meta = {
  title: "Get Portuguese NIF Online | Fast & Secure | TechAnchor",
  description: "Obtain your Portuguese NIF (tax number) online with TechAnchor. Fast, secure, and remote service for expats and newcomers. Start your application today!",
  keywords: "Portugal NIF, get NIF online, Portuguese tax number, expat Portugal, move to Portugal, NIF application"
};

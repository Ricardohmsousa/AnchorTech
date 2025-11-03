import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! 👋 Welcome to Atlantical. I can answer your questions about relocating to Portugal. Please select a category below:',
      timestamp: new Date()
    }
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Category buttons for main menu
  const quickReplies = [
    { text: '🌍 General Relocation', category: 'general' },
    { text: '🛂 Visas & Residency', category: 'visas' },
    { text: '💼 Working & Business', category: 'working' },
    { text: '🏠 Housing & Cost of Living', category: 'housing' },
    { text: '🏥 Healthcare & Education', category: 'healthcare' },
    { text: '📄 Documents & Practicalities', category: 'documents' },
    { text: '🇵🇹 Life in Portugal', category: 'life' }
  ];

  // FAQ database with all questions and answers
  const faqCategories = {
    general: [
      {
        question: "Why should I move to Portugal?",
        answer: "Portugal offers a high quality of life, affordable cost of living, mild climate, safety, great healthcare, and a welcoming international community. It's one of Europe's most family-friendly and expat-friendly countries."
      },
      {
        question: "Do I need a visa to move?",
        answer: "It depends on your nationality and purpose. Non-EU/EEA/Swiss citizens usually need a visa or residence permit. EU citizens can move freely but must register locally if staying longer than 3 months."
      },
      {
        question: "How long does the relocation process take?",
        answer: "The process usually takes 2–6 months, depending on your visa type, required documents, and personal circumstances. We help streamline this process significantly!"
      },
      {
        question: "Is Portugal safe?",
        answer: "Yes! Portugal ranks as one of the safest countries in the world with low crime rates and a peaceful lifestyle. It's perfect for families and solo travelers alike."
      }
    ],
    visas: [
      {
        question: "What visa options are available?",
        answer: "Popular visa types include:\n\n• D7 Visa (passive income/retirement)\n• Digital Nomad Visa (remote workers)\n• D2 Visa (entrepreneurs & business)\n• Golden Visa (investment-based)\n• Student Visa (education)\n\nWould you like to explore our visa services?",
        actions: [
          { label: 'View Visa Services', type: 'navigate', path: '/services' }
        ]
      },
      {
        question: "What is the D7 Visa?",
        answer: "The D7 Visa is for people with passive or stable remote income, such as pensions, rentals, dividends, or remote work. It leads to residency and can lead to citizenship after 5 years."
      },
      {
        question: "How long does a residence permit last?",
        answer: "Most first permits are valid for 1–2 years and can be renewed. After 5 years, you can apply for permanent residency or citizenship."
      },
      {
        question: "Can I work with a residence permit?",
        answer: "Yes, most residence permits allow work. Only some visas (like student visas) may have restrictions."
      }
    ],
    working: [
      {
        question: "Can I work remotely from Portugal?",
        answer: "Yes! Portugal welcomes digital nomads and offers a specific Digital Nomad Visa for remote workers. The tech scene is thriving, especially in Lisbon and Porto."
      },
      {
        question: "Is Portugal good for startups?",
        answer: "Absolutely! Portugal has a growing startup scene, business-friendly policies, talent availability, and one of the lowest corporate tax regimes in Western Europe. Great for entrepreneurs!"
      },
      {
        question: "Do I need to speak Portuguese?",
        answer: "Not always. Many companies operate in English, especially in tech, tourism, and international startups. However, learning Portuguese helps with integration and daily life."
      }
    ],
    housing: [
      {
        question: "Is the cost of living high?",
        answer: "It's generally lower than most Western European countries. Housing in Lisbon and Porto is higher than in smaller cities like Braga, Coimbra, or Évora. Overall very affordable!"
      },
      {
        question: "How do I find accommodation?",
        answer: "You can rent short-term first and look for long-term housing after arrival. Property portals, local agents, and our relocation services can assist you in finding the perfect place!",
        actions: [
          { label: 'View Our Services', type: 'navigate', path: '/services' }
        ]
      },
      {
        question: "Can foreigners buy property?",
        answer: "Yes! There are no restrictions on foreigners buying property in Portugal. We can help guide you through the entire property purchase process."
      }
    ],
    healthcare: [
      {
        question: "Is healthcare good in Portugal?",
        answer: "Portugal has a high-quality public healthcare system (SNS) and excellent private healthcare options. Residents can access public healthcare at affordable rates. Healthcare is world-class!"
      },
      {
        question: "Are there international schools?",
        answer: "Yes! Major cities offer English, French, German, and other international-curriculum schools. Great options for expat families with children."
      }
    ],
    documents: [
      {
        question: "What documents do I need?",
        answer: "Common requirements include:\n\n✓ Valid passport\n✓ Income proof\n✓ Criminal record check\n✓ Health insurance\n✓ Accommodation proof\n✓ Visa application forms\n\nExact requirements vary by visa type. Want to see our document checklist?",
        actions: [
          { label: 'View Document Checklist', type: 'scroll', path: '/' }
        ]
      },
      {
        question: "Do I need a Portuguese bank account?",
        answer: "Often yes—especially for visa applications and renting long-term. Many expats open an account before or shortly after arrival. We can help you set this up!"
      },
      {
        question: "What is NIF?",
        answer: "NIF (Número de Identificação Fiscal) is a Portuguese tax number required for most activities: renting, buying property, opening a bank account, utilities, etc. It's one of the first things you'll need!"
      }
    ],
    life: [
      {
        question: "Which cities are best for expats?",
        answer: "Popular choices include:\n\n🏛️ Lisbon – cosmopolitan, tech, culture\n🍷 Porto – charming, authentic, business\n🏖️ Cascais – coastal, family-friendly\n🏰 Braga – affordable, great for families\n☀️ Algarve – beaches, relaxed lifestyle\n\nEach has its unique charm!"
      },
      {
        question: "Is it easy to integrate?",
        answer: "Yes! Locals are warm and friendly, and there's a large international community. Learning basic Portuguese helps, but many expats integrate successfully. Portugal is very welcoming!"
      }
    ]
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    
    const categoryInfo = quickReplies.find(qr => qr.category === category);
    const categoryQuestions = faqCategories[category];
    
    setMessages(prev => [...prev, {
      type: 'user',
      text: categoryInfo.text,
      timestamp: new Date()
    }]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: `Great! Here are questions about ${categoryInfo.text}. Please select one:`,
        timestamp: new Date(),
        questions: categoryQuestions
      }]);
    }, 800);
  };

  const handleQuestionClick = (question, answer, actions) => {
    setMessages(prev => [...prev, {
      type: 'user',
      text: question,
      timestamp: new Date()
    }]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: answer,
        timestamp: new Date(),
        actions: actions
      }]);
    }, 1000);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setMessages(prev => [...prev, {
      type: 'bot',
      text: 'What else would you like to know? Please select a category:',
      timestamp: new Date()
    }]);
  };

  const handleAction = (action) => {
    if (action.type === 'navigate') {
      navigate(action.path);
      setIsOpen(false);
    } else if (action.type === 'scroll') {
      navigate(action.path, { state: { scrollToDocuments: true } });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #E2725B 0%, #A94438 100%)',
            border: 'none',
            boxShadow: '0 4px 20px rgba(226, 114, 91, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            transition: 'all 0.3s ease',
            zIndex: 1000,
            animation: 'pulse 2s infinite'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 30px rgba(226, 114, 91, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(226, 114, 91, 0.4)';
          }}
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '380px',
            height: '600px',
            maxHeight: 'calc(100vh - 4rem)',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            overflow: 'hidden',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #E2725B 0%, #A94438 100%)',
              color: 'white',
              padding: '1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem'
                }}
              >
                🤖
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>Atlantical Assistant</h3>
                <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.9 }}>Online • Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: 0,
                lineHeight: 1
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.5rem',
              background: '#f9fafb'
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.type === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '75%',
                    padding: '0.75rem 1rem',
                    borderRadius: message.type === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: message.type === 'user' 
                      ? 'linear-gradient(135deg, #E2725B 0%, #A94438 100%)'
                      : 'white',
                    color: message.type === 'user' ? 'white' : '#1f2937',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    whiteSpace: 'pre-line',
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                  }}
                >
                  {message.text}
                </div>

                {/* Show questions if this is a category selection message */}
                {message.questions && (
                  <div style={{ 
                    width: '100%', 
                    marginTop: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    {message.questions.map((q, qIndex) => (
                      <button
                        key={qIndex}
                        onClick={() => handleQuestionClick(q.question, q.answer, q.actions)}
                        style={{
                          padding: '0.75rem 1rem',
                          background: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontFamily: 'Inter, sans-serif',
                          textAlign: 'left',
                          color: '#1f2937'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f3f4f6';
                          e.currentTarget.style.borderColor = '#E2725B';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'white';
                          e.currentTarget.style.borderColor = '#e5e7eb';
                        }}
                      >
                        {q.question}
                      </button>
                    ))}
                  </div>
                )}

                {/* Show action buttons if this message has actions */}
                {message.actions && (
                  <div style={{ 
                    marginTop: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    width: '100%'
                  }}>
                    {message.actions.map((action, aIndex) => (
                      <button
                        key={aIndex}
                        onClick={() => handleAction(action)}
                        style={{
                          padding: '0.625rem 1rem',
                          background: '#E2725B',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontFamily: 'Inter, sans-serif'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#A94438'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#E2725B'}
                      >
                        {action.label} →
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
                <div
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '16px 16px 16px 4px',
                    background: 'white',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>•••</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Category Selection Buttons */}
          {!isTyping && !selectedCategory && (
            <div
              style={{
                padding: '1rem',
                background: 'white',
                borderTop: '1px solid #e5e7eb',
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}
            >
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(reply.category)}
                  style={{
                    padding: '0.625rem 1rem',
                    background: '#f3f4f6',
                    border: '1px solid #e5e7eb',
                    borderRadius: '20px',
                    fontSize: '0.813rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#E2725B';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = '#E2725B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f3f4f6';
                    e.currentTarget.style.color = 'inherit';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  {reply.text}
                </button>
              ))}
            </div>
          )}

          {/* Back to Categories Button */}
          {!isTyping && selectedCategory && (
            <div
              style={{
                padding: '1rem',
                background: 'white',
                borderTop: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <button
                onClick={handleBackToCategories}
                style={{
                  padding: '0.625rem 1.5rem',
                  background: '#f3f4f6',
                  border: '1px solid #e5e7eb',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E2725B';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = '#E2725B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f3f4f6';
                  e.currentTarget.style.color = 'inherit';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                ← Back to Categories
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 4px 20px rgba(226, 114, 91, 0.4);
          }
          50% {
            box-shadow: 0 4px 30px rgba(226, 114, 91, 0.6);
          }
        }
      `}</style>
    </>
  );
};

export default Chatbot;

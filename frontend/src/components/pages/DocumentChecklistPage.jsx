import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Footer from '../layout/Footer';

const DocumentChecklistPage = () => {
  const navigate = useNavigate();
  const [selectedVisa, setSelectedVisa] = useState('d7');
  const [checkedItems, setCheckedItems] = useState({});

  // Check if user has submitted email for checklist access
  useEffect(() => {
    const hasAccess = localStorage.getItem('checklistEmailSubmitted');
    if (!hasAccess) {
      // Redirect to home page if no access
      navigate('/');
    }
  }, [navigate]);

  const visaTypes = [
    {
      id: 'd7',
      name: 'D7 Visa (Passive Income)',
      description: 'For individuals with passive income or remote work'
    },
    {
      id: 'golden',
      name: 'Golden Visa (Investment)',
      description: 'For investors making qualifying investments'
    },
    {
      id: 'work',
      name: 'Work Visa',
      description: 'For employment in Portugal'
    },
    {
      id: 'family',
      name: 'Family Reunification',
      description: 'For family members of Portuguese/EU citizens'
    },
    {
      id: 'student',
      name: 'Student Visa',
      description: 'For study purposes'
    },
    {
      id: 'nomad',
      name: 'Digital Nomad Visa',
      description: 'For remote workers and digital nomads'
    }
  ];

  const documentCategories = {
    d7: {
      essential: [
        'Valid passport (with at least 6 months validity)',
        'Completed visa application form',
        'Recent passport photos (2 pieces, 3.5x4.5cm)',
        'Clean criminal record certificate from country of origin',
        'Travel insurance (minimum €30,000 coverage)',
        'Proof of accommodation in Portugal',
        'Bank statements (last 3 months)',
        'Proof of passive income (€760+ per month)',
        'Health certificate',
        'Birth certificate (apostilled)'
      ],
      additional: [
        'Marriage certificate (if applicable)',
        'Educational certificates',
        'Employment contract (if applicable)',
        'Tax returns from previous year',
        'Investment portfolio statements',
        'Portuguese language certificate (optional but helpful)'
      ],
      tips: [
        'All foreign documents must be apostilled',
        'Documents in languages other than Portuguese must be translated by certified translator',
        'Bank statements should show consistent income over 3+ months',
        'Accommodation proof can be rental contract or property purchase'
      ]
    },
    golden: {
      essential: [
        'Valid passport (with at least 6 months validity)',
        'Completed visa application form',
        'Recent passport photos (2 pieces, 3.5x4.5cm)',
        'Clean criminal record certificate',
        'Travel insurance (minimum €30,000 coverage)',
        'Investment documentation (property purchase, business investment, etc.)',
        'Bank statements proving financial capacity',
        'Investment agreement/contract',
        'Tax clearance certificate',
        'Birth certificate (apostilled)'
      ],
      additional: [
        'Marriage certificate (if applicable)',
        'Investment fund documentation',
        'Business plan (for business investments)',
        'Property valuation certificate',
        'Due diligence reports',
        'Legal representation documents'
      ],
      tips: [
        'Minimum investment: €500,000 in real estate or €350,000 in low-density areas',
        'Alternative: €500,000 in investment funds or €250,000 in arts/culture',
        'Investment must be maintained for 5 years',
        'Legal representation in Portugal is highly recommended'
      ]
    },
    work: {
      essential: [
        'Valid passport (with at least 6 months validity)',
        'Completed visa application form',
        'Recent passport photos (2 pieces, 3.5x4.5cm)',
        'Clean criminal record certificate',
        'Travel insurance (minimum €30,000 coverage)',
        'Employment contract from Portuguese employer',
        'Company registration documents',
        'Educational certificates (apostilled)',
        'Professional qualifications/licenses',
        'Bank statements (last 3 months)'
      ],
      additional: [
        'CV/Resume',
        'Reference letters from previous employers',
        'Portuguese language certificate',
        'Health certificate',
        'Proof of accommodation',
        'Tax clearance from home country'
      ],
      tips: [
        'Employment contract must comply with Portuguese labor law',
        'Some professions require recognition of qualifications',
        'Employer may need to prove no EU candidate available',
        'Processing time can be 60-90 days'
      ]
    },
    family: {
      essential: [
        'Valid passport (with at least 6 months validity)',
        'Completed visa application form',
        'Recent passport photos (2 pieces, 3.5x4.5cm)',
        'Clean criminal record certificate',
        'Travel insurance (minimum €30,000 coverage)',
        'Marriage certificate (apostilled)',
        'Birth certificate (apostilled)',
        'Portuguese/EU citizen\'s documents',
        'Proof of relationship',
        'Financial support guarantee'
      ],
      additional: [
        'Joint bank accounts',
        'Photos documenting relationship',
        'Correspondence/communication records',
        'Previous visit records to Portugal',
        'Health insurance',
        'Accommodation proof'
      ],
      tips: [
        'Relationship must be genuine and ongoing',
        'Financial support evidence is crucial',
        'Interview may be required',
        'Processing time: 30-60 days'
      ]
    },
    student: {
      essential: [
        'Valid passport (with at least 6 months validity)',
        'Completed visa application form',
        'Recent passport photos (2 pieces, 3.5x4.5cm)',
        'Clean criminal record certificate',
        'Travel insurance (minimum €30,000 coverage)',
        'Acceptance letter from Portuguese institution',
        'Educational certificates (apostilled)',
        'Financial proof (€6,480 minimum for academic year)',
        'Accommodation proof',
        'Health certificate'
      ],
      additional: [
        'Scholarship documents (if applicable)',
        'Portuguese language certificate',
        'Academic transcripts',
        'Study plan/motivation letter',
        'Parent\'s consent (if under 18)',
        'Bank guarantee letter'
      ],
      tips: [
        'Institution must be recognized by Portuguese authorities',
        'Financial proof can be bank statements, scholarship, or guarantee',
        'Student visa allows part-time work (20 hours/week)',
        'Can be extended for duration of studies'
      ]
    },
    nomad: {
      essential: [
        'Valid passport (with at least 6 months validity)',
        'Completed visa application form',
        'Recent passport photos (2 pieces, 3.5x4.5cm)',
        'Clean criminal record certificate',
        'Travel insurance (minimum €30,000 coverage)',
        'Employment contract or business registration',
        'Proof of remote work capability',
        'Bank statements (minimum €2,800/month income)',
        'Tax compliance certificate',
        'Accommodation proof'
      ],
      additional: [
        'Client contracts (for freelancers)',
        'Portfolio of work',
        'Professional references',
        'Educational certificates',
        'Previous nomad visa experience',
        'Co-working space membership'
      ],
      tips: [
        'Must prove ability to work remotely',
        'Income requirement: 4x minimum wage (€2,800+)',
        'Valid for 1 year, renewable',
        'Allows family members to apply'
      ]
    }
  };

  const handleItemCheck = (categoryKey, index) => {
    const itemKey = `${categoryKey}-${index}`;
    setCheckedItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const getProgress = () => {
    const currentDocs = documentCategories[selectedVisa];
    const totalItems = currentDocs.essential.length + currentDocs.additional.length;
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((checkedCount / totalItems) * 100);
  };

  const renderDocumentSection = (title, items, categoryKey, bgColor, borderColor) => (
    <div style={{
      background: bgColor,
      padding: '2rem',
      borderRadius: '12px',
      border: `2px solid ${borderColor}`,
      marginBottom: '2rem'
    }}>
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        {title === 'Essential Documents' && '📋'}
        {title === 'Additional Documents' && '📄'}
        {title}
      </h3>
      
      <div style={{ display: 'grid', gap: '1rem' }}>
        {items.map((item, index) => {
          const itemKey = `${categoryKey}-${index}`;
          const isChecked = checkedItems[itemKey] || false;
          
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'white',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                opacity: isChecked ? 0.7 : 1
              }}
              onClick={() => handleItemCheck(categoryKey, index)}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                border: `2px solid ${isChecked ? '#10b981' : '#d1d5db'}`,
                background: isChecked ? '#10b981' : 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}>
                {isChecked && '✓'}
              </div>
              
              <span style={{
                fontSize: '1rem',
                color: '#374151',
                textDecoration: isChecked ? 'line-through' : 'none',
                transition: 'all 0.2s ease'
              }}>
                {item}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        {/* Header */}
        <header style={{
          background: 'linear-gradient(135deg, #E2725B 0%, #A94438 100%)',
          color: 'white',
          padding: '4rem 0',
          marginBottom: '3rem'
        }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
            Document Checklist
          </h1>
          <p style={{ fontSize: '1.25rem', textAlign: 'center', opacity: 0.9, marginBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
            Everything you need for your Portugal visa application
          </p>
          
          {/* Progress Bar */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50px',
            padding: '4px',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '50px',
              padding: '0.5rem 1rem',
              textAlign: 'center',
              color: '#E2725B',
              fontWeight: '600'
            }}>
              Progress: {getProgress()}% Complete
            </div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Visa Type Selector */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1rem',
            fontFamily: 'Inter, sans-serif'
          }}>
            Select Your Visa Type
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            {visaTypes.map((visa) => (
              <motion.div
                key={visa.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSelectedVisa(visa.id);
                  setCheckedItems({});
                }}
                style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: `2px solid ${selectedVisa === visa.id ? '#E2725B' : '#e5e7eb'}`,
                  background: selectedVisa === visa.id ? '#f0f9ff' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: selectedVisa === visa.id ? '#E2725B' : '#374151',
                  marginBottom: '0.5rem',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {visa.name}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  lineHeight: '1.5',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {visa.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Document Lists */}
        {documentCategories[selectedVisa] && (
          <motion.div
            key={selectedVisa}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderDocumentSection(
              'Essential Documents',
              documentCategories[selectedVisa].essential,
              'essential',
              'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              '#fca5a5'
            )}

            {renderDocumentSection(
              'Additional Documents',
              documentCategories[selectedVisa].additional,
              'additional',
              'linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)',
              '#93c5fd'
            )}

            {/* Tips Section */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid #86efac',
              marginBottom: '3rem'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                💡 Important Tips
              </h3>
              
              <ul style={{
                listStyle: 'none',
                padding: 0,
                display: 'grid',
                gap: '1rem'
              }}>
                {documentCategories[selectedVisa].tips.map((tip, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '1rem',
                    background: 'white',
                    borderRadius: '8px'
                  }}>
                    <span style={{ color: '#10b981', fontSize: '1.25rem' }}>•</span>
                    <span style={{ color: '#374151', lineHeight: '1.6' }}>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginBottom: '3rem'
            }}>
              <button
                onClick={() => window.print()}
                style={{
                  background: 'white',
                  color: '#E2725B',
                  border: '2px solid #E2725B',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#E2725B';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = '#E2725B';
                }}
              >
                📄 Print Checklist
              </button>
              
              <button
                onClick={() => alert('Checklist downloaded!')}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
                  e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                💾 Download PDF
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default DocumentChecklistPage;

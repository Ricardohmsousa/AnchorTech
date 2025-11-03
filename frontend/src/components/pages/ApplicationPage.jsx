import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../layout/Footer';

const ApplicationPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      nationality: '',
      dateOfBirth: ''
    },
    relocationInfo: {
      visaType: '',
      arrivalDate: '',
      familySize: '',
      currentCountry: ''
    },
    preferences: {
      region: '',
      housingType: '',
      workStatus: '',
      budget: ''
    }
  });

  const steps = [
    {
      title: 'Personal Information',
      description: 'Basic details about you',
      icon: '👤'
    },
    {
      title: 'Relocation Details',
      description: 'Your move specifics',
      icon: '🏠'
    },
    {
      title: 'Preferences',
      description: 'Your Portuguese lifestyle',
      icon: '⚙️'
    },
    {
      title: 'Review & Submit',
      description: 'Confirm your application',
      icon: '✅'
    }
  ];

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderPersonalInfo = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
          Full Name *
        </label>
        <input
          type="text"
          value={formData.personalInfo.fullName}
          onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
          style={{
            width: '100%',
            padding: '1rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            fontFamily: 'Inter, sans-serif'
          }}
          onFocus={(e) => e.target.style.borderColor = '#E2725B'}
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
        />
      </div>
      
      <div className="form-grid-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
            Email *
          </label>
          <input
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#E2725B'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
            Phone *
          </label>
          <input
            type="tel"
            value={formData.personalInfo.phone}
            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#E2725B'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>
      </div>
      
      <div className="form-grid-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
            Nationality *
          </label>
          <select
            value={formData.personalInfo.nationality}
            onChange={(e) => handleInputChange('personalInfo', 'nationality', e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              backgroundColor: 'white'
            }}
            onFocus={(e) => e.target.style.borderColor = '#E2725B'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          >
            <option value="">Select nationality</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="ES">Spain</option>
            <option value="IT">Italy</option>
            <option value="NL">Netherlands</option>
            <option value="BE">Belgium</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
            Date of Birth *
          </label>
          <input
            type="date"
            value={formData.personalInfo.dateOfBirth}
            onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#E2725B'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>
      </div>
    </div>
  );

  const renderRelocationInfo = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
          Visa Type *
        </label>
        <select
          value={formData.relocationInfo.visaType}
          onChange={(e) => handleInputChange('relocationInfo', 'visaType', e.target.value)}
          style={{
            width: '100%',
            padding: '1rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            backgroundColor: 'white'
          }}
          onFocus={(e) => e.target.style.borderColor = '#E2725B'}
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
        >
          <option value="">Select visa type</option>
          <option value="d7">D7 Visa (Passive Income)</option>
          <option value="golden">Golden Visa (Investment)</option>
          <option value="work">Work Visa</option>
          <option value="family">Family Reunification</option>
          <option value="student">Student Visa</option>
          <option value="nomad">Digital Nomad Visa</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
            Planned Arrival Date
          </label>
          <input
            type="date"
            value={formData.relocationInfo.arrivalDate}
            onChange={(e) => handleInputChange('relocationInfo', 'arrivalDate', e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#E2725B'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
            Family Size
          </label>
          <select
            value={formData.relocationInfo.familySize}
            onChange={(e) => handleInputChange('relocationInfo', 'familySize', e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              backgroundColor: 'white'
            }}
            onFocus={(e) => e.target.style.borderColor = '#E2725B'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          >
            <option value="">Select family size</option>
            <option value="1">Just me</option>
            <option value="2">2 people</option>
            <option value="3">3 people</option>
            <option value="4">4 people</option>
            <option value="5+">5+ people</option>
          </select>
        </div>
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
          Current Country *
        </label>
        <input
          type="text"
          value={formData.relocationInfo.currentCountry}
          onChange={(e) => handleInputChange('relocationInfo', 'currentCountry', e.target.value)}
          placeholder="Where are you currently living?"
          style={{
            width: '100%',
            padding: '1rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#E2725B'}
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
        />
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
            Preferred Region
          </label>
          <select
            value={formData.preferences.region}
            onChange={(e) => handleInputChange('preferences', 'region', e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              backgroundColor: 'white'
            }}
            onFocus={(e) => e.target.style.borderColor = '#E2725B'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          >
            <option value="">Select region</option>
            <option value="lisbon">Lisbon</option>
            <option value="porto">Porto</option>
            <option value="algarve">Algarve</option>
            <option value="cascais">Cascais</option>
            <option value="sintra">Sintra</option>
            <option value="aveiro">Aveiro</option>
            <option value="coimbra">Coimbra</option>
            <option value="braga">Braga</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
            Housing Type
          </label>
          <select
            value={formData.preferences.housingType}
            onChange={(e) => handleInputChange('preferences', 'housingType', e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              backgroundColor: 'white'
            }}
            onFocus={(e) => e.target.style.borderColor = '#E2725B'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          >
            <option value="">Select housing type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="temporary">Temporary (first months)</option>
            <option value="undecided">Undecided</option>
          </select>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
            Work Status
          </label>
          <select
            value={formData.preferences.workStatus}
            onChange={(e) => handleInputChange('preferences', 'workStatus', e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              backgroundColor: 'white'
            }}
            onFocus={(e) => e.target.style.borderColor = '#E2725B'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          >
            <option value="">Select work status</option>
            <option value="remote">Remote work</option>
            <option value="employed">Seeking employment</option>
            <option value="entrepreneur">Starting business</option>
            <option value="retired">Retired</option>
            <option value="freelance">Freelancer</option>
            <option value="investor">Investor</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#1f2937' }}>
            Monthly Budget (€)
          </label>
          <select
            value={formData.preferences.budget}
            onChange={(e) => handleInputChange('preferences', 'budget', e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              backgroundColor: 'white'
            }}
            onFocus={(e) => e.target.style.borderColor = '#E2725B'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          >
            <option value="">Select budget range</option>
            <option value="1000-1500">€1,000 - €1,500</option>
            <option value="1500-2500">€1,500 - €2,500</option>
            <option value="2500-4000">€2,500 - €4,000</option>
            <option value="4000-6000">€4,000 - €6,000</option>
            <option value="6000+">€6,000+</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderReview = () => (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#1f2937', fontSize: '1.25rem', fontWeight: '600' }}>
          Personal Information
        </h3>
        <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
          <p><strong>Name:</strong> {formData.personalInfo.fullName}</p>
          <p><strong>Email:</strong> {formData.personalInfo.email}</p>
          <p><strong>Phone:</strong> {formData.personalInfo.phone}</p>
          <p><strong>Nationality:</strong> {formData.personalInfo.nationality}</p>
        </div>
      </div>
      
      <div style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid #bae6fd'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#1f2937', fontSize: '1.25rem', fontWeight: '600' }}>
          Relocation Details
        </h3>
        <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
          <p><strong>Visa Type:</strong> {formData.relocationInfo.visaType}</p>
          <p><strong>Arrival Date:</strong> {formData.relocationInfo.arrivalDate}</p>
          <p><strong>Family Size:</strong> {formData.relocationInfo.familySize}</p>
          <p><strong>Current Country:</strong> {formData.relocationInfo.currentCountry}</p>
        </div>
      </div>
      
      <div style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid #bbf7d0'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#1f2937', fontSize: '1.25rem', fontWeight: '600' }}>
          Preferences
        </h3>
        <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
          <p><strong>Region:</strong> {formData.preferences.region}</p>
          <p><strong>Housing:</strong> {formData.preferences.housingType}</p>
          <p><strong>Work Status:</strong> {formData.preferences.workStatus}</p>
          <p><strong>Budget:</strong> {formData.preferences.budget}</p>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderRelocationInfo();
      case 2:
        return renderPreferences();
      case 3:
        return renderReview();
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .app-container { padding: 0 1rem !important; }
          .app-header { padding: 1.5rem 0 !important; }
          .app-header h1 { font-size: 2rem !important; }
          .app-header p { font-size: 1rem !important; }
          .progress-steps { 
            flex-direction: column !important;
            gap: 1rem !important;
            padding: 1.5rem !important;
          }
          .step-item { 
            flex-direction: row !important;
            text-align: left !important;
            width: 100% !important;
          }
          .step-icon { 
            width: 50px !important;
            height: 50px !important;
            margin-right: 1rem !important;
            margin-bottom: 0 !important;
          }
          .step-content { flex: 1; }
          .form-grid-two { grid-template-columns: 1fr !important; }
          .navigation-buttons { 
            flex-direction: column !important;
            gap: 1rem !important;
          }
          .navigation-buttons button {
            width: 100% !important;
          }
        }
        @media (max-width: 480px) {
          .app-container { padding: 0 0.5rem !important; }
          .progress-steps { padding: 1rem !important; }
          .step-icon { 
            width: 40px !important;
            height: 40px !important;
            font-size: 1.2rem !important;
          }
          .step-title { font-size: 0.9rem !important; }
          .step-description { font-size: 0.8rem !important; }
        }
      `}</style>
      
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        {/* Header */}
        <header className="app-header" style={{
          background: 'linear-gradient(135deg, #E2725B 0%, #A94438 100%)',
          color: 'white',
          padding: '2rem 0',
          marginBottom: '3rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
              Start Your Portugal Application
            </h1>
            <p style={{ fontSize: '1.125rem', textAlign: 'center', opacity: 0.9, fontFamily: 'Inter, sans-serif' }}>
              Your personalized relocation plan in 4 simple steps
            </p>
          </div>
        </header>

        <div className="app-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
          {/* Progress Steps */}
          <div className="progress-steps" style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            background: '#f8fafc',
            padding: '2rem',
            borderRadius: '16px'
          }}>
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-item"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  opacity: index <= currentStep ? 1 : 0.5,
                  transition: 'opacity 0.3s ease'
                }}
              >
                <div className="step-icon" style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: index <= currentStep 
                    ? 'linear-gradient(135deg, #E2725B 0%, #A94438 100%)'
                    : '#e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem',
                  color: index <= currentStep ? 'white' : '#9ca3af'
                }}>
                  {index < currentStep ? '✓' : step.icon}
                </div>
              <div className="step-content" style={{ textAlign: 'center' }}>
                <div className="step-title" style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: index <= currentStep ? '#E2725B' : '#6b7280',
                  marginBottom: '0.25rem'
                }}>
                  {step.title}
                </div>
                <div className="step-description" style={{
                  fontSize: '0.75rem',
                  color: '#9ca3af'
                }}>
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
            marginBottom: '2rem'
          }}
        >
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1rem',
            fontFamily: 'Inter, sans-serif'
          }}>
            {steps[currentStep].title}
          </h2>
          <p style={{
            color: '#6b7280',
            marginBottom: '2rem',
            fontSize: '1rem',
            lineHeight: '1.6',
            fontFamily: 'Inter, sans-serif'
          }}>
            {steps[currentStep].description}
          </p>

          {renderStepContent()}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="navigation-buttons" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            style={{
              background: currentStep === 0 ? '#f3f4f6' : 'white',
              color: currentStep === 0 ? '#9ca3af' : '#374151',
              border: '2px solid #e5e7eb',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (currentStep !== 0) {
                e.target.style.borderColor = '#E2725B';
                e.target.style.color = '#E2725B';
              }
            }}
            onMouseLeave={(e) => {
              if (currentStep !== 0) {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.color = '#374151';
              }
            }}
          >
            ← Previous
          </button>

          <button
            onClick={currentStep === steps.length - 1 ? () => alert('Application submitted!') : nextStep}
            style={{
              background: 'linear-gradient(135deg, #E2725B 0%, #A94438 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 20px rgba(226, 114, 91, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {currentStep === steps.length - 1 ? 'Submit Application' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ApplicationPage;

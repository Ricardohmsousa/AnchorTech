import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cookieManager from '../utils/cookieManager';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [preferences, setPreferences] = useState(cookieManager.cookieCategories);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has already consented and if consent hasn't expired
    const hasConsented = cookieManager.hasConsented();
    const isExpired = cookieManager.isConsentExpired();
    
    if (!hasConsented || isExpired) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // Apply existing preferences
      cookieManager.applyPreferences();
    }
  }, []);

  const handleAccept = () => {
    const acceptedPrefs = cookieManager.acceptAll();
    setPreferences(acceptedPrefs);
    closePopup();
    
    // Trigger any analytics or tracking initialization
    setTimeout(() => {
      cookieManager.applyPreferences(acceptedPrefs);
    }, 100);
  };

  const handleDecline = () => {
    const declinedPrefs = cookieManager.declineAll();
    setPreferences(declinedPrefs);
    closePopup();
  };

  const handleCustomize = () => {
    if (showCustomization) {
      // Save custom preferences
      const customPrefs = cookieManager.savePreferences(preferences);
      closePopup();
      
      // Apply preferences
      setTimeout(() => {
        cookieManager.applyPreferences(customPrefs);
      }, 100);
    } else {
      // Show customization panel
      setShowCustomization(true);
      setPreferences(cookieManager.loadPreferences());
    }
  };

  const handleCategoryToggle = (category) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        enabled: !prev[category].enabled
      }
    }));
  };

  const handleLearnMore = () => {
    navigate('/cookies');
  };

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        .cookie-consent-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          z-index: 10000;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.3s ease-out;
        }

        .cookie-consent-overlay.closing {
          animation: fadeOut 0.3s ease-out;
        }

        .cookie-consent-popup {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          max-width: 600px;
          width: 100%;
          padding: 2rem;
          margin-bottom: 2rem;
          animation: slideUp 0.3s ease-out;
          border: 1px solid #e5e7eb;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          max-height: 80vh;
          overflow-y: auto;
        }

        .cookie-consent-popup.large {
          max-width: 700px;
        }

        .cookie-consent-popup.closing {
          animation: slideDown 0.3s ease-out;
        }

        .cookie-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #0070f3 0%, #00d4ff 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .cookie-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .cookie-description {
          font-size: 1rem;
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .cookie-link {
          color: #0070f3;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .cookie-link:hover {
          color: #0051cc;
          text-decoration: underline;
        }

        .cookie-buttons {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-end;
        }

        .cookie-button {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          font-family: 'Inter', sans-serif;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 100px;
        }

        .cookie-button-primary {
          background: linear-gradient(135deg, #0070f3 0%, #0051cc 100%);
          color: white;
        }

        .cookie-button-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0, 112, 243, 0.3);
        }

        .cookie-button-secondary {
          background: transparent;
          color: #4a5568;
          border: 1px solid #d1d5db;
        }

        .cookie-button-secondary:hover {
          background: #f7fafc;
          border-color: #9ca3af;
        }

        .cookie-button-tertiary {
          background: transparent;
          color: #0070f3;
          border: 1px solid #0070f3;
        }

        .cookie-button-tertiary:hover {
          background: #0070f3;
          color: white;
        }

        .cookie-categories {
          margin: 1.5rem 0;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .cookie-category {
          border-bottom: 1px solid #e5e7eb;
          padding: 1rem;
        }

        .cookie-category:last-child {
          border-bottom: none;
        }

        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .category-title {
          font-size: 1rem;
          font-weight: 600;
          color: #1a202c;
          margin: 0;
        }

        .category-description {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
          line-height: 1.5;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 24px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #d1d5db;
          transition: 0.3s;
          border-radius: 24px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
        }

        .toggle-switch input:checked + .toggle-slider {
          background-color: #0070f3;
        }

        .toggle-switch input:checked + .toggle-slider:before {
          transform: translateX(24px);
        }

        .toggle-switch input:disabled + .toggle-slider {
          background-color: #9ca3af;
          cursor: not-allowed;
        }

        .back-button {
          background: none;
          border: none;
          color: #0070f3;
          font-size: 0.875rem;
          cursor: pointer;
          padding: 0;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .back-button:hover {
          text-decoration: underline;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(50px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from { 
            opacity: 1;
            transform: translateY(0);
          }
          to { 
            opacity: 0;
            transform: translateY(50px);
          }
        }

        @media (max-width: 768px) {
          .cookie-consent-popup {
            padding: 1.5rem;
            margin: 1rem;
            border-radius: 12px;
          }

          .cookie-title {
            font-size: 1.25rem;
          }

          .cookie-description {
            font-size: 0.9rem;
          }

          .cookie-buttons {
            flex-direction: column;
            gap: 0.5rem;
          }

          .cookie-button {
            width: 100%;
            padding: 1rem 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .cookie-consent-overlay {
            padding: 0.5rem;
            align-items: flex-end;
          }

          .cookie-consent-popup {
            margin: 0;
            border-radius: 12px 12px 0 0;
            max-height: 80vh;
            overflow-y: auto;
          }
        }
      `}</style>

      <div 
        className={`cookie-consent-overlay ${isClosing ? 'closing' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            // Don't close on backdrop click for cookie consent
          }
        }}
      >
        <div className={`cookie-consent-popup ${showCustomization ? 'large' : ''} ${isClosing ? 'closing' : ''}`}>
          {showCustomization && (
            <button 
              onClick={() => setShowCustomization(false)}
              className="back-button"
            >
              ← Back to basic settings
            </button>
          )}

          {/* Cookie Icon */}
          <div className="cookie-icon">
            🍪
          </div>

          {/* Title */}
          <h2 className="cookie-title">
            {showCustomization ? 'Customize Cookie Preferences' : 'We Value Your Privacy'}
          </h2>

          {/* Description */}
          {!showCustomization ? (
            <p className="cookie-description">
              We use cookies to enhance your browsing experience, serve personalized content, 
              and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
              You can manage your preferences or learn more in our{' '}
              <button 
                onClick={handleLearnMore}
                className="cookie-link"
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  padding: 0,
                  cursor: 'pointer',
                  fontSize: 'inherit'
                }}
              >
                Cookie Policy
              </button>.
            </p>
          ) : (
            <>
              <p className="cookie-description">
                Choose which types of cookies you want to allow. You can change these settings at any time.
              </p>
              
              {/* Cookie Categories */}
              <div className="cookie-categories">
                {Object.entries(preferences).map(([category, config]) => (
                  <div key={category} className="cookie-category">
                    <div className="category-header">
                      <h4 className="category-title">{config.name}</h4>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={config.enabled}
                          disabled={config.required}
                          onChange={() => handleCategoryToggle(category)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    <p className="category-description">
                      {config.description}
                      {config.required && ' (Required)'}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="cookie-buttons">
            {!showCustomization ? (
              <>
                <button
                  onClick={handleDecline}
                  className="cookie-button cookie-button-secondary"
                >
                  Decline
                </button>
                
                <button
                  onClick={handleCustomize}
                  className="cookie-button cookie-button-tertiary"
                >
                  Customize
                </button>
                
                <button
                  onClick={handleAccept}
                  className="cookie-button cookie-button-primary"
                >
                  Accept All
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleDecline}
                  className="cookie-button cookie-button-secondary"
                >
                  Only Necessary
                </button>
                
                <button
                  onClick={handleCustomize}
                  className="cookie-button cookie-button-primary"
                >
                  Save Preferences
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
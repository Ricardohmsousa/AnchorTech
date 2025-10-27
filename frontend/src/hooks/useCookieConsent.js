import { useState, useEffect } from 'react';
import cookieManager from '../utils/cookieManager';

// Custom hook for cookie management
export const useCookieConsent = () => {
  const [hasConsented, setHasConsented] = useState(false);
  const [consentStatus, setConsentStatus] = useState(null);
  const [preferences, setPreferences] = useState(cookieManager.cookieCategories);

  useEffect(() => {
    // Check initial consent status
    const consent = cookieManager.hasConsented();
    const status = cookieManager.getConsentStatus();
    const prefs = cookieManager.loadPreferences();

    setHasConsented(consent);
    setConsentStatus(status);
    setPreferences(prefs);

    // Apply existing preferences if user has consented
    if (consent && !cookieManager.isConsentExpired()) {
      cookieManager.applyPreferences(prefs);
    }
  }, []);

  const acceptAll = () => {
    const newPrefs = cookieManager.acceptAll();
    setHasConsented(true);
    setConsentStatus('accepted');
    setPreferences(newPrefs);
    return newPrefs;
  };

  const declineAll = () => {
    const newPrefs = cookieManager.declineAll();
    setHasConsented(true);
    setConsentStatus('declined');
    setPreferences(newPrefs);
    return newPrefs;
  };

  const updatePreferences = (newPrefs) => {
    const savedPrefs = cookieManager.savePreferences(newPrefs);
    setHasConsented(true);
    setConsentStatus('custom');
    setPreferences(savedPrefs);
    return savedPrefs;
  };

  const resetConsent = () => {
    cookieManager.resetConsent();
    setHasConsented(false);
    setConsentStatus(null);
    setPreferences(cookieManager.cookieCategories);
  };

  const isCategoryEnabled = (category) => {
    return cookieManager.isCategoryEnabled(category);
  };

  return {
    hasConsented,
    consentStatus,
    preferences,
    acceptAll,
    declineAll,
    updatePreferences,
    resetConsent,
    isCategoryEnabled,
    isConsentExpired: cookieManager.isConsentExpired(),
    getConsentExpiry: cookieManager.getConsentExpiry()
  };
};

// Custom hook for tracking analytics
export const useAnalytics = () => {
  const { isCategoryEnabled } = useCookieConsent();
  const analyticsEnabled = isCategoryEnabled('analytics');

  const trackEvent = (eventName, parameters = {}) => {
    if (analyticsEnabled && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  };

  const trackPageView = (pagePath) => {
    if (analyticsEnabled && typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: pagePath
      });
    }
  };

  return {
    analyticsEnabled,
    trackEvent,
    trackPageView
  };
};

// Custom hook for functional cookies
export const useFunctionalCookies = () => {
  const { isCategoryEnabled } = useCookieConsent();
  const functionalEnabled = isCategoryEnabled('functional');

  const setUserPreference = (key, value) => {
    if (functionalEnabled) {
      cookieManager.setCookie(`user_pref_${key}`, value, 90);
    }
  };

  const getUserPreference = (key) => {
    if (functionalEnabled) {
      return cookieManager.getCookie(`user_pref_${key}`);
    }
    return null;
  };

  return {
    functionalEnabled,
    setUserPreference,
    getUserPreference
  };
};

export default useCookieConsent;
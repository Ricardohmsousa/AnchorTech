// React hook for Google Analytics
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import ga from '../services/analytics';

// Hook for page tracking
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when location changes
    ga.trackPageView(document.title, window.location.href);
  }, [location]);
};

// Hook for event tracking
export const useAnalytics = () => {
  const trackEvent = useCallback((action, category, label, value) => {
    ga.trackEvent(action, category, label, value);
  }, []);

  const trackBusinessEvent = useCallback((eventType, serviceType, packageName) => {
    ga.trackBusinessEvent(eventType, serviceType, packageName);
  }, []);

  const trackConversion = useCallback((conversionType, value, currency = 'EUR') => {
    ga.trackConversion(conversionType, value, currency);
  }, []);

  const trackFormSubmission = useCallback((formName, formType) => {
    ga.trackFormSubmission(formName, formType);
  }, []);

  const trackServiceView = useCallback((serviceName) => {
    ga.trackServiceView(serviceName);
  }, []);

  const trackPricingInteraction = useCallback((action, packageName) => {
    ga.trackPricingInteraction(action, packageName);
  }, []);

  const trackUserRegistration = useCallback((userType) => {
    ga.trackUserRegistration(userType);
  }, []);

  const trackUserLogin = useCallback((userType) => {
    ga.trackUserLogin(userType);
  }, []);

  const trackDownload = useCallback((fileName, fileType) => {
    ga.trackDownload(fileName, fileType);
  }, []);

  const trackExternalLink = useCallback((url, linkText) => {
    ga.trackExternalLink(url, linkText);
  }, []);

  return {
    trackEvent,
    trackBusinessEvent,
    trackConversion,
    trackFormSubmission,
    trackServiceView,
    trackPricingInteraction,
    trackUserRegistration,
    trackUserLogin,
    trackDownload,
    trackExternalLink
  };
};
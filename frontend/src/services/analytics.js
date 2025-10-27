// Google Analytics utility functions

class GoogleAnalytics {
  constructor() {
    this.isInitialized = false;
    this.measurementId = null;
    this.init();
  }

  init() {
    // Check if running in browser and gtag is available
    if (typeof window !== 'undefined' && window.gtag) {
      this.isInitialized = true;
      this.measurementId = window.ENV?.REACT_APP_GA_MEASUREMENT_ID;
      console.log('Google Analytics service initialized');
    }
  }

  // Track page views
  trackPageView(page_title, page_location) {
    if (!this.isInitialized || !window.gtag) return;
    
    window.gtag('config', this.measurementId, {
      page_title,
      page_location
    });
  }

  // Track custom events
  trackEvent(action, category, label = null, value = null) {
    if (!this.isInitialized || !window.gtag) return;

    const eventData = {
      event_category: category,
      event_label: label,
      value: value
    };

    // Remove null values
    Object.keys(eventData).forEach(key => {
      if (eventData[key] === null) {
        delete eventData[key];
      }
    });

    window.gtag('event', action, eventData);
    
    console.log('GA Event tracked:', { action, category, label, value });
  }

  // Track user engagement events
  trackUserEngagement(action, details = {}) {
    this.trackEvent(action, 'engagement', details.label, details.value);
  }

  // Track business-specific events
  trackBusinessEvent(eventType, serviceType, packageName = null) {
    const eventData = {
      event_category: 'business',
      service_type: serviceType,
      package_name: packageName
    };

    window.gtag && window.gtag('event', eventType, eventData);
    
    console.log('Business event tracked:', { eventType, serviceType, packageName });
  }

  // Track conversions (purchases, sign-ups, etc.)
  trackConversion(conversionType, value = null, currency = 'EUR') {
    if (!this.isInitialized || !window.gtag) return;

    const conversionData = {
      event_category: 'conversion',
      value: value,
      currency: currency
    };

    window.gtag('event', 'conversion', conversionData);
    
    // Also track as a purchase if it's a paid conversion
    if (value && value > 0) {
      window.gtag('event', 'purchase', {
        transaction_id: Date.now().toString(),
        value: value,
        currency: currency
      });
    }

    console.log('Conversion tracked:', { conversionType, value, currency });
  }

  // Track form submissions
  trackFormSubmission(formName, formType = 'contact') {
    this.trackEvent('form_submit', 'form_interaction', formName);
  }

  // Track file downloads
  trackDownload(fileName, fileType = 'document') {
    this.trackEvent('file_download', 'download', fileName);
  }

  // Track external link clicks
  trackExternalLink(url, linkText = null) {
    this.trackEvent('click', 'external_link', linkText || url);
  }

  // Track service page visits
  trackServiceView(serviceName) {
    this.trackEvent('page_view', 'service', serviceName);
  }

  // Track pricing page interactions
  trackPricingInteraction(action, packageName) {
    this.trackEvent(action, 'pricing', packageName);
  }

  // Set user properties
  setUserProperty(property, value) {
    if (!this.isInitialized || !window.gtag) return;
    
    window.gtag('config', this.measurementId, {
      custom_map: { [property]: value }
    });
  }

  // Track user registration
  trackUserRegistration(userType) {
    this.trackEvent('sign_up', 'user_registration', userType);
  }

  // Track login
  trackUserLogin(userType) {
    this.trackEvent('login', 'user_authentication', userType);
  }
}

// Create singleton instance
const ga = new GoogleAnalytics();

export default ga;
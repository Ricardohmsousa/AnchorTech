// Cookie Management Utility
class CookieManager {
  constructor() {
    this.cookieCategories = {
      necessary: {
        name: 'Necessary Cookies',
        description: 'Essential cookies required for basic website functionality',
        enabled: true,
        required: true,
        cookies: [
          'cookieConsent',
          'cookieConsentDate',
          'cookiePreferences',
          'sessionId'
        ]
      },
      analytics: {
        name: 'Analytics Cookies',
        description: 'Help us understand how visitors interact with our website',
        enabled: false,
        required: false,
        cookies: [
          '_ga',
          '_ga_*',
          '_gid',
          '_gat',
          'gtag'
        ]
      },
      marketing: {
        name: 'Marketing Cookies',
        description: 'Used to track visitors and display relevant advertisements',
        enabled: false,
        required: false,
        cookies: [
          '_fbp',
          '_fbc',
          'fr',
          'tr',
          'linkedin_oauth_*'
        ]
      },
      functional: {
        name: 'Functional Cookies',
        description: 'Enable enhanced functionality and personalization',
        enabled: false,
        required: false,
        cookies: [
          'language',
          'theme',
          'user_preferences',
          'chat_session'
        ]
      }
    };
  }

  // Set cookie with expiration
  setCookie(name, value, days = 365, options = {}) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    
    const cookieOptions = {
      expires: date.toUTCString(),
      path: '/',
      secure: window.location.protocol === 'https:',
      sameSite: 'Lax',
      ...options
    };

    let cookieString = `${name}=${encodeURIComponent(value)}`;
    
    Object.entries(cookieOptions).forEach(([key, val]) => {
      if (val === true) {
        cookieString += `; ${key}`;
      } else if (val !== false && val !== null && val !== undefined) {
        cookieString += `; ${key}=${val}`;
      }
    });

    document.cookie = cookieString;
  }

  // Get cookie value
  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  }

  // Delete cookie
  deleteCookie(name, path = '/') {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
  }

  // Get all cookies
  getAllCookies() {
    const cookies = {};
    document.cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.split('=').map(c => c.trim());
      if (name) {
        cookies[name] = decodeURIComponent(value || '');
      }
    });
    return cookies;
  }

  // Save user preferences
  savePreferences(preferences) {
    const prefs = {
      ...this.cookieCategories,
      ...preferences,
      timestamp: new Date().toISOString()
    };

    this.setCookie('cookiePreferences', JSON.stringify(prefs), 365);
    this.setCookie('cookieConsent', 'custom', 365);
    this.setCookie('cookieConsentDate', new Date().toISOString(), 365);

    // Apply preferences immediately
    this.applyPreferences(prefs);
    
    return prefs;
  }

  // Load user preferences
  loadPreferences() {
    const saved = this.getCookie('cookiePreferences');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse cookie preferences:', e);
      }
    }
    return this.cookieCategories;
  }

  // Apply cookie preferences
  applyPreferences(preferences = null) {
    const prefs = preferences || this.loadPreferences();
    
    // Remove cookies for disabled categories
    Object.entries(prefs).forEach(([category, config]) => {
      if (config && !config.enabled && !config.required) {
        this.removeCategoryCookies(config.cookies || []);
      }
    });

    // Initialize analytics if enabled
    if (prefs.analytics?.enabled) {
      this.initializeAnalytics();
    }

    // Initialize marketing if enabled
    if (prefs.marketing?.enabled) {
      this.initializeMarketing();
    }

    // Initialize functional cookies if enabled
    if (prefs.functional?.enabled) {
      this.initializeFunctional();
    }
  }

  // Remove cookies for a category
  removeCategoryCookies(cookieNames) {
    cookieNames.forEach(cookieName => {
      // Handle wildcard patterns
      if (cookieName.includes('*')) {
        const pattern = cookieName.replace('*', '');
        const allCookies = this.getAllCookies();
        
        Object.keys(allCookies).forEach(name => {
          if (name.startsWith(pattern)) {
            this.deleteCookie(name);
          }
        });
      } else {
        this.deleteCookie(cookieName);
      }
    });
  }

  // Accept all cookies
  acceptAll() {
    const allEnabled = {};
    Object.keys(this.cookieCategories).forEach(category => {
      allEnabled[category] = {
        ...this.cookieCategories[category],
        enabled: true
      };
    });

    this.setCookie('cookieConsent', 'accepted', 365);
    this.setCookie('cookieConsentDate', new Date().toISOString(), 365);
    
    return this.savePreferences(allEnabled);
  }

  // Decline all optional cookies
  declineAll() {
    const onlyNecessary = {};
    Object.keys(this.cookieCategories).forEach(category => {
      onlyNecessary[category] = {
        ...this.cookieCategories[category],
        enabled: this.cookieCategories[category].required
      };
    });

    this.setCookie('cookieConsent', 'declined', 365);
    this.setCookie('cookieConsentDate', new Date().toISOString(), 365);
    
    return this.savePreferences(onlyNecessary);
  }

  // Check if user has consented
  hasConsented() {
    return this.getCookie('cookieConsent') !== null;
  }

  // Get consent status
  getConsentStatus() {
    return this.getCookie('cookieConsent');
  }

  // Check if specific category is enabled
  isCategoryEnabled(category) {
    const prefs = this.loadPreferences();
    return prefs[category]?.enabled || false;
  }

  // Initialize Analytics (Google Analytics, etc.)
  initializeAnalytics() {
    if (typeof window !== 'undefined' && !window.gtag) {
      // Initialize Google Analytics if not already loaded
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID', {
        anonymize_ip: true,
        cookie_flags: 'secure;samesite=lax'
      });
    }
  }

  // Initialize Marketing cookies
  initializeMarketing() {
    // Initialize Facebook Pixel, LinkedIn Insight Tag, etc.
    console.log('Marketing cookies initialized');
  }

  // Initialize Functional cookies
  initializeFunctional() {
    // Initialize functional features like chat widgets, etc.
    console.log('Functional cookies initialized');
  }

  // Get consent expiry date
  getConsentExpiry() {
    const consentDate = this.getCookie('cookieConsentDate');
    if (consentDate) {
      const date = new Date(consentDate);
      date.setFullYear(date.getFullYear() + 1); // 1 year expiry
      return date;
    }
    return null;
  }

  // Check if consent has expired
  isConsentExpired() {
    const expiry = this.getConsentExpiry();
    return expiry && new Date() > expiry;
  }

  // Reset all consent and preferences
  resetConsent() {
    this.deleteCookie('cookieConsent');
    this.deleteCookie('cookieConsentDate');
    this.deleteCookie('cookiePreferences');
    
    // Remove all non-necessary cookies
    Object.entries(this.cookieCategories).forEach(([category, config]) => {
      if (!config.required) {
        this.removeCategoryCookies(config.cookies);
      }
    });
  }
}

// Create singleton instance
const cookieManager = new CookieManager();

export default cookieManager;
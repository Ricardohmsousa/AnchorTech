import React, { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { 
  Elements, 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement, 
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';
import { STRIPE_PUBLISHABLE_KEY, API_BASE_URL } from './config';
import { button as buttonStyle } from './sharedStyles';

// Load Stripe outside of component to avoid recreating the object
// Updated: 2025-10-09 - Added automatic focus test and token expiration check
console.log('🔑 Stripe key available:', !!STRIPE_PUBLISHABLE_KEY);
console.log('🔑 Stripe key length:', STRIPE_PUBLISHABLE_KEY ? STRIPE_PUBLISHABLE_KEY.length : 0);
const stripePromise = STRIPE_PUBLISHABLE_KEY ? loadStripe(STRIPE_PUBLISHABLE_KEY) : null;
console.log('🔄 Stripe promise created:', !!stripePromise);

// Add debugging for stripe promise resolution
if (stripePromise) {
  stripePromise.then(stripe => {
    console.log('✅ Stripe loaded successfully:', !!stripe);
    if (stripe) {
      console.log('📊 Stripe version:', stripe.version);
    }
  }).catch(error => {
    console.error('❌ Stripe loading failed:', error);
  });
}

const SimpleCheckoutForm = ({ amount, onSuccess, onError, onCancel, loading, setLoading }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [cardholderName, setCardholderName] = useState('');
  
  // Refs to prevent re-mounting of Stripe elements
  const cardElementRef = useRef(null);
  const [elementsReady, setElementsReady] = useState(false);

  // Check if Stripe is properly configured
  if (!STRIPE_PUBLISHABLE_KEY) {
    return (
      <div style={{ color: '#d32f2f', padding: 16, textAlign: 'center' }}>
        ⚠️ Payment system not configured. Please contact support.
      </div>
    );
  }

  // Debug logging
  console.log('SimpleCheckoutForm render:', { stripe: !!stripe, elements: !!elements, loading });
  console.log('API_BASE_URL being used:', API_BASE_URL);

  // Ensure Stripe elements are ready and prevent double mounting
  useEffect(() => {
    if (stripe && elements) {
      console.log('✅ Stripe and Elements are ready');
      setElementsReady(true);
      
      // Check for tracking prevention issues
      const checkTrackingPrevention = () => {
        const errorMessages = document.querySelectorAll('[data-testid="error-message"]');
        if (errorMessages.length > 0) {
          console.warn('⚠️ Possible tracking prevention detected');
        }
      };
      
      // Check after a short delay to allow Stripe to initialize
      setTimeout(checkTrackingPrevention, 2000);
      
      // Add global click listener to debug click interception
      const globalClickHandler = (e) => {
        console.log('🌍 GLOBAL CLICK:', {
          target: e.target?.tagName,
          className: e.target?.className,
          id: e.target?.id,
          isStripeFrame: e.target?.tagName === 'IFRAME' && e.target?.title?.includes('Secure'),
        });
      };
      
      document.addEventListener('click', globalClickHandler, true);
      
      return () => {
        document.removeEventListener('click', globalClickHandler, true);
      };
    }
  }, [stripe, elements]);

  // Show loading state while Stripe is initializing
  if (!stripe || !elements || !elementsReady) {
    return (
      <div style={{ color: '#666', padding: 16, textAlign: 'center' }}>
        🔄 Loading payment system...
      </div>
    );
  }

  // Helper to get JWT token from localStorage
  function getAuthHeaders() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    console.log('PaymentForm - User from localStorage:', user);
    if (user && user.token) {
      console.log('PaymentForm - Token exists, length:', user.token.length);
      
      // Check if token is expired (basic JWT check)
      try {
        const tokenPayload = JSON.parse(atob(user.token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        console.log('Token exp:', tokenPayload.exp, 'Current time:', currentTime);
        
        if (tokenPayload.exp && tokenPayload.exp < currentTime) {
          console.warn('⚠️ Token expired, redirecting to login');
          // Clear expired token
          localStorage.removeItem('user');
          // Redirect to login - you might want to customize this
          window.location.href = '/login';
          return {};
        }
      } catch (e) {
        console.warn('Could not parse token expiration:', e);
      }
      
      return { Authorization: `Bearer ${user.token}` };
    }
    console.log('PaymentForm - No token found');
    return {};
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setPaymentError(null);

    try {
      // Create payment intent on backend
      const requestUrl = `${API_BASE_URL}/create-payment-intent`;
      const headers = {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      };
      const requestBody = {
        amount: amount,
        service_type: 'nif_application'
      };
      
      console.log('🔄 Making payment request...');
      console.log('URL:', requestUrl);
      console.log('Headers:', headers);
      console.log('Body:', requestBody);
      
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
      });
      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Payment intent creation failed:', errorData);
        
        // Handle authentication errors specifically
        if (response.status === 401) {
          throw new Error('Your session has expired. Please log in again.');
        }
        
        throw new Error(`Failed to create payment intent: ${response.status} - ${errorData}`);
      }

      const { client_secret } = await response.json();

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: cardholderName || 'Customer',
          },
        },
      });

      if (error) {
        setPaymentError(error.message);
        setLoading(false);
      } else if (paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent);
      }
    } catch (err) {
      setPaymentError(err.message);
      setLoading(false);
      onError(err);
    }
  };

  const elementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#000000',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        backgroundColor: '#ffffff',
        '::placeholder': {
          color: '#666666',
        },
        ':focus': {
          color: '#000000',
        },
      },
      invalid: {
        color: '#dc2626',
        iconColor: '#dc2626'
      },
      complete: {
        color: '#000000',
        iconColor: '#059669'
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      {/* Clear Instructions */}
      <div style={{
        backgroundColor: '#e3f2fd',
        border: '1px solid #1976d2',
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
        fontSize: 14
      }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>💳 How to pay:</h4>
        <p style={{ margin: '0 0 8px 0' }}>
          1. Enter your name below<br/>
          2. Fill in the separate card fields: Card Number, Expiry Date (MM/YY), and CVC
        </p>
        <p style={{ margin: 0, fontWeight: 600 }}>
          🧪 Test: Card <code>4242 4242 4242 4242</code> | Expiry <code>12/25</code> | CVC <code>123</code>
        </p>
      </div>
      
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 10, color: '#333' }}>Payment Details</h3>
        
        {/* Cardholder Name Input */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ 
            display: 'block', 
            marginBottom: 6, 
            fontWeight: 600, 
            color: '#333', 
            fontSize: 14 
          }}>
            Cardholder Name
          </label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="John Doe"
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '2px solid #e0e0e0',
              borderRadius: 8,
              fontSize: 16,
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              backgroundColor: '#fff',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#0070f3'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            required
          />
        </div>

        {/* Card Number */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ 
            display: 'block', 
            marginBottom: 6, 
            fontWeight: 600, 
            color: '#333', 
            fontSize: 14 
          }}>
            Card Number
          </label>
          <div style={{ 
            padding: '14px 16px', 
            border: '2px solid #e0e0e0', 
            borderRadius: 8, 
            backgroundColor: '#fff',
            minHeight: 48,
            display: 'flex',
            alignItems: 'center',
          }}>
            <CardNumberElement 
              options={elementOptions}
              onChange={(event) => {
                console.log('🔢 Card number change:', {
                  error: event.error?.message,
                  complete: event.complete,
                  empty: event.empty,
                  brand: event.brand
                });
                setPaymentError(event.error ? event.error.message : null);
              }}
            />
          </div>
        </div>

        {/* Expiry and CVC in a row */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          {/* Expiry Date */}
          <div style={{ flex: 1 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 6, 
              fontWeight: 600, 
              color: '#333', 
              fontSize: 14 
            }}>
              Expiry Date
            </label>
            <div style={{ 
              padding: '14px 16px', 
              border: '2px solid #e0e0e0', 
              borderRadius: 8, 
              backgroundColor: '#fff',
              minHeight: 48,
              display: 'flex',
              alignItems: 'center',
            }}>
              <CardExpiryElement 
                options={elementOptions}
                onChange={(event) => {
                  console.log('📅 Expiry change:', event);
                  if (event.error) setPaymentError(event.error.message);
                }}
              />
            </div>
          </div>

          {/* CVC */}
          <div style={{ flex: 1 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 6, 
              fontWeight: 600, 
              color: '#333', 
              fontSize: 14 
            }}>
              CVC
            </label>
            <div style={{ 
              padding: '14px 16px', 
              border: '2px solid #e0e0e0', 
              borderRadius: 8, 
              backgroundColor: '#fff',
              minHeight: 48,
              display: 'flex',
              alignItems: 'center',
            }}>
              <CardCvcElement 
                options={elementOptions}
                onChange={(event) => {
                  console.log('� CVC change:', event);
                  if (event.error) setPaymentError(event.error.message);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {paymentError && (
        <div style={{ 
          color: '#d32f2f', 
          marginBottom: 16, 
          padding: 8, 
          backgroundColor: '#ffebee', 
          borderRadius: 4,
          fontSize: 14
        }}>
          {paymentError}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            ...buttonStyle,
            backgroundColor: '#6c757d',
            border: '1px solid #6c757d'
          }}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          style={{
            ...buttonStyle,
            backgroundColor: loading ? '#ccc' : '#0070f3',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Processing...' : `Pay €${(amount / 100).toFixed(2)}`}
        </button>
      </div>
      
      {/* Debug information - moved to SimpleCheckoutForm where elementsReady is defined */}
      <div style={{ 
        marginTop: 16, 
        padding: 8, 
        backgroundColor: '#f0f0f0', 
        border: '1px solid #ddd',
        borderRadius: 4,
        fontSize: 10,
        color: '#333',
        fontFamily: 'monospace'
      }}>
        <div>🔧 DEBUG: Elements ready = {elementsReady ? 'YES' : 'NO'}</div>
        <div>🔧 DEBUG: Stripe available = {!!stripe ? 'YES' : 'NO'}</div>
        <div>🔧 DEBUG: Elements available = {!!elements ? 'YES' : 'NO'}</div>
        <button 
          type="button"
          onClick={() => {
            console.log('🔧 MANUAL DEBUG TEST');
            const cardNumberElement = elements?.getElement(CardNumberElement);
            console.log('🔧 CardNumberElement from elements:', cardNumberElement);
            if (cardNumberElement && typeof cardNumberElement.focus === 'function') {
              console.log('🔧 Calling cardNumberElement.focus()');
              cardNumberElement.focus();
            } else {
              console.log('🔧 Cannot focus element');
            }
          }}
          style={{
            marginTop: 4,
            padding: '2px 6px',
            fontSize: 9,
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 2,
            cursor: 'pointer'
          }}
        >
          FORCE FOCUS
        </button>
      </div>
    </form>
  );
};

const PaymentForm = ({ amount, onSuccess, onError, onCancel }) => {
  const [loading, setLoading] = useState(false);

  // Check if Stripe is available
  if (!stripePromise) {
    return (
      <div style={{ 
        padding: 24, 
        border: '1px solid #e0e0e0', 
        borderRadius: 8, 
        backgroundColor: 'white',
        textAlign: 'center'
      }}>
        <div style={{ color: '#d32f2f', marginBottom: 16 }}>
          ⚠️ Payment system is not configured
        </div>
        <button
          onClick={onCancel}
          style={{
            ...buttonStyle,
            backgroundColor: '#6c757d',
            border: '1px solid #6c757d'
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} key="stripe-elements-simple">
      <div style={{ 
        padding: 24, 
        border: '1px solid #e0e0e0', 
        borderRadius: 8, 
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ color: '#333', marginBottom: 8 }}>Complete Your Payment</h2>
          <p style={{ color: '#666', margin: 0 }}>
            You'll be charged €{(amount / 100).toFixed(2)} for the NIF application service
          </p>
        </div>
        
        <SimpleCheckoutForm 
          amount={amount}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
          loading={loading}
          setLoading={setLoading}
        />
        
        <div style={{ 
          marginTop: 16, 
          fontSize: 12, 
          color: '#999', 
          textAlign: 'center' 
        }}>
          <p>🔒 Your payment information is securely processed by Stripe</p>
          <p style={{ marginTop: 8, fontSize: 11 }}>
            Test card: 4242 4242 4242 4242 | Any future date | Any CVC
          </p>
          
          <div style={{ 
            marginTop: 12, 
            padding: 8, 
            backgroundColor: '#fff3cd', 
            border: '1px solid #ffeaa7',
            borderRadius: 4,
            fontSize: 11,
            color: '#856404'
          }}>
            💡 If the card field isn't responding, try:
            <br />• Disabling tracking protection for this site
            <br />• Using a different browser (Chrome/Firefox)
            <br />• Refreshing the page
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default PaymentForm;
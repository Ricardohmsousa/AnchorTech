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

const CheckoutForm = ({ amount, onSuccess, onError, onCancel, loading, setLoading }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [cardExpiryComplete, setCardExpiryComplete] = useState(false);
  const [cardCvcComplete, setCardCvcComplete] = useState(false);
  
  // Refs to prevent re-mounting of Stripe elements
  const cardNumberRef = useRef(null);
  const cardExpiryRef = useRef(null);
  const cardCvcRef = useRef(null);
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
  console.log('CheckoutForm render:', { stripe: !!stripe, elements: !!elements, loading });
  console.log('API_BASE_URL being used:', API_BASE_URL);

  // Ensure Stripe elements are ready and prevent double mounting
  useEffect(() => {
    if (stripe && elements) {
      console.log('✅ Stripe and Elements are ready');
      setElementsReady(true);
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
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
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

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#aab7c4',
        },
        // Removed lineHeight as per Stripe warning - using container padding instead
      },
      invalid: {
        color: '#9e2146',
      },
      complete: {
        color: '#2e7d32',
      },
    },
    // Explicitly ensure elements are not disabled
    disabled: false,
    // Add padding for better touch targets
    classes: {
      base: 'stripe-element-base',
      complete: 'stripe-element-complete',
      empty: 'stripe-element-empty',
      focus: 'stripe-element-focus',
      invalid: 'stripe-element-invalid',
      webkitAutofill: 'stripe-element-webkit-autofill',
    },
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
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
              padding: '12px 16px',
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

        {/* Card Details */}
        <div style={{ marginBottom: 8 }}>
          <label style={{ 
            display: 'block', 
            marginBottom: 6, 
            fontWeight: 600, 
            color: '#333', 
            fontSize: 14 
          }}>
            Card Number
          </label>
        </div>
        <div style={{ 
          padding: '14px 16px', 
          border: '2px solid #e0e0e0', 
          borderRadius: 8, 
          backgroundColor: '#fff',
          minHeight: 48,
          display: 'flex',
          alignItems: 'center',
          marginBottom: 16,
          cursor: 'text',
          // Fix potential CSS issues
          position: 'relative',
          zIndex: 1,
          overflow: 'visible',
          // Ensure proper box model
          boxSizing: 'border-box',
          width: '100%'
        }}>
          <CardNumberElement 
            ref={cardNumberRef}
            options={{
              ...cardElementOptions,
              // Ensure element is not disabled
              disabled: false,
            }}
            onChange={(event) => {
              console.log('📱 Card number change:', event);
              console.log('📱 Event details:', {
                error: event.error,
                complete: event.complete,
                empty: event.empty,
                elementType: event.elementType
              });
              setPaymentError(event.error ? event.error.message : null);
              setCardNumberComplete(event.complete);
            }}
            onReady={(element) => {
              console.log('✅ Card number element ready', element);
              console.log('✅ Element can be focused:', typeof element.focus === 'function');
            }}
            onFocus={(event) => {
              console.log('🎯 Card number element focused', event);
              // Update border color on focus
              if (cardNumberRef.current && cardNumberRef.current.parentElement) {
                cardNumberRef.current.parentElement.style.borderColor = '#0070f3';
              }
            }}
            onBlur={(event) => {
              console.log('👋 Card number element blurred', event);
              // Reset border color on blur
              if (cardNumberRef.current && cardNumberRef.current.parentElement) {
                cardNumberRef.current.parentElement.style.borderColor = '#e0e0e0';
              }
            }}
          />
        </div>

        {/* Expiry and CVC Row */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
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
              cursor: 'text',
              // Fix potential CSS issues
              position: 'relative',
              zIndex: 1,
              overflow: 'visible',
              boxSizing: 'border-box',
              width: '100%'
            }}>
              <CardExpiryElement 
                ref={cardExpiryRef}
                options={{
                  ...cardElementOptions,
                  disabled: false,
                }}
                onChange={(event) => {
                  console.log('📅 Expiry change:', event);
                  console.log('📅 Event details:', {
                    error: event.error,
                    complete: event.complete,
                    empty: event.empty,
                    elementType: event.elementType
                  });
                  if (event.error) setPaymentError(event.error.message);
                  setCardExpiryComplete(event.complete);
                }}
                onReady={(element) => {
                  console.log('✅ Card expiry element ready', element);
                }}
                onFocus={(event) => {
                  console.log('🎯 Card expiry element focused', event);
                  if (cardExpiryRef.current && cardExpiryRef.current.parentElement) {
                    cardExpiryRef.current.parentElement.style.borderColor = '#0070f3';
                  }
                }}
                onBlur={(event) => {
                  console.log('👋 Card expiry element blurred', event);
                  if (cardExpiryRef.current && cardExpiryRef.current.parentElement) {
                    cardExpiryRef.current.parentElement.style.borderColor = '#e0e0e0';
                  }
                }}
              />
            </div>
          </div>
          
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
              cursor: 'text',
              // Fix potential CSS issues
              position: 'relative',
              zIndex: 1,
              overflow: 'visible',
              boxSizing: 'border-box',
              width: '100%'
            }}>
              <CardCvcElement 
                ref={cardCvcRef}
                options={{
                  ...cardElementOptions,
                  disabled: false,
                }}
                onChange={(event) => {
                  console.log('🔒 CVC change:', event);
                  console.log('🔒 Event details:', {
                    error: event.error,
                    complete: event.complete,
                    empty: event.empty,
                    elementType: event.elementType
                  });
                  if (event.error) setPaymentError(event.error.message);
                  setCardCvcComplete(event.complete);
                }}
                onReady={(element) => {
                  console.log('✅ Card CVC element ready', element);
                }}
                onFocus={(event) => {
                  console.log('🎯 Card CVC element focused', event);
                  if (cardCvcRef.current && cardCvcRef.current.parentElement) {
                    cardCvcRef.current.parentElement.style.borderColor = '#0070f3';
                  }
                }}
                onBlur={(event) => {
                  console.log('👋 Card CVC element blurred', event);
                  if (cardCvcRef.current && cardCvcRef.current.parentElement) {
                    cardCvcRef.current.parentElement.style.borderColor = '#e0e0e0';
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Completion indicator */}
        {cardNumberComplete && cardExpiryComplete && cardCvcComplete && (
          <div style={{ fontSize: 12, color: '#2e7d32', marginBottom: 8 }}>
            ✓ All card details complete
          </div>
        )}
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
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
    <Elements stripe={stripePromise} key="stripe-elements">
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
        
        <CheckoutForm 
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
        </div>
      </div>
    </Elements>
  );
};

export default PaymentForm;
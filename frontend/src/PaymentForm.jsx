import React, { useState, useMemo } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
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
  stripePromise
    .then((stripe) => {
      console.log('✅ Stripe loaded successfully:', !!stripe);
      if (stripe) console.log('📊 Stripe version:', stripe.version);
    })
    .catch((error) => {
      console.error('❌ Stripe loading failed:', error);
    });
}

const CheckoutForm = ({ amount, onSuccess, onError, onCancel, loading, setLoading }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState(null);
  const [cardholderName, setCardholderName] = useState('');

  // Individual completion states
  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [cardExpiryComplete, setCardExpiryComplete] = useState(false);
  const [cardCvcComplete, setCardCvcComplete] = useState(false);

  // Focus states for styling wrappers (no refs on Stripe Elements)
  const [numberFocused, setNumberFocused] = useState(false);
  const [expiryFocused, setExpiryFocused] = useState(false);
  const [cvcFocused, setCvcFocused] = useState(false);

  const allCardPartsComplete = cardNumberComplete && cardExpiryComplete && cardCvcComplete;

  // Memoize options so Elements don't remount on each render
  const cardElementOptions = useMemo(
    () => ({
      style: {
        base: {
          fontSize: '16px',
          color: '#1a1a1a', // Changed from '#424770' to darker, more visible color
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          backgroundColor: '#ffffff', // Explicitly set white background
          '::placeholder': { 
            color: '#6b7280' // Darker placeholder color
          },
        },
        invalid: { 
          color: '#dc2626', // Red for invalid input
          iconColor: '#dc2626'
        },
        complete: { 
          color: '#059669', // Green for complete input
          iconColor: '#059669'
        },
      },
      classes: {
        base: 'stripe-element-base',
        complete: 'stripe-element-complete',
        empty: 'stripe-element-empty',
        focus: 'stripe-element-focus',
        invalid: 'stripe-element-invalid',
        webkitAutofill: 'stripe-element-webkit-autofill',
      },
      // ❌ do NOT put `disabled` here; pass it as a prop
    }),
    []
  );

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

  // Helper to get JWT token from localStorage
  function getAuthHeaders() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setPaymentError(null);

    try {
      // Create payment intent on backend
      const requestUrl = `${API_BASE_URL}/create-payment-intent`;
      const headers = {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      };
      const requestBody = {
        amount: amount,
        service_type: 'nif_application',
      };

      console.log('🔄 Making payment request...');
      console.log('URL:', requestUrl);
      console.log('Headers:', headers);
      console.log('Body:', requestBody);

      const response = await fetch(requestUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Payment intent creation failed:', errorData);

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
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setLoading(false); // ensure we stop the spinner after success
        onSuccess(paymentIntent);
      } else {
        // Unexpected state
        setLoading(false);
        onError(new Error('Payment did not complete. Please try again.'));
      }
    } catch (err) {
      setPaymentError(err.message);
      setLoading(false);
      onError(err);
    }
  };

  // While Stripe bootstraps, Elements renders children once ready,
  // so no extra "elementsReady" gate is needed.

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 10, color: '#333' }}>Payment Details</h3>

        {/* Cardholder Name */}
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: 'block',
              marginBottom: 6,
              fontWeight: 600,
              color: '#333',
              fontSize: 14,
            }}
          >
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
              outline: 'none',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#0070f3')}
            onBlur={(e) => (e.target.style.borderColor = '#e0e0e0')}
            required
          />
        </div>

        {/* Card Number */}
        <div style={{ marginBottom: 8 }}>
          <label
            style={{
              display: 'block',
              marginBottom: 6,
              fontWeight: 600,
              color: '#333',
              fontSize: 14,
            }}
          >
            Card Number
          </label>
        </div>
        <div
          onClick={() => {
            console.log('🎯 Card Number wrapper clicked - attempting force focus');
            const cardNumberElement = elements?.getElement(CardNumberElement);
            if (cardNumberElement) {
              console.log('📱 Found CardNumberElement, calling focus()');
              cardNumberElement.focus();
            } else {
              console.error('❌ CardNumberElement not found in elements');
            }
          }}
          style={{
            padding: '14px 16px',
            border: `2px solid ${numberFocused ? '#0070f3' : '#e0e0e0'}`,
            borderRadius: 8,
            backgroundColor: '#fff',
            minHeight: 48,
            display: 'flex',
            alignItems: 'center',
            marginBottom: 16,
            cursor: 'text',
            position: 'relative',
            zIndex: 1,
            overflow: 'visible',
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          <CardNumberElement
            options={cardElementOptions}
            disabled={loading}
            onFocus={() => {
              console.log('🎯 Card number FOCUSED');
              setNumberFocused(true);
            }}
            onBlur={() => {
              console.log('👋 Card number BLURRED');
              setNumberFocused(false);
            }}
            onChange={(event) => {
              console.log('📱 Card number CHANGE:', {
                error: event.error,
                complete: event.complete,
                empty: event.empty,
                elementType: event.elementType
              });
              setPaymentError(event.error ? event.error.message : null);
              setCardNumberComplete(event.complete);
            }}
            onReady={() => {
              console.log('✅ Card number element READY');
            }}
          />
        </div>

        {/* Expiry and CVC Row */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label
              style={{
                display: 'block',
                marginBottom: 6,
                fontWeight: 600,
                color: '#333',
                fontSize: 14,
              }}
            >
              Expiry Date
            </label>
            <div
              onClick={() => {
                console.log('🎯 Expiry wrapper clicked - attempting force focus');
                const cardExpiryElement = elements?.getElement(CardExpiryElement);
                if (cardExpiryElement) {
                  console.log('📅 Found CardExpiryElement, calling focus()');
                  cardExpiryElement.focus();
                } else {
                  console.error('❌ CardExpiryElement not found in elements');
                }
              }}
              style={{
                padding: '14px 16px',
                border: `2px solid ${expiryFocused ? '#0070f3' : '#e0e0e0'}`,
                borderRadius: 8,
                backgroundColor: '#fff',
                minHeight: 48,
                display: 'flex',
                alignItems: 'center',
                cursor: 'text',
                position: 'relative',
                zIndex: 1,
                overflow: 'visible',
                boxSizing: 'border-box',
                width: '100%',
              }}
            >
              <CardExpiryElement
                options={cardElementOptions}
                disabled={loading}
                onFocus={() => {
                  console.log('🎯 Expiry FOCUSED');
                  setExpiryFocused(true);
                }}
                onBlur={() => {
                  console.log('👋 Expiry BLURRED');
                  setExpiryFocused(false);
                }}
                onChange={(event) => {
                  console.log('📅 Expiry CHANGE:', {
                    error: event.error,
                    complete: event.complete,
                    empty: event.empty,
                    elementType: event.elementType
                  });
                  if (event.error) setPaymentError(event.error.message);
                  setCardExpiryComplete(event.complete);
                }}
                onReady={() => {
                  console.log('✅ Expiry element READY');
                }}
              />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <label
              style={{
                display: 'block',
                marginBottom: 6,
                fontWeight: 600,
                color: '#333',
                fontSize: 14,
              }}
            >
              CVC
            </label>
            <div
              onClick={() => {
                console.log('🎯 CVC wrapper clicked - attempting force focus');
                const cardCvcElement = elements?.getElement(CardCvcElement);
                if (cardCvcElement) {
                  console.log('🔒 Found CardCvcElement, calling focus()');
                  cardCvcElement.focus();
                } else {
                  console.error('❌ CardCvcElement not found in elements');
                }
              }}
              style={{
                padding: '14px 16px',
                border: `2px solid ${cvcFocused ? '#0070f3' : '#e0e0e0'}`,
                borderRadius: 8,
                backgroundColor: '#fff',
                minHeight: 48,
                display: 'flex',
                alignItems: 'center',
                cursor: 'text',
                position: 'relative',
                zIndex: 1,
                overflow: 'visible',
                boxSizing: 'border-box',
                width: '100%',
              }}
            >
              <CardCvcElement
                options={cardElementOptions}
                disabled={loading}
                onFocus={() => {
                  console.log('🎯 CVC FOCUSED');
                  setCvcFocused(true);
                }}
                onBlur={() => {
                  console.log('👋 CVC BLURRED');
                  setCvcFocused(false);
                }}
                onChange={(event) => {
                  console.log('🔒 CVC CHANGE:', {
                    error: event.error,
                    complete: event.complete,
                    empty: event.empty,
                    elementType: event.elementType
                  });
                  if (event.error) setPaymentError(event.error.message);
                  setCardCvcComplete(event.complete);
                }}
                onReady={() => {
                  console.log('✅ CVC element READY');
                }}
              />
            </div>
          </div>
        </div>

        {allCardPartsComplete && (
          <div style={{ fontSize: 12, color: '#2e7d32', marginBottom: 8 }}>
            ✓ All card details complete
          </div>
        )}
      </div>

      {paymentError && (
        <div
          style={{
            color: '#d32f2f',
            marginBottom: 16,
            padding: 8,
            backgroundColor: '#ffebee',
            borderRadius: 4,
            fontSize: 14,
          }}
        >
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
            border: '1px solid #6c757d',
          }}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || loading || !allCardPartsComplete || !cardholderName.trim()}
          style={{
            ...buttonStyle,
            backgroundColor: loading ? '#ccc' : '#0070f3',
            cursor: loading ? 'not-allowed' : 'pointer',
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

  if (!stripePromise) {
    return (
      <div
        style={{
          padding: 24,
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}
      >
        <div style={{ color: '#d32f2f', marginBottom: 16 }}>
          ⚠️ Payment system is not configured
        </div>
        <button
          onClick={onCancel}
          style={{
            ...buttonStyle,
            backgroundColor: '#6c757d',
            border: '1px solid #6c757d',
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} key="stripe-elements">
      <div
        style={{
          padding: 24,
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
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

        <div style={{ marginTop: 16, fontSize: 12, color: '#999', textAlign: 'center' }}>
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

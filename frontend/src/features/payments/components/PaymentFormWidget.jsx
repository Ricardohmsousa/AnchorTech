import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { 
  Elements, 
  PaymentElement, 
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';
import { STRIPE_PUBLISHABLE_KEY, API_BASE_URL } from '../../../lib/config';
import { button as buttonStyle } from '../../../styles/sharedStyles';

// Load Stripe outside of component to avoid recreating the object
const stripePromise = STRIPE_PUBLISHABLE_KEY ? loadStripe(STRIPE_PUBLISHABLE_KEY) : null;

const CheckoutForm = ({ onSuccess, onError, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setPaymentError(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        console.error('Payment failed:', error);
        setPaymentError(error.message);
        onError(error);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded:', paymentIntent);
        onSuccess(paymentIntent);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setPaymentError(err.message);
      onError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '0 auto' }}>
      {/* Instructions */}
      <div style={{
        backgroundColor: '#e3f2fd',
        border: '1px solid #1976d2',
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
        fontSize: 14
      }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>💳 Payment Information</h4>
        <p style={{ margin: '0 0 8px 0' }}>
          Fill in your payment details below. This secure widget accepts credit cards, debit cards, Apple Pay, Google Pay, and more!
        </p>
        <p style={{ margin: 0, fontWeight: 600 }}>
          🧪 <strong>Test card:</strong> <code>4242 4242 4242 4242</code> | Any future date | Any CVC
        </p>
      </div>

      {/* Payment Element - The all-in-one Stripe widget */}
      <div style={{ marginBottom: 20 }}>
        <PaymentElement 
          options={{
            layout: 'tabs',
          }}
          onChange={(event) => {
            if (event.error) {
              setPaymentError(event.error.message);
            } else {
              setPaymentError(null);
            }
          }}
        />
      </div>

      {/* Error Display */}
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

      {/* Action Buttons */}
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
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </form>
  );
};

const PaymentForm = ({ amount, onSuccess, onError, onCancel }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to get JWT token
  const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  };

  // Create PaymentIntent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        console.log('🔄 Creating PaymentIntent for amount:', amount);
        
        const response = await fetch(`${API_BASE_URL}/create-payment-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          },
          body: JSON.stringify({
            amount: amount,
            service_type: 'nif_application'
          })
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error('PaymentIntent creation failed:', errorData);
          throw new Error(`Failed to create payment intent: ${response.status}`);
        }

        const { client_secret } = await response.json();
        setClientSecret(client_secret);
        console.log('✅ PaymentIntent created successfully');
      } catch (err) {
        console.error('❌ Error creating PaymentIntent:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [amount]);

  // Check if Stripe is configured
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
        <button onClick={onCancel} style={{...buttonStyle, backgroundColor: '#6c757d'}}>
          Go Back
        </button>
      </div>
    );
  }

  // Show error if PaymentIntent creation failed
  if (error) {
    return (
      <div style={{ 
        padding: 24, 
        border: '1px solid #e0e0e0', 
        borderRadius: 8, 
        backgroundColor: 'white',
        textAlign: 'center'
      }}>
        <div style={{ color: '#d32f2f', marginBottom: 16 }}>
          ❌ Error: {error}
        </div>
        <p style={{ color: '#666', fontSize: 14, marginBottom: 16 }}>
          This usually means the Stripe secret key is not configured on the server.
        </p>
        <button onClick={onCancel} style={{...buttonStyle, backgroundColor: '#6c757d'}}>
          Go Back
        </button>
      </div>
    );
  }

  // Show loading while creating PaymentIntent
  if (loading || !clientSecret) {
    return (
      <div style={{ 
        padding: 24, 
        border: '1px solid #e0e0e0', 
        borderRadius: 8, 
        backgroundColor: 'white',
        textAlign: 'center'
      }}>
        <div style={{ color: '#666', marginBottom: 16 }}>
          🔄 Setting up secure payment...
        </div>
      </div>
    );
  }

  // Stripe Elements options
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe', // or 'night', 'flat'
      variables: {
        colorPrimary: '#0070f3',
      }
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <div style={{ 
        padding: 24, 
        border: '1px solid #e0e0e0', 
        borderRadius: 8, 
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ color: '#333', marginBottom: 8 }}>Complete Your Payment</h2>
          <p style={{ color: '#666', margin: 0 }}>
            You'll be charged <strong>€{(amount / 100).toFixed(2)}</strong> for the NIF application service
          </p>
        </div>
        
        {/* Checkout Form */}
        <CheckoutForm 
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
        
        {/* Footer */}
        <div style={{ 
          marginTop: 20, 
          fontSize: 12, 
          color: '#999', 
          textAlign: 'center' 
        }}>
          <p>🔒 Your payment is securely processed by Stripe</p>
        </div>
      </div>
    </Elements>
  );
};

export default PaymentForm;
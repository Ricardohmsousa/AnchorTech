import React from "react";

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 5, 
  steps = [
    "Initial Consultation",
    "Document Preparation", 
    "Application Submission",
    "Processing & Review",
    "Approval & Completion"
  ],
  size = "medium" // small, medium, large
}) => {
  const stepSize = size === "small" ? 30 : size === "large" ? 60 : 40;
  const fontSize = size === "small" ? "12px" : size === "large" ? "16px" : "14px";
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      margin: '2rem 0'
    }}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isUpcoming = stepNumber > currentStep;
        
        return (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              position: 'relative'
            }}
          >
            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  top: stepSize / 2,
                  left: '50%',
                  width: '100%',
                  height: '2px',
                  background: isCompleted || (isCurrent && index < currentStep - 1)
                    ? '#10b981'
                    : '#e5e7eb',
                  zIndex: 1
                }}
              />
            )}
            
            {/* Step Circle */}
            <div
              style={{
                width: stepSize,
                height: stepSize,
                borderRadius: '50%',
                background: isCompleted
                  ? '#10b981'
                  : isCurrent
                    ? '#0070f3'
                    : '#e5e7eb',
                color: isCompleted || isCurrent ? 'white' : '#666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: fontSize,
                position: 'relative',
                zIndex: 2,
                border: '3px solid white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              {isCompleted ? '✓' : stepNumber}
            </div>
            
            {/* Step Label */}
            <span
              style={{
                marginTop: '0.5rem',
                fontSize: fontSize,
                fontWeight: isCurrent ? '700' : '500',
                color: isCompleted || isCurrent ? '#222' : '#666',
                textAlign: 'center',
                maxWidth: '120px',
                lineHeight: '1.3'
              }}
            >
              {step}
            </span>
            
            {/* Current Step Indicator */}
            {isCurrent && (
              <div
                style={{
                  marginTop: '0.25rem',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#0070f3'
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressIndicator;
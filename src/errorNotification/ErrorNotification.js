import React, { useState, forwardRef, useImperativeHandle } from 'react';

const ErrorNotification = forwardRef((props, ref) => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useImperativeHandle(ref, () => ({
    triggerError(message) {
      setErrorMessage(message || 'There was an error processing your request.');
      setShowError(true);
    },
    
    closeError() {
      setShowError(false);
      setErrorMessage('');
    }
  }));

  return (
    <>
      {showError && (
        <div className="error-notification">
          <span>{errorMessage}</span>
          <i class="bi bi-x-lg close-error-btn" onClick={() => setShowError(false)}>
            &times;
          </i>
            
        </div>
      )}
    </>
  );
});

export default ErrorNotification;
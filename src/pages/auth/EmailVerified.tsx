import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerified = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div style={{
      width: '100%', 
      height: '100vh', 
      position: 'relative', 
      background: '#F8F9FA', 
      overflow: 'hidden'
    }}>
      {/* White Container */}
      <div style={{
        width: 1436, 
        height: 1021, 
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute', 
        background: 'white', 
        overflow: 'hidden'
      }}>
        {/* SMARTEN Logo */}
        <div style={{
          left: 31, 
          top: 32, 
          position: 'absolute', 
          justifyContent: 'center', 
          alignItems: 'flex-end', 
          gap: 3, 
          display: 'inline-flex'
        }}>
          <div style={{
            width: 31.38, 
            height: 45, 
            background: '#0E9CFF',
            borderRadius: '4px'
          }} />
          <img 
            style={{width: 22.60, height: 23.14}} 
            src="/Smarten Assets/assets/water.svg" 
            alt="WiFi icon"
          />
          <div style={{
            width: 131, 
            height: 28, 
            textAlign: 'center', 
            color: '#1862CA', 
            fontSize: 25, 
            fontFamily: 'Futura-Bold', 
            fontWeight: '500', 
            wordWrap: 'break-word'
          }}>
            SMARTEN
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          width: 500, 
          left: 470, 
          top: 143, 
          position: 'absolute', 
          flexDirection: 'column', 
          justifyContent: 'flex-start', 
          alignItems: 'center', 
          gap: 20, 
          display: 'inline-flex'
        }}>
          {/* Illustration */}
          <img 
            style={{width: 500, height: 500}} 
            src="/Smarten Assets/assets/email-verified.jpg" 
            alt="Email verified illustration"
          />
          
          {/* Text Content */}
          <div style={{
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: 5, 
            display: 'flex'
          }}>
            <div style={{
              color: '#303030', 
              fontSize: 32, 
              fontFamily: 'Poppins', 
              fontWeight: '600', 
              wordWrap: 'break-word'
            }}>
              Email Verified
            </div>
            <div style={{
              textAlign: 'center', 
              color: '#8E8E8E', 
              fontSize: 20, 
              fontFamily: 'Poppins', 
              fontWeight: '400', 
              wordWrap: 'break-word'
            }}>
              Success! Your email has been verified and your account is active.
            </div>
          </div>

          {/* Go to Dashboard Button */}
          <button
            onClick={handleGoToDashboard}
            style={{
              width: 200,
              height: 50,
              background: '#0E9CFF',
              borderRadius: 100,
              color: 'white',
              fontSize: 18,
              fontFamily: 'Poppins',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              marginTop: 20
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerified;

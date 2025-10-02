import React from 'react';

const EmailVerified = () => {
  return (
    <div style={{
      width: '100%', 
      height: '100vh', 
      position: 'relative', 
      background: '#F8F9FA', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Header with SMARTEN Logo */}
      <div style={{
        position: 'absolute',
        top: 32,
        left: 31,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 3
      }}>
        <div style={{
          width: 31.38, 
          height: 45, 
          background: '#0E9CFF',
          borderRadius: '4px'
        }} />
        <img 
          style={{width: 22.60, height: 23.14}} 
          src="https://placehold.co/23x23" 
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20
      }}>
        {/* Illustration */}
        <img 
          style={{width: 500, height: 500}} 
          src="https://placehold.co/500x500" 
          alt="Email verified illustration"
        />
        
        {/* Text Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5
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
            wordWrap: 'break-word',
            lineHeight: '1.4'
          }}>
            Success! Your email has been verified and your account is active.
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerified;

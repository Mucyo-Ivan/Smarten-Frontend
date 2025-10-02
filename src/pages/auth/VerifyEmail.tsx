import React from 'react';

const VerifyEmail = () => {
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
          style={{width: 500, height: 456}} 
          src="https://placehold.co/500x456" 
          alt="Email verification illustration"
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
            Verify Your Email
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
            We've sent a verification link to your email.<br/>
            Open your inbox and confirm to continue.
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

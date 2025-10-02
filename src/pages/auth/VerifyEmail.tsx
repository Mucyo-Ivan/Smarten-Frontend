import React from 'react';
import SmartenLogo from '@/components/ui/SmartenLogo';

const VerifyEmail = () => {
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
        width: 1200, 
        height: 800, 
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute', 
        background: 'white', 
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        {/* SMARTEN Logo */}
        <div style={{
          left: 24, 
          top: 24, 
          position: 'absolute', 
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <SmartenLogo className="w-8 h-8" />
          <span style={{
            color: '#1862CA', 
            fontSize: 20, 
            fontWeight: '600'
          }}>
            SMARTEN
          </span>
        </div>

        {/* Main Content */}
        <div style={{
          width: 400, 
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          position: 'absolute', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 16, 
          display: 'flex'
        }}>
          {/* Illustration */}
          <img 
            style={{width: 300, height: 250}} 
            src="/Smarten Assets/assets/verify-email.jpg" 
            alt="Email verification illustration"
          />
          
          {/* Text Content */}
          <div style={{
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: 8, 
            display: 'flex'
          }}>
            <div style={{
              color: '#303030', 
              fontSize: 24, 
              fontWeight: '600', 
              wordWrap: 'break-word'
            }}>
              Verify Your Email
            </div>
            <div style={{
              textAlign: 'center', 
              color: '#8E8E8E', 
              fontSize: 16, 
              fontWeight: '400', 
              wordWrap: 'break-word',
              lineHeight: '1.5'
            }}>
              We've sent a verification link to your email.<br/>
              Open your inbox and confirm to continue.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

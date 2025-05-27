
interface SmartenLogoProps {
  className?: string;
}

const SmartenLogo = ({ className }: SmartenLogoProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg width="38" height="38" viewBox="0 0 44 62" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Blue Water Droplet with perfect circular bottom */}
        <path d="M22 0C18 6 0 18 0 38C0 50.15 9.85 62 22 62C34.15 62 44 50.15 44 38C44 18 26 6 22 0Z" fill="#0095ff" />
        
        {/* Small dot in center */}
        <circle cx="22" cy="45" r="2.5" fill="white" />
        
        {/* 4 bolder wifi stripes, positioned lower */}
        <path d="M16 42C17.6 40.4 19.6 39.5 22 39.5C24.4 39.5 26.4 40.4 28 42" stroke="white" strokeWidth="2" strokeLinecap="round" />
        
        <path d="M12 38C14.8 35.2 18.2 34 22 34C25.8 34 29.2 35.2 32 38" stroke="white" strokeWidth="2" strokeLinecap="round" />
        
        <path d="M8 34C11.6 30.4 16.4 28.5 22 28.5C27.6 28.5 32.4 30.4 36 34" stroke="white" strokeWidth="2" strokeLinecap="round" />

        <path d="M4 30C8.4 25.6 14.6 23 22 23C29.4 23 35.6 25.6 40 30" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default SmartenLogo;

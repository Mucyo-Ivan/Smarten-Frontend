
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
        <circle cx="22" cy="50" r="2.5" fill="white" />
        
        {/* 4 bolder wifi stripes, positioned lower (closer to base) */}
        <path d="M16 47C17.6 45.4 19.6 44.5 22 44.5C24.4 44.5 26.4 45.4 28 47" stroke="white" strokeWidth="2" strokeLinecap="round" />
        
        <path d="M12 43C14.8 40.2 18.2 39 22 39C25.8 39 29.2 40.2 32 43" stroke="white" strokeWidth="2" strokeLinecap="round" />
        
        <path d="M8 39C11.6 35.4 16.4 33.5 22 33.5C27.6 33.5 32.4 35.4 36 39" stroke="white" strokeWidth="2" strokeLinecap="round" />

        <path d="M4 35C8.4 30.6 14.6 28 22 28C29.4 28 35.6 30.6 40 35" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default SmartenLogo;

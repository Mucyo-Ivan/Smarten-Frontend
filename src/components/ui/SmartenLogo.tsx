
interface SmartenLogoProps {
  className?: string;
}

const SmartenLogo = ({ className }: SmartenLogoProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img src="/assets/water-droplet.svg" alt="Smarten Logo" />
    </div>
  );
};

export default SmartenLogo;

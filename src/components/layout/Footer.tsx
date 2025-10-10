
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border py-4 px-6 bg-background text-sm text-muted-foreground dark-mode-transition">
      <div className="flex justify-between items-center">
        <p>© SMARTEN {new Date().getFullYear()}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Use</Link>
          <Link to="/help" className="hover:text-foreground transition-colors">Help Center</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t dark:border-gray-800 py-4 px-6 bg-white dark:bg-gray-900 text-sm text-gray-500 dark:text-gray-400">
      <div className="flex justify-between items-center">
        <p>© SMARTEN {new Date().getFullYear()}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="hover:text-gray-700 dark:hover:text-gray-300">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-700 dark:hover:text-gray-300">Terms of Use</Link>
          <Link to="/help" className="hover:text-gray-700 dark:hover:text-gray-300">Help Center</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

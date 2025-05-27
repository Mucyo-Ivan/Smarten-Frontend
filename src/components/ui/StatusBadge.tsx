
interface StatusBadgeProps {
  status: 'normal' | 'underflow' | 'overflow' | 'leakage';
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'underflow':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'overflow':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'leakage':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyle()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;

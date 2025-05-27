
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  children?: ReactNode;
  className?: string;
}

const SectionHeader = ({ title, children, className }: SectionHeaderProps) => {
  return (
    <div className={cn('flex justify-between items-center mb-4', className)}>
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
};

export default SectionHeader;

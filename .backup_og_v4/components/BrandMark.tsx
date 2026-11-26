import { BrandLogo } from './BrandLogo';

interface BrandMarkProps {
  variant: 'light' | 'dark';
  showSlogan?: boolean;
  size?: 'sm' | 'md';
  priority?: boolean;
}

export function BrandMark({
  variant,
  showSlogan = false,
  size = 'md',
  priority = false,
}: BrandMarkProps) {
  return (
    <BrandLogo
      variant={variant}
      showSlogan={showSlogan}
      size={size}
      priority={priority}
    />
  );
}

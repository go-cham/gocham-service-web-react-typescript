import { twMerge } from 'tailwind-merge';
import { Button, ButtonProps } from '@/common/components/ui/buttons';

interface DockedButtonProps extends ButtonProps {
  backgroundClassName?: string;
  buttonClassName?: string;
}

export function DockedButton({
  variant = 'primary',
  children,
  backgroundClassName,
  buttonClassName,
  ...props
}: DockedButtonProps) {
  return (
    <div
      className={twMerge(
        'flex h-[11.2rem] w-[39rem] justify-center bg-white pt-[1.7rem] shadow-dock',
        backgroundClassName,
      )}
    >
      <Button
        variant={variant}
        className={twMerge('w-[34rem]', buttonClassName)}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
}
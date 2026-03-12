import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type CommonProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

type PrimaryButtonProps = AnchorProps | ButtonProps;

const sizeClasses = {
  sm: 'px-6 py-2.5',
  md: 'px-6 py-3',
  lg: 'px-8 py-4',
  xl: 'px-12 py-4'
} as const;

const baseClassName =
  'bg-[#e1a226] text-white rounded-full hover:bg-[#c78f1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

export function PrimaryButton(props: PrimaryButtonProps) {
  const { size = 'sm', className, children } = props;
  const classes = `${baseClassName} ${sizeClasses[size]}${className ? ` ${className}` : ''}`;

  if ('href' in props && props.href) {
    const { href, size: _size, className: _className, children: _children, ...rest } = props;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { size: _size, className: _className, children: _children, type = 'button', ...rest } = props;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}

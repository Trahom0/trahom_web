import type { ReactNode } from 'react';

type PageLayoutProps = {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  mainClassName?: string;
  useMainWrapper?: boolean;
};

export function PageLayout({
  header,
  footer,
  children,
  className,
  mainClassName,
  useMainWrapper = true
}: PageLayoutProps) {
  const rootClassName = `min-h-screen bg-[#f9fbff]${className ? ` ${className}` : ''}`;

  if (!useMainWrapper) {
    return (
      <div className={rootClassName}>
        {header}
        {children}
        {footer}
      </div>
    );
  }

  const mainClasses = `max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16${
    mainClassName ? ` ${mainClassName}` : ''
  }`;

  return (
    <div className={rootClassName}>
      {header}
      <main className={mainClasses}>{children}</main>
      {footer}
    </div>
  );
}

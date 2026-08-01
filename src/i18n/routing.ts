import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix: 'always', // Always show locale prefix for static export
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

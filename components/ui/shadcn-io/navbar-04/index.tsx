'use client';

import * as React from 'react';
import { useEffect, useState, useRef, useId } from 'react';
import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Client } from '@pusher/push-notifications-web';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';
import { redirect, RedirectType } from 'next/navigation';
import { useRouter } from "next/navigation";
import axios from 'axios';


// Simple logo component for the navbar
const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width='1em' height='1em' viewBox='0 0 324 323' fill='currentColor' xmlns='http://www.w3.org/2000/svg' {...props}>
      <rect
        x='88.1023'
        y='144.792'
        width='151.802'
        height='36.5788'
        rx='18.2894'
        transform='rotate(-38.5799 88.1023 144.792)'
        fill='currentColor'
      />
      <rect
        x='85.3459'
        y='244.537'
        width='151.802'
        height='36.5788'
        rx='18.2894'
        transform='rotate(-38.5799 85.3459 244.537)'
        fill='currentColor'
      />
    </svg>
  );
};

// Hamburger icon component
const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

// Types
export interface Navbar04NavItem {
  href?: string;
  label: string;
}

export interface Navbar04Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigationLinks?: Navbar04NavItem[];
  loginText?: string;
  loginHref?: string;
  logoutText?: string;
  logoutHref?: string;
  myAccountText?: string;
  myAccountHref?: string;
  cartText?: string;
  cartHref?: string;
  cartCount?: number;
  searchPlaceholder?: string;
  // onLoginClick?: () => void;
  // onCartClick?: () => void;
  onSearchSubmit?: (query: string) => void;
}


// Default navigation links
const defaultNavigationLinks: Navbar04NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/arts', label: 'Arts' },
  { href: '/artists', label: 'Artists' },
];

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}

export const Navbar04 = React.forwardRef<HTMLElement, Navbar04Props>(
  (
    {
      className,
      logo = <Logo />,
      logoHref = '#',
      navigationLinks = defaultNavigationLinks,
      loginText = 'Login',
      loginHref = '/customer/login',
      logoutText = 'Logout',
      logoutHref = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}customer/logout`,
      myAccountText = 'My Account',
      myAccountHref = '/customer/account',
      cartText = 'Cart',
      cartHref = '/cart',
      cartCount = 0,
      searchPlaceholder = 'Search...',
      // onLoginClick,
      // onCartClick,
      onSearchSubmit,
      ...props
    },
    ref
  ) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const router = useRouter();


    const onLoginClick = () => {
      redirect(loginHref, RedirectType.push);
    }

    const onLogoutClick = async () => {
      axios.post(logoutHref, '', { withCredentials: true });
      setIsLoggedIn(false);
    }
    const onMyAccountClick = () => {
      redirect(myAccountHref, RedirectType.push);
    }

    const onCartClick = () => {
      redirect(cartHref, RedirectType.push);
    }


    useEffect(() => {
      setIsLoggedIn(getCookie("isLoggedIn") === "true");
    }, [onLoginClick, onLoginClick]);

    const containerRef = useRef<HTMLElement>(null);
    const searchId = useId();

    // Combine refs
    const combinedRef = React.useCallback((node: HTMLElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }, [ref]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const query = formData.get('search') as string;
      router.push(`/arts?search=${encodeURIComponent(query)}`);
    };

    return (
      <header
        ref={combinedRef}
        className={cn(
          'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline',
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex flex-1 items-center gap-2">

            {/* Main nav */}
            <div className="flex flex-1 items-center gap-6 max-md:justify-between">
              <button
                onClick={(e) => e.preventDefault()}
                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
              >
                <div className="text-2xl">
                  {logo}
                </div>
                <span className="hidden font-bold text-xl sm:inline-block">OAS</span>
              </button>
              {/* Navigation menu */}
              {
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(link.href ?? "/");
                          }}
                          className="text-muted-foreground hover:text-primary font-medium transition-colors cursor-pointer group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              }
              {/* Search form */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  id={searchId}
                  name="search"
                  className="peer h-8 ps-8 pe-2"
                  placeholder={searchPlaceholder}
                  type="search"
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                  <SearchIcon size={16} />
                </div>
              </form>
            </div>
          </div>
          {/* Right side */}
          {
            <div className="flex items-center gap-3">
              {isLoggedIn
                ? <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    onClick={(e) => {
                      e.preventDefault();
                      onMyAccountClick();
                    }}
                  >
                    {myAccountText}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm font-medium outline-red-500 hover:bg-accent hover:text-accent-foreground"
                    onClick={(e) => {
                      e.preventDefault();
                      onLogoutClick();
                    }}
                  >
                    {logoutText}
                  </Button>
                </>
                : <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  onClick={(e) => {
                    e.preventDefault();
                    onLoginClick();
                  }}
                >
                  {loginText}
                </Button>
              }

              <Button
                size="sm"
                className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
                onClick={(e) => {
                  e.preventDefault();
                  if (onCartClick) onCartClick();
                }}
              >
                <span className="flex items-baseline gap-2">
                  {cartText}
                  <span className="text-primary-foreground/60 text-xs">
                    {cartCount}
                  </span>
                </span>
              </Button>
            </div>
          }
        </div>
      </header>
    );
  }
);

Navbar04.displayName = 'Navbar04';

export { Logo, HamburgerIcon };
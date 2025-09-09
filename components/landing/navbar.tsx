'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
        closeMobileMenu()
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden' // Prevent body scroll
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsMobileMenuOpen(false)
      setIsClosing(false)
    }, 200)
  }

  const navItems = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How it Works' },
    { href: '#testimonials', label: 'Reviews' },
  ]

  return (
    <>
      <header className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/70 backdrop-blur-md border-b shadow-sm' 
          : 'bg-transparent'
      )}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 z-60">
              <Image 
                src="/logo.png"
                alt="LinkShort"
                width={132}
               height={32}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 relative group"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-3">            
              <Button variant="ghost" asChild className="text-sm rounded-full hover:bg-white">
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="text-sm px-6 rounded-full">
                <Link href="/auth/sign-up">Get Started</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden relative" ref={menuRef}>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="relative w-5 h-5">
                  <Menu 
                    className={cn(
                      "absolute inset-0 w-5 h-5 transition-all duration-200",
                      isMobileMenuOpen ? "opacity-0 rotate-45" : "opacity-100 rotate-0"
                    )} 
                  />
                  <X 
                    className={cn(
                      "absolute inset-0 w-5 h-5 transition-all duration-200",
                      isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-45"
                    )} 
                  />
                </div>
              </Button>

              {/* Mobile Menu Popover */}
              {isMobileMenuOpen && (
                <div 
                  className={cn(
                    "absolute right-0 top-12 w-96 bg-slate-200 rounded-2xl shadow-2xl border  overflow-hidden z-50",
                    "transform transition-all duration-200 origin-top-right",
                    isClosing 
                      ? "opacity-0 scale-95 translate-y-1" 
                      : "opacity-100 scale-100 translate-y-0"
                  )}
                >
                
                  
                  {/* Navigation Links */}
                  <nav className="py-2">
                    {navItems.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between px-6 py-3 text-gray-700 hover:text-gray-900",
                          "transition-all duration-150 group",
                          "border-l-2 border-transparent hover:border-primary"
                        )}
                        onClick={closeMobileMenu}
                        style={{
                          animationDelay: `${index * 50}ms`
                        }}
                      >
                        <span className="font-medium">{item.label}</span>
                        <ChevronDown className="w-4 h-4 opacity-40 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </nav>
                  
                  {/* CTA Buttons */}
                  <div className="px-6 py-4 border-t border-slate-200 space-y-3">
                    <Button 
                      variant="outline" 
                      asChild 
                      className="w-full h-10  border-gray-200 hover:border-gray-300 font-medium rounded-full"
                    >
                      <Link href="/auth/sign-in" onClick={closeMobileMenu}>
                        Sign In
                      </Link>
                    </Button>
                    <Button 
                      asChild 
                      className="rounded-full w-full h-10"
                    >
                      <Link href="/auth/sign-up" onClick={closeMobileMenu}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className={cn(
            "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden",
            "transition-opacity duration-200",
            isClosing ? "opacity-0" : "opacity-100"
          )}
          onClick={closeMobileMenu}
        />
      )}
    </>
  )
}
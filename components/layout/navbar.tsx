'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Link2, BarChart3, User, LogOut, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase()
  }

  const NavItems = () => (
    <>
      <Link
        href="/dashboard"
        className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <BarChart3 className="h-4 w-4" />
        <span>Dashboard</span>
      </Link>
      <Link
        href="/urls"
        className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <Link2 className="h-4 w-4" />
        <span>URLs</span>
      </Link>
    </>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 mr-8">
          <Link2 className="h-6 w-6" />
          <span className="font-bold text-xl">LinkShort</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 flex-1">
          {isAuthenticated && <NavItems />}
        </nav>

        <div className="flex items-center space-x-4 ml-auto">
          {isAuthenticated ? (
            <>
              {/* Mobile Navigation */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72">
                  <div className="flex flex-col space-y-4 mt-8">
                    <NavItems />
                  </div>
                </SheetContent>
              </Sheet>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {user ? getInitials(user.email) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.username}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

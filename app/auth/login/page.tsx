'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Link2 } from 'lucide-react'
import { LoginFormData } from '@/types'
import { toast } from 'sonner'

export default function LoginPage() {
  const [error, setError] = useState('')
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('')
      await login(data)
      router.push('/dashboard')
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Login failed. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
    }
  }

  return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Link2 className="w-6 h-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link
                href="/auth/register"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}

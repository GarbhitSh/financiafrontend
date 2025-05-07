import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Financial Screener</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign in to access your stock screening tools</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}

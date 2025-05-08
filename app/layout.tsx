import type React from "react"
import "@/app/globals.css"
import { Toaster } from "@/components/ui/toaster"
import { DashboardHeader } from "@/components/dashboard-header"

export const metadata = {
  title: "Healthcare Dashboard",
  description: "A comprehensive healthcare dashboard for patient monitoring",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background">
          <div className="flex min-h-screen flex-col">
            <DashboardHeader />
            <div className="flex flex-1">
              <main className="flex-1 pt-16 w-full">{children}</main>
            </div>
          </div>
          <Toaster />
      </body>
    </html>
  )
}

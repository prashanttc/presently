import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import TanstackProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "sonner";
import SessionProvider from "@/providers/SessionProvider";
import ProtectedLayout from "@/providers/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CueCard - Practice Presentations with AI Feedback",
  description:
    "Upload your presentations, practice, and get AI-generated feedback",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <TanstackProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider>
                <div className="flex min-h-screen w-screen bg-background">
                  <AppSidebar />
                  <SidebarInset className="flex flex-col flex-1">
                    <AppHeader />
                    <ProtectedLayout>
                      <main className="flex-1 p-4 md:p-6 ">{children}</main>
                    </ProtectedLayout>
                    <Toaster />
                  </SidebarInset>
                </div>
              </SidebarProvider>
            </ThemeProvider>
          </TanstackProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

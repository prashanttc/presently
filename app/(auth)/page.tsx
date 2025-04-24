"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mic, FileText, BarChart, Sparkles, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background gradient */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.3) 0%, rgba(79, 70, 229, 0.1) 30%, transparent 70%)`,
          transition: "background 0.3s ease",
        }}
      />

      <header className="border-b border-zinc-800 relative z-10">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-75 blur"></div>
              <div className="relative bg-black rounded-full p-1">
                <Mic className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              CueCard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-sm text-zinc-400 hover:text-white hover:bg-zinc-800">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="text-sm relative overflow-hidden group bg-gradient-to-r from-purple-600 to-indigo-600 border-0">
                <span className="relative z-10 flex items-center">
                  Sign up
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-700 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
            <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-indigo-700 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-pink-700 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-4000"></div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBjMCAxNi41NjktMTMuNDMxIDMwLTMwIDMwQzEzLjQzMSA2MCAwIDQ2LjU2OSAwIDMwIDAgMTMuNDMxIDEzLjQzMSAwIDMwIDBjMTYuNTY5IDAgMzAgMTMuNDMxIDMwIDMweiIgc3Ryb2tlPSIjNDQ0IiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTTYwIDMwQzYwIDEzLjQzMSA0Ni41NjkgMCAzMCAwIiBzdHJva2U9IiM5MzMzRUEiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')] opacity-5"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col justify-center space-y-4">
                <motion.div
                  className="flex items-center gap-2 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="px-3 py-1 text-xs font-medium bg-purple-900/30 text-purple-300 rounded-full border border-purple-800/50">
                    AI-Powered Presentation Coach
                  </div>
                </motion.div>

                <div className="space-y-2">
                  <motion.h1
                    className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Your{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400">
                      AI-Powered
                    </span>{" "}
                    Presentation Assistant
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-zinc-400 md:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Upload your slides, practice your delivery, and get instant AI feedback to elevate your presentation
                    skills.
                  </motion.p>
                </div>

                {/* Stats section */}
                <motion.div
                  className="grid grid-cols-3 gap-4 my-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                      98%
                    </span>
                    <span className="text-xs text-zinc-500">Improved Confidence</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                      10K+
                    </span>
                    <span className="text-xs text-zinc-500">Active Users</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                      4.9/5
                    </span>
                    <span className="text-xs text-zinc-500">User Rating</span>
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 border-0"
                    >
                      <span className="relative z-10 flex items-center">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                    >
                      Learn More
                    </Button>
                  </Link>
                </motion.div>

                {/* Trusted by section */}
                <motion.div
                  className="pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <p className="text-xs text-zinc-500 mb-3">TRUSTED BY TEAMS AT</p>
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4 opacity-70">
                    <div className="text-zinc-400 font-semibold">Microsoft</div>
                    <div className="text-zinc-400 font-semibold">Google</div>
                    <div className="text-zinc-400 font-semibold">Amazon</div>
                    <div className="text-zinc-400 font-semibold">Tesla</div>
                    <div className="text-zinc-400 font-semibold">Meta</div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
                  {/* Decorative circles */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-purple-500/20 animate-pulse"></div>
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-indigo-500/10 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>

                  {/* Main app mockup */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-purple-900/20 rounded-lg border border-zinc-800 shadow-2xl backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[90%] h-[90%] bg-zinc-900 rounded-md shadow-md p-4 flex flex-col gap-4 border border-zinc-800">
                        {/* App header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-20 bg-zinc-800 rounded-md"></div>
                            <div className="h-4 w-4 bg-zinc-800 rounded-md"></div>
                          </div>
                        </div>

                        {/* App content */}
                        <div className="flex-1 flex gap-4">
                          {/* Sidebar */}
                          <div className="w-1/4 bg-zinc-800/50 rounded-md p-2 flex flex-col gap-2">
                            <div className="h-4 w-full bg-zinc-700/50 rounded-sm"></div>
                            <div className="h-4 w-full bg-purple-700/50 rounded-sm"></div>
                            <div className="h-4 w-full bg-zinc-700/50 rounded-sm"></div>
                            <div className="h-4 w-full bg-zinc-700/50 rounded-sm"></div>
                          </div>

                          {/* Main content */}
                          <div className="flex-1 flex flex-col gap-3">
                            <div className="h-8 bg-zinc-800/80 rounded-md w-3/4"></div>
                            <div className="flex-1 bg-zinc-800/50 rounded-md flex items-center justify-center">
                              <div className="relative">
                                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-50 blur-lg animate-pulse"></div>
                                <Mic className="h-16 w-16 text-purple-400 relative z-10" />
                              </div>
                            </div>
                            <div className="h-8 bg-zinc-800 rounded-md w-full relative overflow-hidden">
                              <div className="absolute left-0 top-0 bottom-0 w-2/3 bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse"></div>
                            </div>
                          </div>
                        </div>

                        {/* Feedback visualization */}
                        <div className="h-20 bg-zinc-800/50 rounded-md p-2 flex items-center gap-2">
                          <div className="h-full aspect-square rounded-md bg-purple-900/30 flex items-center justify-center">
                            <div className="h-8 w-8 rounded-full bg-purple-600/50"></div>
                          </div>
                          <div className="flex-1 flex flex-col gap-2">
                            <div className="h-3 bg-zinc-700 rounded-full w-full">
                              <div className="h-3 bg-purple-600 rounded-full w-3/4"></div>
                            </div>
                            <div className="h-3 bg-zinc-700 rounded-full w-full">
                              <div className="h-3 bg-indigo-600 rounded-full w-1/2"></div>
                            </div>
                            <div className="h-3 bg-zinc-700 rounded-full w-full">
                              <div className="h-3 bg-pink-600 rounded-full w-4/5"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-10 right-10 w-16 h-16 bg-purple-600/20 rounded-lg backdrop-blur-sm border border-purple-500/20 animate-float"></div>
                  <div className="absolute bottom-20 left-10 w-12 h-12 bg-indigo-600/20 rounded-full backdrop-blur-sm border border-indigo-500/20 animate-float animation-delay-2000"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 pointer-events-none"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1 text-sm">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-indigo-200 font-medium">
                    Features
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Unleash Your Creativity</h2>
                <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed">
                  CueCard provides all the tools you need to practice and perfect your presentations.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-3"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: <FileText className="h-10 w-10 text-purple-400" />,
                  title: "Upload & Edit",
                  description: "Upload your PowerPoint presentations and edit slides and script in one place.",
                },
                {
                  icon: <Mic className="h-10 w-10 text-purple-400" />,
                  title: "Practice Mode",
                  description: "Practice your presentation with a built-in timer and recording capabilities.",
                },
                {
                  icon: <BarChart className="h-10 w-10 text-purple-400" />,
                  title: "AI Feedback",
                  description: "Get detailed AI-generated feedback on pacing, filler words, and confidence.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="relative flex flex-col gap-2">
                    <div className="p-2 rounded-full bg-zinc-800 w-fit mb-2">{feature.icon}</div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-zinc-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-20 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Affordable Plans for{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                    Every Need
                  </span>
                </h2>
                <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed">
                  Choose the perfect plan that fits your presentation needs.
                </p>
              </div>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "Free",
                  price: "$0",
                  description: "Perfect for getting started",
                  features: ["5 presentations", "Basic AI feedback", "5-minute practice sessions", "Email support"],
                  highlighted: false,
                },
                {
                  name: "Pro",
                  price: "$14.99",
                  period: "/mo",
                  description: "For serious presenters",
                  features: [
                    "Unlimited presentations",
                    "Advanced AI feedback",
                    "Unlimited practice time",
                    "Priority support",
                    "Custom branding",
                  ],
                  highlighted: true,
                },
                {
                  name: "Team",
                  price: "$29.99",
                  period: "/mo",
                  description: "For teams and organizations",
                  features: [
                    "Everything in Pro",
                    "Team collaboration",
                    "Admin dashboard",
                    "Analytics & reporting",
                    "Dedicated account manager",
                  ],
                  highlighted: false,
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative rounded-lg ${
                    plan.highlighted
                      ? "bg-gradient-to-b from-purple-900/40 to-indigo-900/40 border-purple-500/20"
                      : "bg-zinc-900/50 border-zinc-800"
                  } border p-6 flex flex-col h-full`}
                >
                  {plan.highlighted && (
                    <div className="absolute inset-px rounded-lg bg-gradient-to-b from-purple-600/20 to-indigo-600/20 -z-10 blur-[2px]"></div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-zinc-300">{plan.name}</h3>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-zinc-400 ml-1">{plan.period}</span>}
                    </div>
                    <p className="text-sm text-zinc-400 mt-1">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 flex-1 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div
                          className={`mr-2 rounded-full p-1 ${plan.highlighted ? "bg-purple-900/50" : "bg-zinc-800"}`}
                        >
                          <Sparkles className="h-3 w-3 text-purple-400" />
                        </div>
                        <span className="text-sm text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-auto ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-0"
                        : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                    }`}
                  >
                    Get Started
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials/Insights Section */}
        <section className="w-full py-20 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Stay Inspired with Our{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                    Latest Insights
                  </span>
                </h2>
                <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed">
                  Learn from our experts and improve your presentation skills.
                </p>
              </div>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Master the Art of Public Speaking",
                  description: "Learn the techniques used by professional speakers to captivate your audience.",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-21%20143725-RwBuQaYYI8Ho15e2H848F9lp4DkeLU.png",
                  gradient: "from-purple-900/40 to-indigo-900/40",
                },
                {
                  title: "Design Slides That Pop",
                  description: "Create visually stunning presentations that enhance your message.",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-21%20143725-RwBuQaYYI8Ho15e2H848F9lp4DkeLU.png",
                  gradient: "from-indigo-900/40 to-purple-900/40",
                },
                {
                  title: "Overcome Presentation Anxiety",
                  description: "Practical tips to manage nervousness and present with confidence.",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-21%20143725-RwBuQaYYI8Ho15e2H848F9lp4DkeLU.png",
                  gradient: "from-purple-900/40 to-indigo-900/40",
                },
              ].map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="h-48 overflow-hidden">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${insight.gradient} flex items-center justify-center`}
                    >
                      <div className="w-16 h-16 rounded-full bg-black/30 flex items-center justify-center">
                        <Mic className="h-8 w-8 text-purple-400" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">
                      {insight.title}
                    </h3>
                    <p className="text-zinc-400 text-sm mb-4">{insight.description}</p>
                    <div className="flex items-center text-purple-400 text-sm font-medium">
                      <span>Read more</span>
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 pointer-events-none"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto rounded-2xl overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent opacity-70"></div>
              <div className="relative p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Presentations?</h2>
                <p className="text-zinc-300 mb-8 max-w-xl mx-auto">
                  Join thousands of professionals who have elevated their presentation skills with CueCard.
                </p>
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 border-0"
                  >
                    <span className="relative z-10 flex items-center">
                      Get Started For Free
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800 relative z-10">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between px-4 md:px-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-75 blur"></div>
                <div className="relative bg-black rounded-full p-1">
                  <Mic className="h-5 w-5 text-purple-400" />
                </div>
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                CueCard
              </span>
            </div>
            <p className="text-xs text-zinc-500">&copy; {new Date().getFullYear()} CueCard. All rights reserved.</p>
          </div>
          <div className="flex gap-8 md:gap-12">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-zinc-300">Product</p>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-xs text-zinc-500 hover:text-purple-400">
                  Features
                </Link>
                <Link href="#" className="text-xs text-zinc-500 hover:text-purple-400">
                  Pricing
                </Link>
                <Link href="#" className="text-xs text-zinc-500 hover:text-purple-400">
                  Testimonials
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-zinc-300">Company</p>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-xs text-zinc-500 hover:text-purple-400">
                  About
                </Link>
                <Link href="#" className="text-xs text-zinc-500 hover:text-purple-400">
                  Blog
                </Link>
                <Link href="#" className="text-xs text-zinc-500 hover:text-purple-400">
                  Careers
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-zinc-300">Legal</p>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-xs text-zinc-500 hover:text-purple-400">
                  Terms
                </Link>
                <Link href="#" className="text-xs text-zinc-500 hover:text-purple-400">
                  Privacy
                </Link>
                <Link href="#" className="text-xs text-zinc-500 hover:text-purple-400">
                  Cookies
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

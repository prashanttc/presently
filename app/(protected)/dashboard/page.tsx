import { PresentationCard } from "@/components/dashboard/presentation-card"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"

export default function Dashboard() {
  // Mock data for presentations
  const presentations = [
    {
      id: "1",
      title: "Q1 Sales Report",
      slides: 12,
      duration: "8 min",
      lastPracticed: "2 days ago",
      progress: 75,
    },
    {
      id: "2",
      title: "Product Launch Strategy",
      slides: 18,
      duration: "15 min",
      lastPracticed: "1 week ago",
      progress: 40,
    },
    {
      id: "3",
      title: "Team Onboarding",
      slides: 8,
      duration: "5 min",
      lastPracticed: "3 days ago",
      progress: 90,
    },
    {
      id: "4",
      title: "Investor Pitch Deck",
      slides: 22,
      duration: "20 min",
      lastPracticed: "Just now",
      progress: 10,
    },
  ]

  return (
    <div className="space-y-6 ">
      <DashboardHeader />
      <DashboardStats />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Recent Presentations</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4  ">
          {presentations.map((presentation) => (
            <PresentationCard key={presentation.id} presentation={presentation} />
          ))}
        </div>
      </div>
    </div>
  )
}

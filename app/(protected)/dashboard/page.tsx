"use client";
import { PresentationCard } from "@/components/dashboard/presentation-card"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { useGetAllPpt } from "@/query/presentation"

export default function Dashboard() {

 const{data:presentations ,isLoading} = useGetAllPpt()
 if(isLoading ||!presentations){
  return <div>loading...</div>
 }
  return (
    <div className="space-y-6 ">
      <DashboardHeader />
      <DashboardStats />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Recent Presentations</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4  ">
          {presentations.map((presentation) => (
            <PresentationCard key={presentation.id} presentation={presentation}/>
          ))}
        </div>
      </div>
    </div>
  )
}

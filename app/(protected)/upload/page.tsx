import { UploadHeader } from "@/components/upload/upload-header"
import { UploadSection } from "@/components/upload/upload-section"
import { RecentUploads } from "@/components/upload/recent-uploads"

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <UploadHeader />
      <UploadSection />
      <RecentUploads />
    </div>
  )
}

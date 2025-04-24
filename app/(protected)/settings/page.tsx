import { SettingsHeader } from "@/components/settings/settings-header"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { AppearanceSettings } from "@/components/settings/appearance-settings"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsHeader />

      <div className="grid gap-6 md:grid-cols-2">
        <ProfileSettings />
        <div className="space-y-6">
          <NotificationSettings />
          <AppearanceSettings />
        </div>
      </div>
    </div>
  )
}

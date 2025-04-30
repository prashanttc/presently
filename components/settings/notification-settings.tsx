import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function NotificationSettings() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Configure how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="practice-reminders" className="flex flex-col space-y-1">
            <span>Practice Reminders</span>
            <span className="text-xs font-normal text-muted-foreground">
              Receive reminders to practice your presentations
            </span>
          </Label>
          <Switch id="practice-reminders" defaultChecked />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="feedback-notifications" className="flex flex-col space-y-1">
            <span>Feedback Ready</span>
            <span className="text-xs font-normal text-muted-foreground">
              Get notified when your practice feedback is ready
            </span>
          </Label>
          <Switch id="feedback-notifications" defaultChecked />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
            <span>Email Notifications</span>
            <span className="text-xs font-normal text-muted-foreground">Receive notifications via email</span>
          </Label>
          <Switch id="email-notifications" />
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button>Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}

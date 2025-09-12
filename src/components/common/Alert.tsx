import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BadgeAlertIcon } from "lucide-react";

export function AppAlert({ title, description }: { title: string; description: string }) {
  return (
    <Alert>
        <BadgeAlertIcon />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {description}
        </AlertDescription>
      </Alert>
  )
}
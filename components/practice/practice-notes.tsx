import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface PracticeNotesProps {
  notes: string | null;
}

export function PracticeNotes({ notes }: PracticeNotesProps) {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="h-4 w-4" />
          Speaker Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg  p-3 text-sm">{notes}</div>
      </CardContent>
    </Card>
  );
}

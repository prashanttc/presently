"use client";

import { useState } from "react";
import {
  FileIcon as FilePresentation,
  MoreHorizontal,
  Play,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useGetAllPpt } from "@/query/presentation";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { Loading } from "../loading";

export function RecentUploads() {
  const { data: uploads, isLoading, isError, error } = useGetAllPpt();
  if (isLoading) {
    return <Loading/>
  }
  if (isError || !uploads) {
    toast.error(error?.message || "no uplaod found");
    return;
  }
    const uploadedAt =(upload:any)=>{
      return formatDistanceToNow(new Date(upload.createdAt), { addSuffix: true });
    } 
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Recent Uploads</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {uploads.map((upload) => (
          <Card key={upload.id} className="glass-card">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="line-clamp-1">{upload.title}</CardTitle>
                <CardDescription>{upload.slides.length} slides</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href="/practice">
                      <Play className="mr-2 h-4 w-4" />
                      Practice
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 py-2">
                <FilePresentation className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Uploaded {uploadedAt(upload)}
                </span>
              </div>
              <Button asChild className="mt-2 w-full gap-2">
                <Link href={`/practice/${upload.id}`}>
                  <Play className="h-4 w-4" />
                  Practice Now
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

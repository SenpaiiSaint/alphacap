"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Share2, Download } from "lucide-react";

const mockComments = [
  {
    id: 1,
    user: { name: "John Doe", avatar: "/avatars/john.png" },
    message:
      "The Q2 performance exceeded expectations, particularly in the tech sector.",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    user: { name: "Jane Smith", avatar: "/avatars/jane.png" },
    message:
      "We should consider rebalancing the healthcare allocation based on recent market trends.",
    timestamp: "4 hours ago",
  },
  {
    id: 3,
    user: { name: "Mike Johnson", avatar: "/avatars/mike.png" },
    message:
      "The risk metrics look promising, but let's keep an eye on volatility.",
    timestamp: "1 day ago",
  },
];

const mockReports = [
  {
    name: "Q2 Performance Report",
    date: "2024-06-30",
    type: "PDF",
    size: "2.4 MB",
  },
  { name: "Risk Assessment", date: "2024-06-15", type: "PDF", size: "1.8 MB" },
  { name: "Sector Analysis", date: "2024-06-01", type: "PDF", size: "3.2 MB" },
];

export function Collaboration() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Team Discussion</CardTitle>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockComments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.user.avatar} />
                  <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{comment.user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {comment.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reports & Documents</CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReports.map((report) => (
              <div
                key={report.name}
                className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{report.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{report.date}</span>
                    <span>•</span>
                    <span>{report.type}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

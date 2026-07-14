"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Pencil, ImageIcon } from "lucide-react";

const eventsData = [
  { id: "1", name: "Annual General Meeting 2026", date: "2026-08-15", location: "National Headquarters, Dhaka", type: "meeting", attendees: 240, status: "upcoming" },
  { id: "2", name: "Volunteer Recognition Ceremony", date: "2026-07-25", location: "Savar Community Center", type: "ceremony", attendees: 450, status: "upcoming" },
  { id: "3", name: "Medical Camp - Sylhet Division", date: "2026-07-20", location: "Sylhet District Hospital", type: "camp", attendees: "1,200", status: "upcoming" },
  { id: "4", name: "Ramadan Iftar Distribution 2026", date: "2026-03-15", location: "All Branches", type: "distribution", attendees: "8,500", status: "completed" },
  { id: "5", name: "Education Scholarship Ceremony", date: "2026-01-20", location: "Chattogram Division Office", type: "ceremony", attendees: 680, status: "completed" },
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = eventsData.filter(event => 
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-sm text-muted-foreground">{eventsData.length} total events</div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full max-w-md hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-9 bg-card border-border shadow-sm rounded-xl" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white gap-2 rounded-xl">
            <Plus className="w-4 h-4" />
            New Event
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Event</TableHead>
                <TableHead className="py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</TableHead>
                <TableHead className="py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</TableHead>
                <TableHead className="py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</TableHead>
                <TableHead className="py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Attendees</TableHead>
                <TableHead className="py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</TableHead>
                <TableHead className="py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id} className="hover:bg-muted/50 border-border group transition-colors">
                  <TableCell className="py-4 font-bold text-foreground">{event.name}</TableCell>
                  <TableCell className="text-muted-foreground">{event.date}</TableCell>
                  <TableCell className="text-muted-foreground">{event.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`font-normal capitalize bg-muted/20 text-muted-foreground`}>
                      {event.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground">{event.attendees}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`font-normal capitalize ${
                      event.status === 'upcoming' ? 'bg-teal-50 text-teal-600 border-teal-200 dark:bg-teal-500/10 dark:border-teal-500/20' :
                      'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20'
                    }`}>
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 ">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

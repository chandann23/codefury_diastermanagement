"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { Card } from "~/components/ui/card";
import { Button, buttonVariants } from "~/components/ui/button";
import { AddDisasterDialog } from "~/components/AddDisasterDialog";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define the Disaster type
type Disaster = {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
};

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function DisasterPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <DisasterContent />
    </QueryClientProvider>
  );
}

function DisasterContent() {
  const [newDisasterType, setNewDisasterType] = useState("");
  
  const { data: disasters, isLoading: isDisastersLoading } = useQuery({
    queryKey: ["disasters"],
    queryFn: async () => {
      const res = await axios.get("/api/disasters");
      return res.data as Disaster[];
    },
    staleTime: 2000,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
  });

  const handleDisasterType = (disasterName: string) => {
    setNewDisasterType(disasterName);
  };

  useEffect(() => {
    if (newDisasterType) {
      console.log("Current disasterType:", newDisasterType);
    }
  }, [newDisasterType]);


  if (isDisastersLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loader" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... (keep the existing header section) ... */}

      <div className="mb-10 flex items-center justify-center space-x-3">
        <span className="text-2xl font-bold">
          Add a Disaster at Known Location
        </span>
        <AddDisasterDialog handleName={handleDisasterType} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {disasters?.map((disaster) => (
          <Card
            key={disaster.id}
            className="overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={disaster.imageUrl}
              alt={disaster.title}
              className="h-48 w-full object-cover"
              width="350"
              height="200"
              style={{ aspectRatio: "350/200", objectFit: "cover" }}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{disaster.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {disaster.description}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {new Date(disaster.date).toLocaleDateString()}
              </p>
              <div className="flex justify-between items-center">
                <Button variant="link" className="mt-4 text-blue-500">
                  Read More
                </Button>
                <Link 
                  href={`/disaster/${encodeURIComponent(disaster.title)}`} 
                  className={buttonVariants({className: ""})}
                >
                  Learn
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {newDisasterType && (
        <div className="mt-6 text-center">
          <p>New disaster type added: {newDisasterType}</p>
          <Link 
            href={`/disaster/${encodeURIComponent(newDisasterType)}`}
            className={buttonVariants({className: "mt-2"})}
          >
            Learn about {newDisasterType}
          </Link>
        </div>
      )}
    </div>
  );
}
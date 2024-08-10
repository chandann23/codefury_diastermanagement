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
import { useState } from "react";

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
  const [disasterType, setDisasterType] = useState("")
  
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
    setDisasterType(disasterName);
  }

  if (isDisastersLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loader" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 rounded-lg bg-gradient-to-r from-black to-gray-400 p-8 text-white shadow-xl">
        <h1 className="mb-4 text-4xl font-bold">
          DisasterReady: Stay Informed, Stay Safe
        </h1>
        <p className="mb-6 text-xl">
          Welcome to your essential hub for real-time updates on natural
          disasters worldwide. Our mission is to keep you informed and prepared
          in the face of nature's most formidable challenges.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-white text-blue-800 hover:bg-blue-100">
            Learn More
          </Button>
          <Button className="border border-white bg-transparent hover:bg-blue-700">
            Emergency Contacts
          </Button>
        </div>
      </section>

      <div className="mb-10 flex items-center justify-center space-x-3">
        <span className="text-2xl font-bold">
          Add a Disaster at Known Location
        </span>
        <AddDisasterDialog handleName={handleDisasterType} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {disasters?.map((disaster) => (
          <Link href={"/"}>
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
                  <Link href={`/disaster/${disasterType}`} className={buttonVariants({className: ""})}>Learn</Link>
                </div>
              </div>
            </Card>
          </Link>
        ))} 
      </div>
    </div>
  );
}

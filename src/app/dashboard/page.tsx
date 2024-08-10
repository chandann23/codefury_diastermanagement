"use client";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { AddDisasterDialog } from "~/components/AddDisasterDialog";

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

  if (isDisastersLoading) 
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 bg-gradient-to-r from-black to-gray-400 text-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-4">DisasterReady: Stay Informed, Stay Safe</h1>
        <p className="text-xl mb-6">
          Welcome to your essential hub for real-time updates on natural disasters worldwide. Our mission is to keep you informed and prepared in the face of nature's most formidable challenges.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-white text-blue-800 hover:bg-blue-100">Learn More</Button>
          <Button className="bg-transparent border border-white hover:bg-blue-700">Emergency Contacts</Button>
        </div>
      </section>

      <div className="flex justify-center items-center space-x-3 mb-10 ">
        <span className="text-2xl font-bold">Add a Disaster at Known Location</span>
        <AddDisasterDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {disasters?.map((disaster) => (
          <Card key={disaster.id} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={disaster.imageUrl}
              alt={disaster.title}
              className="w-full h-48 object-cover"
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
              <Button variant="link" className="mt-4 text-blue-500">
                Read More
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}


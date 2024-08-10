"use client";
import { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"

// Schema for form validation
const formSchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
  imageUrl: z.string().url("Must be a valid URL").optional(), // Image URL is optional
});

export function AddDisasterDialog({handleName}: any) {
  const router = useRouter();
  
  // Initialize form with default values and validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      date: "",
      location: "",
      imageUrl: "",
    },
  });

  // Mutation for submitting form data to the API
  const { mutate: onSubmit, data: response } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      handleName(values.name);
      console.log("onsubmit",values.name);
      
      return await axios.post("/api/disasters", values); // Ensure this is your actual API endpoint
    },
    onSuccess: () => {
      router.refresh();  // Refresh the page or re-fetch data
      form.reset();      // Reset the form after submission
      setIsOpen(false);  // Close the dialog after successful submission
    },
  });

  // Dialog open state
  const [isOpen, setIsOpen] = useState(false);

  // Handle form submission
  const handleSubmit = form.handleSubmit((data) => {
  // Convert date to ISO-8601 DateTime format
  const dateTime = new Date(data.date).toISOString();
  
  
  // Send the transformed data
  onSubmit({ ...data, date: dateTime });
});

  return (
   <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 text-black" />
        </Button>
      </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Recent disaster information</DialogTitle>
          <DialogDescription>
            Enter the details of recent disaster here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input  {...field}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input  {...field} type="url" placeholder="https://..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                     </form>
        </Form>
        <DialogFooter className="flex justify-between items-center">
          <DialogClose asChild>
            <Button type="button" variant="default">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSubmit} variant="default">
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

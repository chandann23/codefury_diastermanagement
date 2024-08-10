import React from 'react'
import { Card } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"

export default function Component() {
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

      {/* Add Disaster button */}
      <Button 
        className="mb-6 bg-blue-500 text-white hover:bg-blue-600"
      >
        Add Disaster
      </Button>

      {/* Add Disaster form */}
      <form className="mb-6 p-4 border rounded-lg">
        <Input
          name="title"
          placeholder="Disaster Title"
          className="mb-2"
        />
        <Textarea
          name="description"
          placeholder="Description"
          className="mb-2"
        />
        <Input
          name="date"
          placeholder="Date (e.g., 10 December 2022)"
          className="mb-2"
        />
        <Input
          name="imageUrl"
          placeholder="Image URL"
          className="mb-2"
        />
        <Button type="submit" className="bg-green-500 text-white hover:bg-green-600">
          Add Disaster
        </Button>
      </form>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://utfs.io/f/faf2a6e7-7cfb-4902-90c6-094a236ebe76-u4rab0.png"
            alt="Disaster Image"
            className="w-full h-48 object-cover"
            width="350"
            height="200"
            style={{ aspectRatio: "350/200", objectFit: "cover" }}
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">Flood in City</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A severe flood has hit the city, causing widespread damage and displacement of residents.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">10 December 2022</p>
            <Button variant="link" className="mt-4 text-blue-500">
              Read More
            </Button>
          </div>
        </Card>
        <Card className="overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://utfs.io/f/faf2a6e7-7cfb-4902-90c6-094a236ebe76-u4rab0.png"
            alt="Disaster Image"
            className="w-full h-48 object-cover"
            width="350"
            height="200"
            style={{ aspectRatio: "350/200", objectFit: "cover" }}
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">Wildfire in Forest</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A massive wildfire has engulfed the forest, leading to significant loss of flora and fauna.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">15 January 2023</p>
            <Button variant="link" className="mt-4 text-blue-500">
              Read More
            </Button>
          </div>
        </Card>
        <Card className="overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://utfs.io/f/faf2a6e7-7cfb-4902-90c6-094a236ebe76-u4rab0.png"
            alt="Disaster Image"
            className="w-full h-48 object-cover"
            width="350"
            height="200"
            style={{ aspectRatio: "350/200", objectFit: "cover" }}
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">Earthquake in Region</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A powerful earthquake has struck the region, resulting in significant structural damage and casualties.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">20 February 2023</p>
            <Button variant="link" className="mt-4 text-blue-500">
              Read More
            </Button>
          </div>
        </Card>
        <Card className="overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://utfs.io/f/faf2a6e7-7cfb-4902-90c6-094a236ebe76-u4rab0.png"
            alt="Disaster Image"
            className="w-full h-48 object-cover"
            width="350"
            height="200"
            style={{ aspectRatio: "350/200", objectFit: "cover" }}
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">Hurricane in Coast</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A devastating hurricane has hit the coastal areas, causing severe damage to infrastructure and homes.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">25 March 2023</p>
            <Button variant="link" className="mt-4 text-blue-500">
              Read More
            </Button>
          </div>
        </Card>
        <Card className="overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://utfs.io/f/faf2a6e7-7cfb-4902-90c6-094a236ebe76-u4rab0.png"
            alt="Disaster Image"
            className="w-full h-48 object-cover"
            width="350"
            height="200"
            style={{ aspectRatio: "350/200", objectFit: "cover" }}
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">Tsunami Warning</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A tsunami warning has been issued for coastal areas following a strong offshore earthquake.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">5 April 2023</p>
            <Button variant="link" className="mt-4 text-blue-500">
              Read More
            </Button>
          </div>
        </Card>
        <Card className="overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://utfs.io/f/faf2a6e7-7cfb-4902-90c6-094a236ebe76-u4rab0.png"
            alt="Disaster Image"
            className="w-full h-48 object-cover"
            width="350"
            height="200"
            style={{ aspectRatio: "350/200", objectFit: "cover" }}
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">Volcanic Eruption</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A dormant volcano has suddenly erupted, prompting evacuations and causing air travel disruptions.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">12 May 2023</p>
            <Button variant="link" className="mt-4 text-blue-500">
              Read More
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
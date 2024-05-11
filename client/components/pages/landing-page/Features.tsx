import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DrawingPinIcon, RocketIcon } from "@radix-ui/react-icons";
import { CalendarCheck2Icon, GoalIcon } from "lucide-react";
import React from "react";

const features = [
  {
    title: "Lorem ipsum",
    icon: <GoalIcon className="w-16 h-16" />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero at nunc ultrices tincidunt. Nulla facilisi.",
  },
  {
    title: "Lorem ipsum",
    icon: <DrawingPinIcon className="w-16 h-16" />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero at nunc ultrices tincidunt. Nulla facilisi.",
  },
  {
    title: "Lorem ipsum",
    icon: <CalendarCheck2Icon className="w-16 h-16" />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero at nunc ultrices tincidunt. Nulla facilisi.",
  },
  {
    title: "Lorem ipsum",
    icon: <RocketIcon className="w-16 h-16" />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero at nunc ultrices tincidunt. Nulla facilisi.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="w-full px-6 md:px-16 lg:px-24 py-20 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-background"
    >
      <div className="flex flex-col gap-y-4 mx-auto max-w-7xl animate-fade">
        <div className="text-4xl md:text-5xl font-bold">
          <h2 className="inline">
            <span className="inline bg-gradient-to-l from-red-400 to-red-600 text-transparent bg-clip-text">
              Features
            </span>
          </h2>
        </div>
        <p className="text-md md:text-xl text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero
          at nunc ultrices tincidunt. Nulla facilisi.
        </p>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10 mx-auto max-w-7xl animate-fade">
        {features.map((feature, index) => (
          <Card key={`feature-card-${index}`} className="text-center">
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-y-8">
                <div className="mx-auto w-fit p-5 bg-slate-200 dark:bg-slate-800 bg-opacity-50 rounded-3xl">
                  {feature.icon}
                </div>
                <p>{feature.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

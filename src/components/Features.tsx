import { Activity, Brain, LineChart, Users } from "lucide-react";

const features = [
  {
    icon: <Activity className="h-6 w-6 text-primary" />,
    title: "Physical Recovery Tracking",
    description: "Monitor your physical healing progress with detailed metrics and personalized milestones."
  },
  {
    icon: <Brain className="h-6 w-6 text-primary" />,
    title: "Mental Wellness Support",
    description: "Access tools and resources designed to support your mental health journey."
  },
  {
    icon: <LineChart className="h-6 w-6 text-primary" />,
    title: "Progress Analytics",
    description: "Visualize your recovery journey with detailed charts and progress indicators."
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Community Support",
    description: "Connect with others on similar recovery journeys and share experiences."
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Features Designed for Your Recovery
        </h2>
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-8">
            {features.map((feature, index) => (
              <li 
                key={index} 
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/50 transition-colors"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
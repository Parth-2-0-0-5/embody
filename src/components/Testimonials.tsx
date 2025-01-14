import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Krishna G",
    role: "Physical Recovery Patient",
    content: "This app has been instrumental in my recovery journey. The progress tracking features helped me stay motivated throughout my rehabilitation.",
    rating: 5
  },
  {
    name: "Suhani A",
    role: "Mental Health Journey",
    content: "The mental wellness tools and community support have made a significant difference in my daily life. I feel more in control of my recovery.",
    rating: 5
  },
  {
    name: "Shruti S",
    role: "Sports Injury Recovery",
    content: "Being able to track my progress and share it with my physiotherapist has made my recovery much more efficient. Highly recommended!",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Recovery Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="testimonial-card">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-4 text-muted-foreground">{testimonial.content}</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
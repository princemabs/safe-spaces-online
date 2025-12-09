import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Défi 2 : Sécurité Numérique</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 animate-slide-up">
            Protégez votre{" "}
            <span className="text-gradient">vie numérique</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Évaluez vos connaissances en sécurité numérique, découvrez des
            conseils personnalisés et renforcez vos compétences avec nos
            parcours adaptés aux femmes et filles.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/evaluation">
                Commencer l'évaluation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/parcours">
                Découvrir le parcours
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-col items-center gap-2 p-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <span className="text-2xl font-bold">100%</span>
              <span className="text-sm text-muted-foreground">Gratuit</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-2">
                <Users className="w-7 h-7 text-secondary" />
              </div>
              <span className="text-2xl font-bold">500+</span>
              <span className="text-sm text-muted-foreground">Participantes</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 col-span-2 md:col-span-1">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-2">
                <BookOpen className="w-7 h-7 text-accent" />
              </div>
              <span className="text-2xl font-bold">15+</span>
              <span className="text-sm text-muted-foreground">Modules</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

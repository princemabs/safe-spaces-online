import { Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-lg">
                SecuritéNumérique
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Renforcer la sécurité numérique des femmes et filles à travers
              l'éducation et la sensibilisation.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Navigation</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                Accueil
              </Link>
              <Link to="/evaluation" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                Évaluation
              </Link>
              <Link to="/parcours" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                Parcours Pédagogique
              </Link>
              <Link to="/quiz" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                Quiz Interactifs
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Défi 2</h4>
            <p className="text-muted-foreground text-sm">
              Ce projet fait partie du Défi 2 : Renforcer la sécurité numérique
              des femmes et filles dans le contexte local.
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
            Fait avec <Heart className="w-4 h-4 text-accent fill-accent" /> pour la sécurité de toutes
          </p>
        </div>
      </div>
    </footer>
  );
}

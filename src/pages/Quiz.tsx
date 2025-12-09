import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Lock, Eye, AlertTriangle, Trophy, 
  CheckCircle, XCircle, ArrowRight, RefreshCw, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  questions: QuizQuestion[];
}

const quizzes: Quiz[] = [
  {
    id: 1,
    title: "Mots de passe et authentification",
    description: "Testez vos connaissances sur la création de mots de passe sécurisés",
    icon: Lock,
    color: "primary",
    questions: [
      {
        question: "Quel mot de passe est le plus sécurisé ?",
        options: ["Marie2000", "123456789", "J@ime-Lire#2024!", "motdepasse"],
        correctAnswer: 2,
        explanation: "Un mot de passe sécurisé combine lettres, chiffres, symboles et fait plus de 12 caractères.",
      },
      {
        question: "À quelle fréquence devez-vous changer votre mot de passe ?",
        options: [
          "Jamais si personne ne le connaît",
          "Chaque semaine",
          "Quand vous pensez qu'il a été compromis",
          "Seulement à l'inscription",
        ],
        correctAnswer: 2,
        explanation: "Changez votre mot de passe si vous suspectez qu'il a été découvert ou si le service a subi une fuite de données.",
      },
      {
        question: "La vérification en deux étapes (2FA) :",
        options: [
          "Remplace le mot de passe",
          "Ajoute une couche de sécurité supplémentaire",
          "Est obligatoire sur tous les sites",
          "Ralentit votre connexion de 2 minutes",
        ],
        correctAnswer: 1,
        explanation: "La 2FA ajoute une deuxième vérification (code par SMS ou application) en plus du mot de passe.",
      },
    ],
  },
  {
    id: 2,
    title: "Confidentialité et réseaux sociaux",
    description: "Évaluez votre maîtrise de la protection de la vie privée en ligne",
    icon: Eye,
    color: "secondary",
    questions: [
      {
        question: "Quelle information ne devriez-vous JAMAIS partager publiquement ?",
        options: [
          "Votre couleur préférée",
          "Votre adresse personnelle",
          "Votre film préféré",
          "Votre équipe de sport favorite",
        ],
        correctAnswer: 1,
        explanation: "Votre adresse personnelle est une donnée sensible qui pourrait être utilisée pour vous localiser ou vous nuire.",
      },
      {
        question: "Qui devrait pouvoir voir vos publications sur les réseaux sociaux ?",
        options: [
          "Tout le monde, c'est plus amusant",
          "Seulement les personnes que vous connaissez vraiment",
          "Seulement les comptes vérifiés",
          "Les amis de vos amis",
        ],
        correctAnswer: 1,
        explanation: "Limiter la visibilité à vos vrais amis protège vos informations des inconnus et des personnes malveillantes.",
      },
      {
        question: "Que faire avant de publier une photo ?",
        options: [
          "Ajouter un maximum de filtres",
          "La partager sur tous les réseaux",
          "Réfléchir si elle révèle des informations sensibles",
          "Demander l'avis de ses followers",
        ],
        correctAnswer: 2,
        explanation: "Vérifiez que la photo ne montre pas votre adresse, plaque d'immatriculation, ou autres informations personnelles.",
      },
    ],
  },
  {
    id: 3,
    title: "Reconnaître les arnaques",
    description: "Apprenez à identifier les tentatives de phishing et d'arnaque",
    icon: AlertTriangle,
    color: "accent",
    questions: [
      {
        question: "Vous recevez un email urgent de votre 'banque' demandant votre mot de passe. Que faites-vous ?",
        options: [
          "Vous répondez rapidement avec vos informations",
          "Vous cliquez sur le lien dans l'email",
          "Vous appelez votre banque avec le numéro officiel",
          "Vous transférez à un ami pour avoir son avis",
        ],
        correctAnswer: 2,
        explanation: "Une vraie banque ne demande JAMAIS vos identifiants par email. Contactez-la directement via le numéro officiel.",
      },
      {
        question: "Un message vous annonce que vous avez gagné 10 000€ sans avoir joué. C'est probablement :",
        options: [
          "Un coup de chance incroyable",
          "Une arnaque",
          "Une erreur de la loterie",
          "Un cadeau de votre opérateur",
        ],
        correctAnswer: 1,
        explanation: "Si c'est trop beau pour être vrai, c'est une arnaque. On ne gagne pas à une loterie sans y avoir participé.",
      },
      {
        question: "Quel signe indique souvent un email de phishing ?",
        options: [
          "Un logo officiel de l'entreprise",
          "Des fautes d'orthographe et un ton urgent",
          "Une signature professionnelle",
          "L'absence de pièce jointe",
        ],
        correctAnswer: 1,
        explanation: "Les emails de phishing contiennent souvent des erreurs et créent un sentiment d'urgence pour vous faire agir vite.",
      },
    ],
  },
];

const Quiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setAnsweredQuestions([]);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === selectedQuiz?.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setAnsweredQuestions([...answeredQuestions, answerIndex === selectedQuiz?.questions[currentQuestion].correctAnswer]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < (selectedQuiz?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary": return { bg: "bg-primary/10", text: "text-primary", border: "border-primary" };
      case "secondary": return { bg: "bg-secondary/10", text: "text-secondary", border: "border-secondary" };
      case "accent": return { bg: "bg-accent/10", text: "text-accent", border: "border-accent" };
      default: return { bg: "bg-primary/10", text: "text-primary", border: "border-primary" };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {!selectedQuiz ? (
            <>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Quiz Interactifs</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                  Testez vos <span className="text-gradient">connaissances</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Apprenez en vous amusant avec nos quiz sur la sécurité numérique.
                  Gagnez des points et découvrez où vous pouvez vous améliorer !
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {quizzes.map((quiz) => {
                  const colors = getColorClasses(quiz.color);
                  return (
                    <Card
                      key={quiz.id}
                      variant="elevated"
                      className="cursor-pointer group"
                      onClick={() => handleStartQuiz(quiz)}
                    >
                      <CardHeader>
                        <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-4", colors.bg)}>
                          <quiz.icon className={cn("w-7 h-7", colors.text)} />
                        </div>
                        <CardTitle className="group-hover:text-primary transition-smooth">
                          {quiz.title}
                        </CardTitle>
                        <CardDescription>{quiz.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {quiz.questions.length} questions
                          </span>
                          <Button variant="ghost" size="sm" className="group-hover:bg-primary/10">
                            Commencer
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          ) : !quizCompleted ? (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <Button
                variant="ghost"
                onClick={handleBackToQuizzes}
                className="mb-6"
              >
                ← Retour aux quiz
              </Button>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} sur {selectedQuiz.questions.length}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    Score : {score}
                  </span>
                </div>
                <Progress 
                  value={((currentQuestion + 1) / selectedQuiz.questions.length) * 100} 
                  variant="primary" 
                  className="h-3" 
                />
              </div>

              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-xl leading-relaxed">
                    {selectedQuiz.questions[currentQuestion].question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedQuiz.questions[currentQuestion].options.map((option, index) => {
                    const isCorrect = index === selectedQuiz.questions[currentQuestion].correctAnswer;
                    const isSelected = selectedAnswer === index;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={showResult}
                        className={cn(
                          "w-full p-4 rounded-xl text-left transition-smooth border-2 flex items-center justify-between",
                          !showResult && "hover:border-primary/50 hover:bg-muted/50",
                          !showResult && "border-border bg-card",
                          showResult && isCorrect && "border-secondary bg-secondary/10",
                          showResult && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                          showResult && !isSelected && !isCorrect && "border-border bg-card opacity-50"
                        )}
                      >
                        <span className="font-medium">{option}</span>
                        {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-secondary" />}
                        {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive" />}
                      </button>
                    );
                  })}

                  {showResult && (
                    <div className={cn(
                      "p-4 rounded-xl mt-4",
                      selectedAnswer === selectedQuiz.questions[currentQuestion].correctAnswer
                        ? "bg-secondary/10 border border-secondary/20"
                        : "bg-destructive/10 border border-destructive/20"
                    )}>
                      <p className="font-medium mb-1">
                        {selectedAnswer === selectedQuiz.questions[currentQuestion].correctAnswer
                          ? "✓ Bonne réponse !"
                          : "✗ Pas tout à fait..."}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedQuiz.questions[currentQuestion].explanation}
                      </p>
                    </div>
                  )}

                  {showResult && (
                    <Button
                      variant="hero"
                      className="w-full mt-4"
                      onClick={handleNextQuestion}
                    >
                      {currentQuestion < selectedQuiz.questions.length - 1
                        ? "Question suivante"
                        : "Voir les résultats"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto animate-fade-in text-center">
              <Card variant="glass">
                <CardHeader>
                  <div className="mx-auto w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                    <Trophy className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-3xl">Quiz terminé !</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="text-6xl font-bold text-gradient mb-2">
                      {score} / {selectedQuiz.questions.length}
                    </div>
                    <p className="text-muted-foreground">
                      {score === selectedQuiz.questions.length
                        ? "Parfait ! Vous maîtrisez ce sujet !"
                        : score >= selectedQuiz.questions.length / 2
                        ? "Bien joué ! Continuez à apprendre !"
                        : "Continuez à apprendre, vous progressez !"}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="ghost" onClick={() => handleStartQuiz(selectedQuiz)}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Rejouer
                    </Button>
                    <Button variant="hero" onClick={handleBackToQuizzes}>
                      Autres quiz
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;

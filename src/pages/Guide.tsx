import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { guideData, translations, Language } from '@/components/data/guideContent';
import GuideSection from '@/components/guide/GuideSection';
import LanguageToggle from '@/components/guide/LanguageToggle';
import { Button } from '@/components/ui2/button';

const Guide = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<Language>('fr');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  // Load checked items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('guide-checklist');
    if (saved) {
      setCheckedItems(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save checked items to localStorage
  useEffect(() => {
    localStorage.setItem('guide-checklist', JSON.stringify([...checkedItems]));
  }, [checkedItems]);

  const handleToggleItem = (id: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Calculate overall progress
  const allChecklistItems = guideData.flatMap(section => 
    section.steps.flatMap(step => step.checklist || [])
  );
  const totalItems = allChecklistItems.length;
  const completedItems = allChecklistItems.filter(item => checkedItems.has(item.id)).length;
  const overallProgress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div className="min-h-screen absolute inset-0 bg-pink-500/20 ">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{translations.backToGame[language]}</span>
            </Button>
            
            <LanguageToggle language={language} onToggle={setLanguage} />
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="gradient-hero text-primary-foreground py-12 md:py-16"
      >
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center"
          >
            <BookOpen className="w-8 h-8" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl text-white font-bold mb-3">
            {translations.title[language]}
          </h1>
          <p className="text-lg opacity-90  text-black mb-8">
            {translations.subtitle[language]}
          </p>

          {/* Overall Progress */}
          <div className="max-w-md mx-auto text-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium opacity-90">
                {completedItems} / {totalItems}
              </span>
              <span className="text-sm font-bold">
                {Math.round(overallProgress)}% {translations.progress[language]}
              </span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden ">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Guide Content */}
      <main className="container max-w-3xl mx-auto px-4 py-8 space-y-6">
        {guideData.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <GuideSection
              section={section}
              language={language}
              checkedItems={checkedItems}
              onToggleItem={handleToggleItem}
            />
          </motion.div>
        ))}
      </main>

      {/* Footer */}
      <footer className="container max-w-3xl mx-auto px-4 py-8 text-center">
        <p className="text-sm text-black">
          {language === 'fr' 
            ? 'Votre progression est sauvegardée automatiquement.'
            : 'Your progress is saved automatically.'}
        </p>
      </footer>
    </div>
  );
};

export default Guide;

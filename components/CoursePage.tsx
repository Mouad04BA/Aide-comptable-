import React, { useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { courseData } from '../data/courseData';
import { Lesson } from '../types';
import LessonView from './LessonView';

const LessonCard: React.FC<{ lesson: Lesson; onSelect: () => void; }> = ({ lesson, onSelect }) => {
  const { language, t } = useLanguage();
  return (
    <button
      onClick={onSelect}
      className="w-full text-left bg-white dark:bg-dark-card p-6 rounded-xl shadow-md"
    >
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-primary-dark pr-4">{lesson.title[language]}</h2>
        <div className="flex-shrink-0 flex items-center gap-2">
          {lesson.td && (
            <span className="text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200 px-2.5 py-1 rounded-full">
              {t('lessonContainsTD')}
            </span>
          )}
          {lesson.quiz && (
            <span className="text-xs font-semibold bg-secondary/10 text-secondary-dark dark:bg-secondary/20 dark:text-secondary px-2.5 py-1 rounded-full">
              {t('lessonContainsQuiz')}
            </span>
          )}
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{lesson.description[language]}</p>
    </button>
  );
};

const CoursePage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const selectedLesson = courseData.find(lesson => lesson.id === selectedLessonId);

  const handleNextLesson = useCallback(() => {
    const currentIndex = courseData.findIndex(lesson => lesson.id === selectedLessonId);
    if (currentIndex > -1 && currentIndex < courseData.length - 1) {
      setSelectedLessonId(courseData[currentIndex + 1].id);
    }
  }, [selectedLessonId]);

  const handlePrevLesson = useCallback(() => {
    const currentIndex = courseData.findIndex(lesson => lesson.id === selectedLessonId);
    if (currentIndex > 0) {
      setSelectedLessonId(courseData[currentIndex - 1].id);
    }
  }, [selectedLessonId]);

  if (selectedLesson) {
    const currentIndex = courseData.findIndex(lesson => lesson.id === selectedLessonId);
    const hasNext = currentIndex < courseData.length - 1;
    const hasPrev = currentIndex > 0;
    
    return (
      <LessonView 
        lesson={selectedLesson} 
        onBack={() => setSelectedLessonId(null)}
        onNext={handleNextLesson}
        onPrev={handlePrevLesson}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('courseListTitle')}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{t('courseListSubtitle')}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {courseData.map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} onSelect={() => setSelectedLessonId(lesson.id)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
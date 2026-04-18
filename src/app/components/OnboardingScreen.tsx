import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ShieldCheck, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    icon: Clock,
    title: 'جلسات التركيز',
    description: 'ابدأ جلسات تركيز مخصصة للدراسة والعمل والنوم مع مؤقت قوي',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: ShieldCheck,
    title: 'حظر التطبيقات المشتتة',
    description: 'احظر تطبيقات التواصل الاجتماعي والألعاب تلقائياً خلال جلسات التركيز',
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    icon: Globe,
    title: 'تصفح آمن ومحمي',
    description: 'فلترة المواقع الضارة والمحتوى غير المناسب مع حماية DNS الذكية',
    gradient: 'from-emerald-500 to-teal-500'
  }
];

export function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/permissions');
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col p-6">
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className={`bg-gradient-to-br ${slide.gradient} p-8 rounded-3xl`}>
          <Icon className="w-20 h-20 text-white" strokeWidth={2} />
        </div>

        <div className="text-center max-w-sm space-y-4">
          <h2 className="text-white text-2xl font-bold">{slide.title}</h2>
          <p className="text-slate-400 leading-relaxed">{slide.description}</p>
        </div>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        {currentSlide > 0 && (
          <button
            onClick={handlePrev}
            className="flex-1 bg-slate-800 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-700 transition"
          >
            <ChevronRight className="w-5 h-5" />
            السابق
          </button>
        )}
        <button
          onClick={handleNext}
          className="flex-1 bg-gradient-to-r from-blue-500 to-violet-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition"
        >
          {currentSlide === slides.length - 1 ? 'ابدأ الآن' : 'التالي'}
          {currentSlide < slides.length - 1 && <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}

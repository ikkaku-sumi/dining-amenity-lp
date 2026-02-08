import React, { useRef, useState, useEffect } from 'react';
import { 
  MessageSquare, 
  BarChart2, 
  PieChart, 
  CheckCircle, 
  ArrowRight, 
  MessageCircle, 
  HelpCircle,
  FileText,
  Smartphone,
  MousePointerClick,
  Menu,
  MessageSquareMore,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Heart,
  Share2,
  MapPin,
  Instagram,
  ClipboardList,
  PenTool,
  Gift,
  TrendingUp,
  QrCode,
  Sparkles,
  Headphones,
  RefreshCw,
  Star,
  Send,
  Coffee,
  Copy,
  ExternalLink,
  Utensils,
  Check,
  Users,
  X
} from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// --- Shared Components ---

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Pill: React.FC<{ children: React.ReactNode; color?: 'gold' | 'white' }> = ({ children, color = 'gold' }) => {
  const styles = color === 'gold' 
    ? "bg-gold/10 text-gold border border-gold/20" 
    : "bg-white/20 text-white border border-white/30";
  
  return (
    <span className={`inline-block text-[13px] font-serif tracking-wider font-medium px-5 py-1.5 rounded-full mb-5 ${styles}`}>
      {children}
    </span>
  );
};

const PhoneMockup: React.FC<{ src?: string; alt?: string; className?: string; children?: React.ReactNode }> = ({ src, alt, className = "", children }) => (
  <div className={`relative border-gray-100 bg-gray-100 border-[8px] rounded-[2.5rem] shadow-soft overflow-hidden z-20 ${className}`}>
    <div className="h-[32px] w-[3px] bg-gray-100 absolute -left-[11px] top-[72px] rounded-l-lg"></div>
    <div className="h-[46px] w-[3px] bg-gray-100 absolute -left-[11px] top-[124px] rounded-l-lg"></div>
    <div className="h-[46px] w-[3px] bg-gray-100 absolute -left-[11px] top-[178px] rounded-l-lg"></div>
    <div className="h-[64px] w-[3px] bg-gray-100 absolute -right-[11px] top-[142px] rounded-r-lg"></div>
    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative flex flex-col">
       {/* Mock Chat UI Header */}
       <div className="absolute top-0 w-full h-14 bg-gold flex items-center justify-center px-4 z-10 shrink-0 shadow-md">
         <div className="text-white text-base font-bold tracking-widest">アンケート</div>
       </div>
       {children ? (
         <div className="w-full h-full pt-14 bg-[#EEF0F4]">
           {children}
         </div>
       ) : (
         <img src={src} alt={alt} className="w-full h-full object-cover pt-14" />
       )}
    </div>
  </div>
);

// --- Navigation Menu Component ---

const NavigationMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const menuItems = [
    { label: 'ホーム', en: 'Home', href: '#home' },
    { label: '特徴', en: 'Features', href: '#features' },
    { label: '利用料金', en: 'Price', href: '#pricing' },
    { label: '導入事例', en: 'Case Studies', href: '#cases' },
    { label: '導入のご相談', en: 'Contact', href: '#contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-white flex flex-col overflow-hidden"
        >
           {/* Header inside Menu */}
           <div className="max-w-[1280px] mx-auto w-full px-4 md:px-8 h-16 md:h-20 flex items-center justify-between shrink-0 border-b border-gray-100">
              <div className="font-serif tracking-widest text-gold font-bold text-xl md:text-2xl">DINING AMENITY</div>
              <div className="flex items-center gap-3 md:gap-6">
                <a 
                  href="#contact" 
                  onClick={onClose}
                  className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full border border-gold text-gold hover:bg-gold hover:text-white transition-all font-medium text-sm tracking-widest"
                >
                  導入のご相談 <ArrowRight size={16} />
                </a>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
           </div>

           {/* Menu List */}
           <div className="flex-1 overflow-y-auto py-12 px-6">
             <div className="max-w-3xl mx-auto flex flex-col gap-6">
               {menuItems.map((item, idx) => (
                 <motion.a
                   key={idx}
                   href={item.href}
                   onClick={onClose}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: idx * 0.05 + 0.1 }}
                   className="group flex items-center justify-between border-b border-gray-100 pb-6 hover:border-gold/30 transition-colors cursor-pointer"
                 >
                   <div className="flex items-baseline gap-4">
                     <span className="text-2xl md:text-4xl font-bold text-gold group-hover:text-gold-dark transition-colors">{item.label}</span>
                     <span className="text-sm font-serif text-gold/60 font-medium tracking-wider">{item.en}</span>
                   </div>
                   <div className="w-10 h-10 rounded-full border border-gold/30 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all">
                     <ArrowRight size={18} />
                   </div>
                 </motion.a>
               ))}
             </div>
           </div>

           {/* Footer Links */}
           <div className="py-8 px-6 bg-gray-50/50">
             <div className="max-w-3xl mx-auto flex gap-8 text-xs text-gray-500 font-medium">
               <a href="#" className="hover:text-gold flex items-center gap-2 transition-colors">
                 <span className="text-gold"><Users size={14}/></span> 運営会社
               </a>
               <a href="#" className="hover:text-gold flex items-center gap-2 transition-colors">
                 <span className="text-gold"><FileText size={14}/></span> サービス約款
               </a>
             </div>
           </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Chat Demo Component ---

type Message = {
  id: number;
  type: 'bot' | 'user';
  text?: React.ReactNode;
  content?: React.ReactNode;
};

const BotIcon = () => (
  <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gold shadow-sm shrink-0 mr-2 overflow-hidden">
    <Coffee size={18} />
  </div>
);

const ChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'bot', text: '本日はご来店誠にありがとうございます😊\n早速ですがいくつか質問させてください💌' },
    { id: 2, type: 'bot', text: 'まずはお客様のことを教えてください\n選択肢からお選びください' }
  ]);
  const [step, setStep] = useState(0); // 0: Gender, 1: Age, 2: Review, 3: End
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOptionClick = async (optionText: string, nextStep: number) => {
    // 1. Add User Message
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: optionText }]);
    setStep(99); // Temporary loading state to hide options
    
    // 2. Show Typing Indicator
    setIsTyping(true);

    // 3. Wait and Add Bot Message
    setTimeout(() => {
      setIsTyping(false);
      proceedToStep(nextStep);
    }, 1000);
  };

  const proceedToStep = (nextStep: number) => {
    setStep(nextStep);
    const now = Date.now();

    if (nextStep === 1) {
      // Ask Age
      setMessages(prev => [...prev, { 
        id: now, 
        type: 'bot', 
        text: '続いて、年代を教えてください' 
      }]);
    } else if (nextStep === 2) {
      // Ask Review
      setMessages(prev => [...prev, 
        { 
          id: now, 
          type: 'bot', 
          text: '口コミの投稿にもご協力いただけますと幸いです\n一言でも大歓迎です💌' 
        },
        {
          id: now + 1,
          type: 'bot',
          content: (
            <div className="flex flex-col gap-3">
              <p className="text-sm leading-relaxed">
                「例文コピー」で、まとめた感想をそのままコピーして使用することもできます✏️
              </p>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs text-gray-600 leading-relaxed">
                【例文】<br/>
                コーヒーが美味しく、料理やスイーツも大変良かったです　お店の雰囲気もとても心地よく、また来たいと思いました
              </div>
              <button 
                onClick={handleCopy}
                className={`flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                {copied ? 'コピーしました' : '例文コピー'}
              </button>
            </div>
          )
        },
        {
          id: now + 2,
          type: 'bot',
          content: (
            <div className="flex gap-2">
               <button className="flex-1 bg-[#3c5a99] text-white py-2 rounded-md text-xs font-bold shadow-sm hover:opacity-90">
                 食べログ
               </button>
               <button className="flex-1 bg-[#4285F4] text-white py-2 rounded-md text-xs font-bold shadow-sm hover:opacity-90">
                 Google マップ
               </button>
            </div>
          )
        },
        {
          id: now + 3,
          type: 'bot',
          text: 'ご質問は以上となります　ご協力ありがとうございました☺️'
        }
      ]);
    }
  };

  const resetChat = () => {
    setMessages([
      { id: 1, type: 'bot', text: '本日はご来店誠にありがとうございます😊\n早速ですがいくつか質問させてください💌' },
      { id: 2, type: 'bot', text: 'まずはお客様のことを教えてください\n選択肢からお選びください' }
    ]);
    setStep(0);
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-[#EEF0F4]" ref={scrollRef}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start items-start'}`}
            >
              {msg.type === 'bot' && <BotIcon />}
              <div 
                className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed rounded-2xl shadow-sm whitespace-pre-wrap ${
                  msg.type === 'user' 
                    ? 'bg-gold text-white rounded-br-none' 
                    : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                }`}
              >
                {msg.text && msg.text}
                {msg.content && msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
             <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex justify-start items-start"
            >
              <BotIcon />
              <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1 h-[42px] items-center">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="h-32"></div> {/* Spacer for bottom options */}
      </div>

      {/* Input Area (Dynamic Options) */}
      <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm border-t border-gray-100 p-4 min-h-[100px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* Step 0: Gender */}
          {step === 0 && (
            <motion.div 
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex gap-2"
            >
              <button 
                onClick={() => handleOptionClick('男性', 1)}
                className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-full shadow-sm hover:bg-gray-50 transition-colors text-sm"
              >
                男性
              </button>
              <button 
                onClick={() => handleOptionClick('女性', 1)}
                className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-full shadow-sm hover:bg-gray-50 transition-colors text-sm"
              >
                女性
              </button>
            </motion.div>
          )}

          {/* Step 1: Age */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-2 gap-2"
            >
              {['10代', '20~30代', '40~50代', '60代以上'].map((age) => (
                <button 
                  key={age}
                  onClick={() => handleOptionClick(age, 2)}
                  className="bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-full shadow-sm hover:bg-gray-50 transition-colors text-sm"
                >
                  {age}
                </button>
              ))}
            </motion.div>
          )}

          {/* Step 2: Finished (Show Reset) */}
          {step === 2 && (
            <motion.div 
              key="end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
               <button 
                onClick={resetChat}
                className="flex items-center justify-center gap-2 w-full bg-gray-800 text-white font-bold py-3 rounded-xl shadow-md hover:bg-gray-700 transition-colors text-sm"
              >
                <RefreshCw size={16} /> 最初から試す
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const DashboardMockup: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = "" }) => (
  <div className={`relative rounded-xl shadow-lg bg-white overflow-hidden ${className}`}>
    <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex gap-2 items-center">
       <div className="flex gap-1.5">
         <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
         <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
         <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
       </div>
       <div className="flex-1 ml-4 bg-white border border-gray-100 rounded h-6 w-full"></div>
    </div>
    <img src={src} alt={alt} className="w-full h-auto block" />
  </div>
);

// --- Sections ---

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gold text-white border-b border-white/10 transition-colors duration-300">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo Area */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="font-serif tracking-widest text-white font-bold text-xl md:text-2xl">DINING AMENITY</div>
          </div>

          {/* Desktop Nav / CTA */}
          <div className="flex items-center gap-3 md:gap-6">
            <a 
              href="#contact" 
              className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/40 hover:bg-white hover:text-gold transition-all font-medium text-sm tracking-widest"
            >
              導入のご相談 <ArrowRight size={16} />
            </a>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-full border border-white/30 hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </header>
      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative bg-gold min-h-screen flex items-center justify-center overflow-hidden py-32 scroll-mt-24">
      {/* Decorative Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop" 
            alt="Texture" 
            className="w-full h-full object-cover grayscale opacity-10 mix-blend-multiply" 
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.25, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 right-0 w-[100%] md:w-[65%] h-full z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold/50 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gold/30 mix-blend-color z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1920&auto=format&fit=crop" 
            alt="Atmosphere" 
            className="w-full h-full object-cover object-center grayscale" 
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full flex flex-col items-center justify-center text-center">
        <FadeIn>
          <h2 className="text-white/90 font-medium tracking-[0.2em] mb-6 text-sm md:text-base font-sans drop-shadow-sm">
            お客様との対話から始める店舗づくり
          </h2>
          
          <h1 className="text-white font-serif font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-tight tracking-tight mb-8 drop-shadow-md">
            飲食店向け<br className="md:hidden" /> AIチャットアンケート
          </h1>
          
          <p className="text-white/95 text-sm md:text-base lg:text-lg leading-relaxed mb-12 max-w-2xl mx-auto font-light drop-shadow-sm">
            お客様の本音を、会話するように気軽に収集<br className="hidden md:block"/>
            世界観を磨き続ける店舗づくりをサポートします
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <a 
                href="#contact"
                className="w-full sm:w-auto px-12 py-5 bg-white text-gold rounded-full font-bold tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
             >
               導入のご相談 <ArrowRight size={16} />
             </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const Problem: React.FC = () => {
  const problems = [
    {
      icon: <MessageCircle className="w-8 h-8 text-gold" />,
      title: "声にならないまま消えている",
      desc: "感動しても、言葉にしないまま帰るお客様がほとんどです"
    },
    {
      icon: <HelpCircle className="w-8 h-8 text-gold" />,
      title: "こだわりが伝わっているか不明",
      desc: "お店のコンセプトや新メニュー　お客様にどう受け止められているのか、判断材料が不足しています"
    },
    {
      icon: <FileText className="w-8 h-8 text-gold" />,
      title: "声を聞く仕組みがない",
      desc: "紙のアンケートは集計が大変　忙しい営業の中で、手軽に声を拾う仕組みが必要です"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <Pill>解決すべき課題</Pill>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark mb-6">消えているお客様の本音を<br className="md:hidden"/>届けること</h2>
            <p className="text-text-mid leading-loose">「美味しかった」「また来たい」「もっとこうしてほしい」—— <br className="hidden md:block"/>お客様が感じている声はほとんど消えてしまっています</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-cream/30 hover:bg-cream border border-transparent hover:border-gold/20 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-white shadow-soft flex items-center justify-center mb-6 text-gold">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-text-dark mb-4">{item.title}</h3>
                <p className="text-sm text-text-mid leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureChat: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-cream overflow-hidden scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="md:w-1/2 order-2 md:order-1 flex justify-center">
            <FadeIn>
              <div className="w-[300px] h-[600px]">
                <PhoneMockup className="w-full h-full">
                  <ChatDemo />
                </PhoneMockup>
              </div>
            </FadeIn>
          </div>
          <div className="md:w-1/2 order-1 md:order-2 text-center md:text-left">
            <FadeIn delay={0.2}>
              <Pill>特徴 ①</Pill>
              <h2 className="text-3xl md:text-5xl font-serif font-medium text-text-dark mb-8 leading-tight">
                会話するように回答
              </h2>
              <div className="text-text-mid leading-loose mb-8">
                <p className="mb-4 text-base md:text-lg">
                  LINEのようなチャット形式で、直感的に全年齢の方が迷わず操作可能<br />
                  お客様の負担を最小限に
                </p>
              </div>
              <div className="flex flex-col gap-5 text-sm text-text-dark font-medium">
                <div className="flex items-center gap-4 justify-center md:justify-start group">
                  <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center text-gold bg-gold/5 shrink-0 group-hover:bg-gold group-hover:text-white transition-colors">
                     <Check size={16} strokeWidth={3} />
                  </div>
                  <span className="text-base tracking-wide">QRコードを読み取るだけ、アプリ不要</span>
                </div>
                <div className="flex items-center gap-4 justify-center md:justify-start group">
                  <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center text-gold bg-gold/5 shrink-0 group-hover:bg-gold group-hover:text-white transition-colors">
                     <Check size={16} strokeWidth={3} />
                  </div>
                  <span className="text-base tracking-wide">設問も出口も自由にカスタマイズ可能</span>
                </div>
                <div className="flex items-center gap-4 justify-center md:justify-start group">
                  <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center text-gold bg-gold/5 shrink-0 group-hover:bg-gold group-hover:text-white transition-colors">
                     <Check size={16} strokeWidth={3} />
                  </div>
                  <span className="text-base tracking-wide">従来の紙アンケートより回答率向上</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureAnalysis: React.FC = () => {
  return (
    <section className="py-24 bg-gold relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <FadeIn>
            <Pill color="white">特徴 ②</Pill>
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6">
              お客様の声が、<br />リアルタイムで届く
            </h2>
            <p className="text-white/90 leading-loose font-light">
              回答はリアルタイムで管理画面に反映し作業負担はゼロ<br />
              管理画面を開くだけで状況を把握できます<br />
              お客様が何に感動し、何を求めているか手間なく自然に見えてきます
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.4} className="mt-8">
           <div className="p-2 md:p-4 bg-white/5 rounded-2xl md:rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl">
             <DashboardMockup src="https://picsum.photos/1000/600?random=4" alt="Analysis Dashboard" />
           </div>
        </FadeIn>
      </div>
    </section>
  );
};

const FeatureExit: React.FC = () => {
  const features = [
    {
      icon: <MessageSquare size={24} />,
      iconBg: "bg-green-100 text-green-600",
      title: "応援してくれるお客様の声を、\n自然にお店の外へ",
      desc: "Google口コミ・食べログ"
    },
    {
      icon: <Users size={24} />,
      iconBg: "bg-blue-100 text-blue-600",
      title: "つながり続ける関係を、\nデジタルでも",
      desc: "公式LINE・Instagram"
    },
    {
      icon: <PenTool size={24} />,
      iconBg: "bg-orange-100 text-orange-600",
      title: "例文コピー機能で、\n想いを言葉にするお手伝い",
      desc: "入力サポート"
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-20">
          
          {/* Left Column: Text */}
          <div className="md:w-1/2 text-left">
            <FadeIn>
              <Pill>特徴 ③</Pill>
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-text-dark mb-8 leading-tight">
                回答後の導線を自由に設計
              </h2>
              <div className="text-text-mid leading-relaxed">
                <p className="mb-5">
                  アンケート回答後が、お客様と繋がる最大のチャンス<br />
                  Google口コミ・食べログ・公式LINE・Instagramなど
                </p>
                <p>
                  お店の目的に合わせた導線を用意できます
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Visual Cards */}
          <div className="md:w-1/2 w-full">
            <FadeIn delay={0.2}>
              <div className="relative bg-[#F9F9F6] p-8 md:p-12 rounded-[3rem]">
                <div className="space-y-4">
                  {features.map((feature, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                      className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-5 transition-all cursor-default shadow-sm"
                    >
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${feature.iconBg}`}>
                        {feature.icon}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg text-text-dark mb-2 leading-snug whitespace-pre-wrap">
                          {feature.title}
                        </h3>
                        <p className="text-xs text-gray-400 font-medium tracking-wide bg-gray-50 inline-block px-3 py-1 rounded-full border border-gray-100">
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};

const SupportFlow: React.FC = () => {
  const steps = [
    { 
      num: "01", 
      title: "ヒアリング", 
      icon: <ClipboardList strokeWidth={1.5} size={48} />, 
      desc: "お店の方向性と課題を確認",
      sub: "オンライン / 対面"
    },
    { 
      num: "02", 
      title: "設問設計", 
      icon: <PenTool strokeWidth={1.5} size={48} />, 
      desc: "お客様に聞きたいことを設計",
      sub: "約1週間"
    },
    { 
      num: "03", 
      title: "出口設計", 
      icon: <Share2 strokeWidth={1.5} size={48} />, 
      desc: "回答後の動線を設計",
      sub: "Googleマップ / LINE連携"
    },
    { 
      num: "04", 
      title: "声がけ設計", 
      icon: <MessageCircle strokeWidth={1.5} size={48} />, 
      desc: "協力をお願いする方法を検討",
      sub: "POP作成支援"
    },
    { 
      num: "05", 
      title: "運用開始", 
      icon: <Smartphone strokeWidth={1.5} size={48} />, 
      desc: "QRコード設置スタート",
      sub: "スタート支援"
    },
    { 
      num: "06", 
      title: "継続改善", 
      icon: <TrendingUp strokeWidth={1.5} size={48} />, 
      desc: "データに基づく改善提案",
      sub: "月次レポート"
    },
  ];

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">
           <FadeIn>
            <Pill>サポート体制</Pill>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">導入から運用まで、<br className="md:hidden" />伴走します</h2>
           </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-4 relative">
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <div className="flex-1 flex flex-col items-center text-center group min-w-[140px]">
                  <div className="font-serif text-lg font-bold text-text-dark mb-6 whitespace-nowrap">
                    {step.num}. {step.title}
                  </div>
                  
                  <div className="w-24 h-24 rounded-full bg-white border-2 border-gold text-gold flex items-center justify-center shadow-sm mb-6 transition-transform group-hover:scale-110 duration-300">
                    {step.icon}
                  </div>
                  
                  <p className="text-sm font-bold text-text-dark mb-2 leading-relaxed px-2">
                    {step.desc}
                  </p>
                  <p className="text-xs text-text-light font-medium">
                    {step.sub && `※ ${step.sub}`}
                  </p>
                </div>

                {i < steps.length - 1 && (
                  <div className="flex items-center justify-center text-gray-300 md:pt-12 self-center md:self-auto">
                    <ChevronRight size={32} className="hidden md:block" />
                    <ChevronDown size={32} className="md:hidden my-2" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const VoicePower: React.FC = () => {
  // Bubbles data for the "Feedback" card animation
  const bubbles = [
    { text: "美味しかったです！", left: "10%", scale: 1, opacity: 1, duration: 8, delay: 0, blur: false },
    { text: "ありがとう", left: "70%", scale: 0.9, opacity: 0.9, duration: 9, delay: 3, blur: false },
    { text: "また来ます✨", left: "25%", scale: 0.7, opacity: 0.6, duration: 11, delay: 1.5, blur: true },
    { text: "最高！", left: "85%", scale: 0.6, opacity: 0.5, duration: 10, delay: 5, blur: true },
    { text: "ごちそうさま", left: "45%", scale: 0.8, opacity: 0.7, duration: 12, delay: 7, blur: false },
    { text: "素敵なお店", left: "60%", scale: 0.65, opacity: 0.4, duration: 13, delay: 2, blur: true },
    { text: "感動しました", left: "5%", scale: 0.6, opacity: 0.5, duration: 14, delay: 6, blur: true },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <Pill>提供価値</Pill>
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-text-dark mb-4">
              声を聞いて磨く<br className="md:hidden" />声を届けて広がる
            </h2>
            <p className="text-text-mid">収集から拡散まで、一気通貫</p>
          </FadeIn>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center relative">
          
          {/* Card 1: Feedback Collection */}
          <FadeIn className="flex-1 max-w-[580px] w-full bg-[#FAFAF7] rounded-[3rem] p-8 md:p-12 border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-lg transition-all duration-500">
             {/* Header */}
             <div className="flex items-center gap-5 mb-10">
               <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0 border border-gold/20">
                 <MessageCircle size={30} strokeWidth={1.5} />
               </div>
               <h3 className="text-2xl font-bold text-text-dark font-serif tracking-wide">
                 フィードバック・<br className="sm:hidden"/>応援の収集
               </h3>
             </div>
             
             {/* Visual Area (Card Style - No Dotted Border) */}
             <div className="h-72 relative mb-10 bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] w-full flex items-center justify-center overflow-hidden">
                
                {/* Glow behind center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Floating Bubbles */}
                {bubbles.map((bubble, i) => (
                   <motion.div 
                     key={i}
                     initial={{ y: 160, opacity: 0, scale: bubble.scale * 0.8 }}
                     animate={{ 
                       y: -160, 
                       opacity: [0, bubble.opacity, bubble.opacity, 0],
                     }}
                     transition={{ 
                       duration: bubble.duration, 
                       repeat: Infinity, 
                       ease: "linear",
                       delay: bubble.delay,
                     }}
                     style={{
                       left: bubble.left,
                       zIndex: bubble.blur ? 0 : 10,
                     }}
                     className={`absolute bg-white px-5 py-2.5 rounded-2xl rounded-bl-sm shadow-soft border border-gray-100 font-bold whitespace-nowrap flex items-center gap-2 ${bubble.blur ? 'blur-[1px] text-gray-400' : 'text-text-dark'}`}
                  >
                    <span className="text-xs md:text-sm">{bubble.text}</span>
                  </motion.div>
                ))}

                {/* Central Button */}
                <motion.div 
                   animate={{ scale: [1, 1.05, 1], boxShadow: ["0 10px 25px -5px rgba(200, 170, 65, 0.2)", "0 10px 35px -5px rgba(200, 170, 65, 0.4)", "0 10px 25px -5px rgba(200, 170, 65, 0.2)"] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                   className="relative z-20 bg-white px-8 py-4 rounded-full border border-gold/30 text-base font-bold text-gold flex items-center gap-3"
                >
                  <Heart size={20} className="fill-gold text-gold" />
                  感謝の可視化
                </motion.div>
             </div>

             {/* Description & List */}
             <div className="flex-grow">
               <p className="text-gray-600 text-sm leading-8 mb-8 font-medium">
                 お客様の「ありがとう」や「改善点」を可視化<br/>
                 こだわりが伝わっているか、何が評価されているかを確認できます
               </p>
               <ul className="space-y-4 pl-1">
                  {[
                    "評価ポイントと課題の発見",
                    "こだわりが伝わっているかの確認",
                    "感謝の可視化でモチベーションUP"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm font-bold text-text-dark/90">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
               </ul>
             </div>
          </FadeIn>

          {/* Connection Arrow (Desktop only) */}
           <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-gold items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg border border-gray-50">
            <ArrowRight size={28} />
          </div>

          {/* Card 2: Exit Strategy */}
          <FadeIn delay={0.2} className="flex-1 max-w-[580px] w-full bg-[#FAFAF7] rounded-[3rem] p-8 md:p-12 border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-lg transition-all duration-500">
             {/* Header */}
             <div className="flex items-center gap-5 mb-10">
               <div className="w-16 h-16 rounded-full bg-text-dark flex items-center justify-center text-white shrink-0 shadow-lg">
                 <Share2 size={30} strokeWidth={1.5} />
               </div>
               <h3 className="text-2xl font-bold text-text-dark font-serif tracking-wide">
                 声を広める出口
               </h3>
             </div>

             {/* Visual Area (Card Style - No Dotted Border) */}
             <div className="h-72 relative mb-10 bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] w-full flex items-center justify-center">
                
                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-20" viewBox="0 0 400 300">
                   <path d="M200 150 L100 220" stroke="#C8AA41" strokeWidth="2" strokeDasharray="5,5" />
                   <path d="M200 150 L300 220" stroke="#C8AA41" strokeWidth="2" strokeDasharray="5,5" />
                   <path d="M200 150 L200 80" stroke="#C8AA41" strokeWidth="2" strokeDasharray="5,5" />
                </svg>

                <div className="relative z-10 grid grid-cols-3 gap-8 items-center justify-center w-full max-w-[320px]">
                   
                   {/* Orbiting Icons */}
                   <motion.div 
                     animate={{ y: [0, -5, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                     className="col-span-3 flex justify-center mb-4"
                   >
                      <div className="flex flex-col items-center gap-3">
                         <div className="w-14 h-14 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center">
                           <MapPin className="text-blue-600" size={26} />
                         </div>
                         <span className="text-[10px] font-bold text-gray-400 tracking-wider">Google</span>
                      </div>
                   </motion.div>

                   <div className="col-span-3 flex justify-between px-4">
                      <motion.div 
                         animate={{ y: [0, 5, 0] }}
                         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                         className="flex flex-col items-center gap-3"
                      >
                         <div className="w-14 h-14 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center">
                           <Instagram className="text-pink-600" size={28} />
                         </div>
                         <span className="text-[10px] font-bold text-gray-400 tracking-wider">Instagram</span>
                      </motion.div>
                      
                      {/* Central Node */}
                      <div className="flex flex-col items-center gap-2 -mt-12">
                         <div className="w-20 h-20 bg-text-dark rounded-full shadow-2xl border-4 border-white flex items-center justify-center text-white relative z-20">
                            <Utensils size={32} strokeWidth={1.5} />
                         </div>
                         <span className="text-xs font-bold text-text-dark mt-2">お店</span>
                      </div>

                      <motion.div 
                         animate={{ y: [0, 5, 0] }}
                         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                         className="flex flex-col items-center gap-3"
                      >
                         <div className="w-14 h-14 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center">
                           <Smartphone className="text-green-500" size={26} />
                         </div>
                         <span className="text-[10px] font-bold text-gray-400 tracking-wider">LINE</span>
                      </motion.div>
                   </div>
                </div>
             </div>

             {/* Description & List */}
             <div className="flex-grow">
               <p className="text-gray-600 text-sm leading-8 mb-8 font-medium">
                 お店を気に入ったお客様が、自然と声を届けてくれる動線を用意します
               </p>
               <ul className="space-y-4 pl-1">
                  {[
                    "Google口コミ・SNSへの自然な誘導",
                    "声がお店の外へ広がっていく",
                    "店舗ごとにカスタム可能な出口設計"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm font-bold text-text-dark/90">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
               </ul>
             </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const Cases: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const cases = [
    {
      id: 1,
      image: "https://picsum.photos/600/400?random=20",
      title: "都内 ゴルフバー A店",
      desc: "月間200件の回答を獲得　お客様の声をもとにサービスを改善し、リピート率が向上",
      category: "ゴルフバー"
    },
    {
      id: 2,
      image: "https://picsum.photos/600/400?random=21",
      title: "都内 ベーカリー B店",
      desc: "月間40件の回答を獲得　新作パンへの感想をダイレクトに収集し、商品開発に活用",
      category: "ベーカリー"
    },
    {
      id: 3,
      image: "https://picsum.photos/600/400?random=22",
      title: "都内 美容室 C店",
      desc: "月間50件の回答を獲得　接客の質に対するフィードバックを可視化し、スタッフ教育に活用",
      category: "美容室"
    },
    {
      id: 4,
      image: "https://picsum.photos/600/400?random=23",
      title: "大阪 カフェ D店",
      desc: "お客様の感謝の声をスタッフに共有　モチベーション向上と離職率低下に貢献",
      category: "カフェ"
    },
    {
      id: 5,
      image: "https://picsum.photos/600/400?random=24",
      title: "福岡 イタリアン E店",
      desc: "Googleマップへの自然な誘導で、星4以上の口コミが増加　新規集客に繋がった",
      category: "イタリアン"
    }
  ];

  return (
    <section id="cases" className="py-24 bg-cream scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <FadeIn>
            <div className="text-left">
              <span className="text-gold font-serif font-bold tracking-widest text-sm block mb-2">CASES</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">
                導入事例
              </h2>
            </div>
          </FadeIn>
          
          <div className="hidden md:flex gap-3">
             <button 
               onClick={() => scroll('left')}
               className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white transition-all bg-white"
               aria-label="Previous"
             >
               <ChevronLeft size={20} />
             </button>
             <button 
               onClick={() => scroll('right')}
               className="w-12 h-12 rounded-full border border-gray-800 bg-text-dark text-white flex items-center justify-center hover:bg-gold hover:border-gold transition-all"
               aria-label="Next"
             >
               <ChevronRight size={20} />
             </button>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-8 snap-x -mx-6 px-6 md:mx-0 md:px-0 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cases.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="min-w-[85vw] md:min-w-[400px] lg:min-w-[32%] snap-start group cursor-pointer"
            >
              <div className="overflow-hidden rounded-xl mb-6 aspect-[16/9] relative shadow-md">
                 <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-widest text-text-dark uppercase shadow-sm">
                   {item.category}
                 </div>
              </div>
              <h3 className="text-xl font-serif font-bold text-text-dark mb-3 group-hover:text-gold transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-text-mid leading-relaxed line-clamp-2">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-4 md:hidden">
             <a href="#" className="text-gold font-bold text-xs tracking-widest border-b border-gold pb-1">すべて見る</a>
        </div>
      </div>
    </section>
  );
};

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-text-dark mb-4">利用料金</h2>
            <p className="text-gold text-xl md:text-2xl font-bold tracking-[0.2em]">
              初期費用なし
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
           {/* Monthly Plan */}
           <FadeIn delay={0.1} className="bg-offwhite p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
              <h3 className="text-center text-lg font-bold text-text-dark uppercase tracking-widest mb-6">月間契約</h3>
              <div className="flex items-baseline justify-center gap-1 mb-10 text-text-dark">
                 <span className="text-3xl font-bold">¥</span>
                 <span className="text-6xl font-serif font-bold tracking-tighter">3,980</span>
                 <span className="text-sm font-bold ml-2">/ 店舗 / 月</span>
              </div>

              <div className="space-y-5 mb-10 flex-grow text-left">
                 <div className="flex items-center gap-4">
                    <MessageSquare className="w-6 h-6 text-gold shrink-0" />
                    <span className="text-sm font-bold text-text-mid">チャットアンケート機能</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <PieChart className="w-6 h-6 text-gold shrink-0" />
                    <span className="text-sm font-bold text-text-mid">管理画面・分析ダッシュボード</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <QrCode className="w-6 h-6 text-gold shrink-0" />
                    <span className="text-sm font-bold text-text-mid">QRコード発行</span>
                 </div>
                 <div className="flex items-center gap-4">
                     <Headphones className="w-6 h-6 text-gold shrink-0" />
                     <span className="text-sm font-bold text-text-mid">設問・出口設計サポート</span>
                 </div>
                 <div className="flex items-center gap-4">
                     <Sparkles className="w-6 h-6 text-gold shrink-0" />
                     <span className="text-sm font-bold text-text-mid">継続的な改善提案</span>
                 </div>
              </div>

              <a
                href="#contact"
                className="flex items-center justify-center w-full py-4 bg-white border-2 border-gold text-gold font-bold tracking-widest rounded-full hover:bg-gold hover:text-white shadow-sm transition-all"
              >
                申し込む <ArrowRight className="w-4 h-4 ml-2" />
              </a>
           </FadeIn>

           {/* Annual Plan (Highlighted) */}
           <FadeIn delay={0.2} className="bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-gold relative shadow-gold transform md:-translate-y-4 flex flex-col">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-white text-xs font-bold px-6 py-2 rounded-full whitespace-nowrap shadow-md tracking-widest">
                 おすすめ
               </div>
               <h3 className="text-center text-lg font-bold text-gold uppercase tracking-widest mb-6">年間契約</h3>
               <div className="flex items-baseline justify-center gap-1 mb-2 text-text-dark">
                 <span className="text-3xl font-bold">¥</span>
                 <span className="text-7xl font-serif font-bold tracking-tighter">2,980</span>
                 <span className="text-sm font-bold ml-2">/ 店舗 / 月</span>
              </div>
              <div className="mb-10"></div>

              <div className="space-y-5 mb-10 flex-grow text-left">
                 <div className="flex items-center gap-4">
                    <MessageSquare className="w-6 h-6 text-gold shrink-0" />
                    <span className="text-sm font-bold text-text-mid">チャットアンケート機能</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <PieChart className="w-6 h-6 text-gold shrink-0" />
                    <span className="text-sm font-bold text-text-mid">管理画面・分析ダッシュボード</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <QrCode className="w-6 h-6 text-gold shrink-0" />
                    <span className="text-sm font-bold text-text-mid">QRコード発行</span>
                 </div>
                 <div className="flex items-center gap-4">
                     <Headphones className="w-6 h-6 text-gold shrink-0" />
                     <span className="text-sm font-bold text-text-mid">設問・出口設計サポート</span>
                 </div>
                 <div className="flex items-center gap-4">
                     <Sparkles className="w-6 h-6 text-gold shrink-0" />
                     <span className="text-sm font-bold text-text-mid">継続的な改善提案</span>
                 </div>
              </div>

               <a
                 href="#contact"
                 className="flex items-center justify-center w-full py-4 bg-gold text-white font-bold tracking-widest rounded-full hover:bg-gold-dark shadow-lg transition-all"
               >
                 申し込む <ArrowRight className="w-4 h-4 ml-2" />
               </a>
           </FadeIn>
        </div>
        
        <p className="mt-12 text-xs text-text-light font-medium">※ 表示価格は税抜きです　初期費用はかかりません　いつでも解約可能です</p>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-text-dark text-white py-16 text-center">
    <div className="max-w-7xl mx-auto px-6">
      <div className="font-serif tracking-widest text-gold text-xl mb-6">DINING AMENITY</div>
      <div className="flex justify-center gap-8 text-sm font-medium text-gray-400 mb-8">
        <a href="#" className="hover:text-gold transition-colors">会社概要</a>
        <a href="#" className="hover:text-gold transition-colors">プライバシーポリシー</a>
        <a href="#" className="hover:text-gold transition-colors">特定商取引法に基づく表記</a>
      </div>
      <p className="text-gray-600 text-xs font-medium">© 2026 Dining Amenity Co., Ltd. All rights reserved.</p>
    </div>
  </footer>
);

// --- Main App ---

const App: React.FC = () => {
  return (
    <div className="font-sans antialiased text-text-dark bg-white">
      <Header />
      <main>
        <Hero />
        <Problem />
        <FeatureChat />
        <FeatureAnalysis />
        <FeatureExit />
        <SupportFlow />
        <VoicePower />
        <Cases />
        <Pricing />
        
        {/* Contact/Closing Section */}
        <section id="contact" className="py-24 bg-gold text-center scroll-mt-24">
          <div className="max-w-4xl mx-auto px-6">
            <FadeIn>
              <Pill color="white">お問い合わせ</Pill>
              <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-8 leading-tight">
                どんな声を集めたいか<br />一緒に考えましょう
              </h2>
              <p className="text-white/90 mb-12 leading-loose text-lg font-light">
                お店の方向性や課題をお聞かせください<br />
                最適な設問設計を無料でご提案します
              </p>
              <a 
                 href="#" 
                 className="inline-flex items-center gap-2 px-12 py-5 bg-white text-gold rounded-full font-bold tracking-widest shadow-2xl hover:shadow-xl hover:-translate-y-1 transition-all text-base"
              >
                無料相談を申し込む <MessageSquareMore size={20} />
              </a>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
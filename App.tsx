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
  Utensils
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
    { id: 2, type: 'bot', text: 'まずはお客様のことを教えてください。\n選択肢からお選びください。' }
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
          text: '口コミの投稿にもご協力いただけますと幸いです。\n一言でも大歓迎です💌' 
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
                コーヒーが美味しく、料理やスイーツも大変良かったです。お店の雰囲気もとても心地よく、また来たいと思いました。
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
          text: 'ご質問は以上となります。ご協力ありがとうございました☺️'
        }
      ]);
    }
  };

  const resetChat = () => {
    setMessages([
      { id: 1, type: 'bot', text: '本日はご来店誠にありがとうございます😊\n早速ですがいくつか質問させてください💌' },
      { id: 2, type: 'bot', text: 'まずはお客様のことを教えてください。\n選択肢からお選びください。' }
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

const LaptopMockup: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = "" }) => (
  <div className={`relative rounded-xl shadow-2xl bg-gray-800 border-4 border-gray-800 overflow-hidden ${className}`}>
     {/* Screen Frame */}
    <div className="bg-white w-full h-full rounded-lg overflow-hidden flex flex-col">
       {/* Browser Bar */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex gap-2 items-center">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 bg-white rounded-md h-5 mx-4 shadow-sm border border-gray-200"></div>
      </div>
      <img src={src} alt={alt} className="w-full h-auto block flex-1 object-cover object-top" />
    </div>
  </div>
);

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

const Header: React.FC = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-gold text-white border-b border-white/10 transition-colors duration-300">
    <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
      {/* Logo Area */}
      <div className="flex items-center gap-2 md:gap-3">
        <div className="font-serif tracking-widest text-white font-bold text-xl md:text-2xl">DINING AMENITY</div>
      </div>

      {/* Desktop Nav / CTA */}
      <div className="flex items-center gap-3 md:gap-6">
        <a 
          href="#start" 
          className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/40 hover:bg-white hover:text-gold transition-all font-medium text-sm tracking-widest"
        >
          無料で作成 <ArrowRight size={16} />
        </a>
        <button className="p-2 rounded-full border border-white/30 hover:bg-white/10 transition-colors">
          <Menu className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  </header>
);

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gold min-h-screen flex items-center justify-center overflow-hidden py-32">
      {/* Decorative Background - Enhanced visibility with layering */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        
        {/* Base Texture - Subtle noise or pattern could go here, but using a very faint image for texture */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop" 
            alt="Texture" 
            className="w-full h-full object-cover grayscale opacity-10 mix-blend-multiply" 
          />
        </div>

        {/* Feature Image - Positioned to the right, fading into gold */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.25, x: 0 }} // Increased opacity for better visibility
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 right-0 w-[100%] md:w-[65%] h-full z-0"
        >
          {/* Gradient Mask to blend image into gold background from left to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold/50 to-transparent z-10"></div>
          {/* Color overlay to tint the image gold */}
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
            顧客評価で店舗改善を促進する
          </h2>
          
          <h1 className="text-white font-serif font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-tight tracking-tight mb-8 drop-shadow-md">
            声にならない声を<br />
            お店の力に変える
          </h1>
          
          <p className="text-white/95 text-sm md:text-base lg:text-lg leading-relaxed mb-12 max-w-2xl mx-auto font-light drop-shadow-sm">
            チャット形式のアンケートで、お客様の本音を気軽に収集。<br className="hidden md:block"/>
            自動集計・AI分析で、改善アクションまでを最短距離で。<br className="hidden md:block"/>
            長く愛され続ける店舗づくりをサポートします。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <a 
                href="#contact"
                className="w-full sm:w-auto px-10 py-4 bg-white text-gold rounded-full font-bold tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
             >
               導入のご相談 <ArrowRight size={16} />
             </a>
             <a 
               href="#demo" 
               className="w-full sm:w-auto px-10 py-4 border border-white text-white rounded-full font-bold tracking-widest hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
             >
               デモを体験 <Smartphone size={20} />
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
      desc: "口コミサイトに書くのはごく一部。大多数の「サイレントカスタマー」の声はお店に届きません。"
    },
    {
      icon: <HelpCircle className="w-8 h-8 text-gold" />,
      title: "こだわりが伝わっているか不明",
      desc: "お店のコンセプトや新メニュー。お客様にどう評価されているのか、判断材料が不足しています。"
    },
    {
      icon: <FileText className="w-8 h-8 text-gold" />,
      title: "声を聞く仕組みがない",
      desc: "紙のアンケートは集計が大変。忙しい営業の中で、手軽に声を拾う仕組みが必要です。"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <Pill>解決すべき課題</Pill>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark mb-6">お客様の声、<br className="md:hidden"/>本当に届いていますか？</h2>
            <p className="text-text-mid leading-loose">「美味しかった」「また来たい」——そう感じても<br className="hidden md:block"/>何も言わずに帰るお客様がほとんどです。</p>
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
    <section id="features" className="py-24 bg-cream overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="md:w-1/2 order-2 md:order-1 flex justify-center">
            <FadeIn>
               {/* Use the interactive ChatDemo inside PhoneMockup */}
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
              <p className="text-gold font-serif font-bold tracking-wider mb-2">チャット形式アンケート</p>
              <h2 className="text-3xl md:text-5xl font-serif font-medium text-text-dark mb-8 leading-tight">
                会話するように<br />サクッと回答
              </h2>
              <p className="text-text-mid leading-loose mb-8">
                堅苦しいフォームは回答率を下げます。<br />
                LINEのようなチャット形式で、お客様の負担を最小限に。<br />
                直感的なUIで、高齢の方でも迷わず操作できます。
              </p>
              <div className="flex flex-col gap-4 text-sm text-text-dark font-medium">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>QRコードを読み取るだけ、アプリ不要</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>設問は自由にカスタマイズ可能</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>回答率は従来の紙アンケートの約3倍</span>
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
      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <FadeIn>
            <Pill color="white">特徴 ②</Pill>
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6">
              集計・分析は自動<br />作業負担ゼロ
            </h2>
            <p className="text-white/90 leading-loose font-light">
              回答はリアルタイムで管理画面に反映。<br />
              感情分析やキーワード抽出で、改善のヒントを自動で可視化します。
            </p>
          </FadeIn>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 text-white mb-16">
          <FadeIn delay={0.2} className="text-center">
            <div className="font-serif text-6xl md:text-7xl font-bold mb-2 tracking-tighter">233</div>
            <div className="text-sm font-bold opacity-80 bg-white/10 px-6 py-1 rounded-full inline-block tracking-widest">回答数 / 月</div>
          </FadeIn>
          <div className="w-px h-24 bg-white/30 hidden md:block"></div>
          <FadeIn delay={0.3} className="text-center">
            <div className="font-serif text-6xl md:text-7xl font-bold mb-2 tracking-tighter">4.8</div>
            <div className="text-sm font-bold opacity-80 bg-white/10 px-6 py-1 rounded-full inline-block tracking-widest">平均満足度</div>
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
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24">
          <div className="md:w-1/2">
             {/* Creating a visual representation of exit flow */}
            <FadeIn>
              <div className="relative bg-offwhite p-8 md:p-12 rounded-[2.5rem] border border-gray-100">
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-700">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-base text-text-dark">高評価のお客様</p>
                      <p className="text-xs text-text-light font-medium mt-0.5">Google Map / 食べログへ誘導</p>
                    </div>
                    <ArrowRight className="ml-auto text-gray-300 w-5 h-5" />
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-700">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-base text-text-dark">すべてのお客様</p>
                      <p className="text-xs text-text-light font-medium mt-0.5">公式LINE / Instagramへ誘導</p>
                    </div>
                    <ArrowRight className="ml-auto text-gray-300 w-5 h-5" />
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-700">
                      <MousePointerClick size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-base text-text-dark">例文コピー機能</p>
                      <p className="text-xs text-text-light font-medium mt-0.5">投稿ハードルを下げる支援</p>
                    </div>
                    <ArrowRight className="ml-auto text-gray-300 w-5 h-5" />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <FadeIn delay={0.2}>
              <Pill>特徴 ③</Pill>
              <p className="text-gold font-serif font-bold tracking-wider mb-2">出口設計</p>
              <h2 className="text-3xl md:text-5xl font-serif font-medium text-text-dark mb-8 leading-tight">
                回答後の導線も<br />自由に設計
              </h2>
              <p className="text-text-mid leading-loose mb-8">
                アンケート回答後が、お客様と繋がる最大のチャンス。<br />
                良い評価をしてくれたお客様をGoogle口コミへ誘導したり、
                LINE公式アカウントの登録を促したり。<br />
                お店の目的に合わせた「出口」を用意できます。
              </p>
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
      desc: "お店の課題と方向性を確認",
      sub: "オンライン / 対面"
    },
    { 
      num: "02", 
      title: "設問設計", 
      icon: <PenTool strokeWidth={1.5} size={48} />, 
      desc: "最適な質問内容をご提案",
      sub: "約1週間"
    },
    { 
      num: "03", 
      title: "出口設計", 
      icon: <Share2 strokeWidth={1.5} size={48} />, 
      desc: "口コミ・SNSへの導線確保",
      sub: "Googleマップ / LINE連携"
    },
    { 
      num: "04", 
      title: "報酬設計", 
      icon: <Gift strokeWidth={1.5} size={48} />, 
      desc: "クーポン等の特典を検討",
      sub: "再来店施策"
    },
    { 
      num: "05", 
      title: "運用開始", 
      icon: <Smartphone strokeWidth={1.5} size={48} />, 
      desc: "QRコード設置スタート",
      sub: "POP作成支援あり"
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
                {/* Step Item */}
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

                {/* Separator */}
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
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <Pill>提供価値</Pill>
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-text-dark mb-4">
              集まった声が、<br className="md:hidden" />お店を動かす。
            </h2>
            <p className="text-text-mid">収集から拡散まで、一気通貫。</p>
          </FadeIn>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-stretch relative">
           {/* Center Arrow */}
           <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-gold items-center justify-center w-12 h-12 bg-white rounded-full shadow-md border border-gold/20">
            <ArrowRight size={24} />
          </div>

          {/* LEFT CARD */}
          <FadeIn className="flex-1 bg-offwhite rounded-[2rem] p-8 md:p-10 border border-gray-100 flex flex-col relative overflow-hidden group">
             {/* Header */}
             <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                 <MessageCircle size={24} />
               </div>
               <h3 className="text-xl font-bold text-text-dark font-serif tracking-wide">フィードバック・応援の収集</h3>
             </div>
             
             {/* Visual Area (Fixed Height) */}
             <div className="h-48 relative mb-8 bg-white/50 rounded-2xl border border-dashed border-gray-200 w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 to-transparent opacity-50"></div>
                
                {/* Animated Bubbles */}
                <motion.div 
                   animate={{ y: [20, -10, 20], opacity: [0.5, 1, 0.5] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-8 left-8 bg-white px-4 py-2 rounded-2xl rounded-bl-sm shadow-sm text-xs font-bold text-text-dark border border-gray-100"
                >
                  美味しかった！
                </motion.div>
                 <motion.div 
                   animate={{ y: [0, -15, 0], opacity: [0.6, 1, 0.6] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="absolute bottom-10 right-10 bg-white px-4 py-2 rounded-2xl rounded-br-sm shadow-sm text-xs font-bold text-text-dark border border-gray-100"
                >
                  ありがとう
                </motion.div>
                <motion.div 
                   animate={{ scale: [0.9, 1, 0.9] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                   className="relative z-10 bg-white px-6 py-3 rounded-full shadow-gold border border-gold/20 text-sm font-bold text-gold flex items-center gap-2"
                >
                  <Heart size={16} className="fill-gold text-gold" />
                  感謝の可視化
                </motion.div>
             </div>

             {/* Description */}
             <div className="flex-grow">
               <p className="text-text-mid text-sm leading-loose mb-6">
                 お客様の「ありがとう」や「改善点」を可視化。<br/>
                 こだわりが伝わっているか、何が評価されているかを確認できます。
               </p>
               <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm font-medium text-text-dark">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0"></div>
                    <span>評価ポイントと課題の発見</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-medium text-text-dark">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0"></div>
                    <span>こだわりが伝わっているかの確認</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-medium text-text-dark">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0"></div>
                    <span>感謝の可視化でモチベーションUP</span>
                  </li>
               </ul>
             </div>
          </FadeIn>

          {/* RIGHT CARD */}
          <FadeIn delay={0.2} className="flex-1 bg-offwhite rounded-[2rem] p-8 md:p-10 border border-gray-100 flex flex-col relative overflow-hidden group">
             {/* Header */}
             <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 rounded-full bg-text-dark flex items-center justify-center text-white shrink-0">
                 <Share2 size={24} />
               </div>
               <h3 className="text-xl font-bold text-text-dark font-serif tracking-wide">声を広める出口</h3>
             </div>

             {/* Visual Area */}
             <div className="h-48 relative mb-8 bg-white/50 rounded-2xl border border-dashed border-gray-200 w-full flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-200/20 to-transparent opacity-50"></div>
                
                {/* Icons */}
                <div className="flex gap-4 items-center justify-center">
                   <div className="flex flex-col items-center gap-2">
                     <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                       <MapPin className="text-blue-600" size={24} />
                     </div>
                     <span className="text-[10px] font-bold text-text-light tracking-wider">Google</span>
                   </div>
                    <div className="flex flex-col items-center gap-2 -mt-4">
                     <div className="w-14 h-14 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center relative z-10">
                       <Instagram className="text-pink-600" size={28} />
                     </div>
                     <span className="text-[10px] font-bold text-text-light tracking-wider">SNS</span>
                   </div>
                    <div className="flex flex-col items-center gap-2">
                     <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                       <Smartphone className="text-green-500" size={24} />
                     </div>
                     <span className="text-[10px] font-bold text-text-light tracking-wider">LINE</span>
                   </div>
                </div>
             </div>

             {/* Description */}
             <div className="flex-grow">
               <p className="text-text-mid text-sm leading-loose mb-6">
                 「良かった」で終わらせない。<br/>
                 満足度の高いお客様を、自然な流れで口コミ投稿やSNSシェア、LINE登録へ誘導します。
               </p>
               <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm font-medium text-text-dark">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0"></div>
                    <span>Google口コミ・SNSへの自然な誘導</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-medium text-text-dark">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0"></div>
                    <span>声がお店の外へ広がっていく</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-medium text-text-dark">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0"></div>
                    <span>店舗ごとにカスタム可能な出口設計</span>
                  </li>
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
      title: "銀座 高級鮨店",
      desc: "インバウンド需要に対応し、多言語アンケートで評価獲得。客単価が15%向上。",
      category: "寿司・和食"
    },
    {
      id: 2,
      image: "https://picsum.photos/600/400?random=21",
      title: "六本木 フレンチレストラン",
      desc: "記念日利用の満足度を可視化。感動体験の共有で新規予約が倍増。",
      category: "フレンチ"
    },
    {
      id: 3,
      image: "https://picsum.photos/600/400?random=22",
      title: "京都 老舗料亭",
      desc: "伝統を守りながら顧客の声を取り入れ、若年層の取り込みに成功。",
      category: "懐石料理"
    },
    {
      id: 4,
      image: "https://picsum.photos/600/400?random=23",
      title: "表参道 オーガニックカフェ",
      desc: "スタッフへの「ありがとう」を可視化し、定着率が大幅に改善。",
      category: "カフェ"
    },
    {
      id: 5,
      image: "https://picsum.photos/600/400?random=24",
      title: "大阪 創作イタリアン",
      desc: "季節メニューのABテストをアンケートで実施。廃棄率を削減。",
      category: "イタリアン"
    }
  ];

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with Title and Navigation */}
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
        
        {/* Scrollable Container */}
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
        
        {/* Mobile View All */}
        <div className="text-center mt-4 md:hidden">
             <a href="#" className="text-gold font-bold text-xs tracking-widest border-b border-gold pb-1">すべて見る</a>
        </div>
      </div>
    </section>
  );
};

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <Pill>利用料金</Pill>
          <p className="text-gold font-bold mb-4 tracking-widest text-xs">初期費用なし</p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
           {/* Monthly Plan */}
           <FadeIn delay={0.1} className="bg-offwhite p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
              <h3 className="text-center text-lg font-bold text-text-dark uppercase tracking-widest mb-6">Monthly</h3>
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
               <h3 className="text-center text-lg font-bold text-gold uppercase tracking-widest mb-6">Annual</h3>
               <div className="flex items-baseline justify-center gap-1 mb-2 text-text-dark">
                 <span className="text-3xl font-bold">¥</span>
                 <span className="text-7xl font-serif font-bold tracking-tighter">2,980</span>
                 <span className="text-sm font-bold ml-2">/ 店舗 / 月</span>
              </div>
              <p className="text-center text-xs text-text-light font-bold mb-10">（年間契約）</p>

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
        
        <p className="mt-12 text-xs text-text-light font-medium">※ 表示価格は税抜きです。初期費用はかかりません。いつでも解約可能です。</p>
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
        <section id="contact" className="py-24 bg-gold text-center">
          <div className="max-w-4xl mx-auto px-6">
            <FadeIn>
              <Pill color="white">お問い合わせ</Pill>
              <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-8 leading-tight">
                どんな声を集めたいか<br />一緒に考えましょう
              </h2>
              <p className="text-white/90 mb-12 leading-loose text-lg font-light">
                お店の方向性や課題をお聞かせください。<br />
                最適な設問設計を無料でご提案します。
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
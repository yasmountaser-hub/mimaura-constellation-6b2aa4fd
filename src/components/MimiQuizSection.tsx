import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RotateCcw, Heart, Moon, Sun, Zap, Flower2, Crown, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import mimiWarrior from "@/assets/mimi-warrior-new.png";
import mimiFairy from "@/assets/mimi-fairy-new.png";
import mimiAngel from "@/assets/mimi-angel-new.png";
import mimiMystic from "@/assets/mimi-mystic-new.png";
import mimiBoss from "@/assets/mimi-boss.png";
import mimiGamer from "@/assets/mimi-gamer.png";

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    text: string;
    emoji: string;
    type: MimiType;
  }[];
}

type MimiType = "warrior" | "fairy" | "angel" | "mystic" | "boss" | "gamer";

interface MimiResult {
  type: MimiType;
  name: string;
  title: string;
  description: string;
  cycleVibe: string;
  color: string;
  bgGradient: string;
  icon: React.ReactNode;
  image: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "When your energy dips, what's your go-to move? 💭",
    subtitle: "We all have those days... ✨",
    options: [
      { text: "Push through it—I've got things to do!", emoji: "💪", type: "warrior" },
      { text: "Light candles and create a cozy sanctuary", emoji: "✨", type: "fairy" },
      { text: "Comfort food and taking care of myself", emoji: "🥰", type: "angel" },
      { text: "Journal and reflect on what my body needs", emoji: "🌙", type: "mystic" },
    ],
  },
  {
    id: 2,
    question: "Your ideal way to spend a slow weekend? 🌸",
    subtitle: "Self-care Saturday vibes 💆‍♀️",
    options: [
      { text: "Tackling my to-do list and feeling productive", emoji: "📋", type: "boss" },
      { text: "Creating something—art, crafts, or recipes", emoji: "🎨", type: "fairy" },
      { text: "Cuddling with loved ones or pets", emoji: "💕", type: "angel" },
      { text: "Gaming, streaming, or exploring new worlds", emoji: "🎮", type: "gamer" },
    ],
  },
  {
    id: 3,
    question: "When you're feeling emotionally sensitive, you... 🦋",
    subtitle: "Those heightened feelings 💫",
    options: [
      { text: "Channel it into motivation", emoji: "🔥", type: "warrior" },
      { text: "Express it through creativity", emoji: "🌈", type: "fairy" },
      { text: "Seek comfort and connection", emoji: "🤗", type: "angel" },
      { text: "Embrace it as meaningful wisdom", emoji: "🔮", type: "mystic" },
    ],
  },
  {
    id: 4,
    question: "Your ideal tracker would focus on... 📱",
    subtitle: "What matters most to you 💜",
    options: [
      { text: "Goals, workouts, and peak performance days", emoji: "⚡", type: "warrior" },
      { text: "Mood patterns and creative energy flows", emoji: "🦋", type: "fairy" },
      { text: "Achievements, streaks, and leveling up", emoji: "🏆", type: "gamer" },
      { text: "Scheduling, planning, and staying in control", emoji: "📊", type: "boss" },
    ],
  },
  {
    id: 5,
    question: "When cravings hit, what speaks to you? 🍫",
    subtitle: "Everyone has their thing... 🥐",
    options: [
      { text: "Something energizing—I need fuel!", emoji: "🍌", type: "warrior" },
      { text: "Something sweet and a little indulgent", emoji: "🧁", type: "fairy" },
      { text: "Warm comfort food that feels like a hug", emoji: "🍜", type: "angel" },
      { text: "Whatever feels intuitively right", emoji: "🫖", type: "mystic" },
    ],
  },
  {
    id: 6,
    question: "How do you handle a tough Monday? 🌀",
    subtitle: "The start of the week energy 💫",
    options: [
      { text: "Power playlist and conquer the day", emoji: "👑", type: "boss" },
      { text: "Take it slow with self-compassion", emoji: "💗", type: "angel" },
      { text: "Deep insights and body-mind connections", emoji: "🌙", type: "mystic" },
      { text: "Reward myself with something fun later", emoji: "🎮", type: "gamer" },
    ],
  },
];

const mimiResults: Record<MimiType, MimiResult> = {
  warrior: {
    type: "warrior",
    name: "Warrior Mimi",
    title: "The Unstoppable Force ⚔️",
    description: "You tackle every phase of your cycle like a champion! Even on low-energy days, you find ways to stay active and productive. Your determination is inspiring, but remember—rest is part of the journey too. 💪✨",
    cycleVibe: "You thrive during your follicular and ovulation phases when energy peaks. Learn to work WITH your cycle for even more power! 🌟",
    color: "from-rose-400 to-orange-400",
    bgGradient: "bg-gradient-to-br from-rose-500/20 to-orange-500/20",
    icon: <Zap className="w-5 h-5" />,
    image: mimiWarrior,
  },
  fairy: {
    type: "fairy",
    name: "Fairy Mimi",
    title: "The Creative Dreamer 🧚‍♀️",
    description: "You're in tune with the magic of your cycle! Creative and expressive, you flow with your emotions and turn them into beautiful things. Your sensitivity is your superpower. ✨🎨",
    cycleVibe: "Your creative peaks often align with ovulation, while your luteal phase brings deeper, more introspective art. Embrace all your creative moods! 🌈",
    color: "from-pink-400 to-purple-400",
    bgGradient: "bg-gradient-to-br from-pink-500/20 to-purple-500/20",
    icon: <Flower2 className="w-5 h-5" />,
    image: mimiFairy,
  },
  angel: {
    type: "angel",
    name: "Angel Mimi",
    title: "The Gentle Nurturer 😇",
    description: "You lead with compassion—for yourself and others! You understand that being kind to your body through every phase is the ultimate form of self-love. Your warmth makes everyone feel safe. 💕🌸",
    cycleVibe: "You naturally slow down during your menstrual phase and bloom during your follicular phase. Your body wisdom is already strong! 🌷",
    color: "from-amber-300 to-yellow-400",
    bgGradient: "bg-gradient-to-br from-amber-500/20 to-yellow-500/20",
    icon: <Heart className="w-5 h-5" />,
    image: mimiAngel,
  },
  mystic: {
    type: "mystic",
    name: "Mystic Mimi",
    title: "The Intuitive Oracle 🔮",
    description: "You're deeply connected to your inner wisdom! You see your cycle as a source of insight and power. Your reflective nature helps you understand patterns others might miss. 🌙✨",
    cycleVibe: "Your luteal phase brings powerful intuition, while menstruation offers deep clarity. You're already unlocking your cycle's secrets! 🌟",
    color: "from-indigo-400 to-violet-500",
    bgGradient: "bg-gradient-to-br from-indigo-500/20 to-violet-500/20",
    icon: <Moon className="w-5 h-5" />,
    image: mimiMystic,
  },
  boss: {
    type: "boss",
    name: "Boss Mimi",
    title: "The Power Player 👑",
    description: "You're a natural leader who takes charge of every situation—including your cycle! Strategic, organized, and always one step ahead. You turn challenges into opportunities and lead with confidence. 💼✨",
    cycleVibe: "Your ovulation phase is when you're most persuasive and powerful. Use your luteal phase for strategic planning and big-picture thinking! 📈",
    color: "from-slate-600 to-purple-600",
    bgGradient: "bg-gradient-to-br from-slate-500/20 to-purple-500/20",
    icon: <Crown className="w-5 h-5" />,
    image: mimiBoss,
  },
  gamer: {
    type: "gamer",
    name: "Gamer Mimi",
    title: "The Level-Up Legend 🎮",
    description: "Life is your game and you're here to win! You approach your cycle like quests—each phase unlocks new abilities. You love tracking progress, earning streaks, and celebrating every achievement. 🕹️✨",
    cycleVibe: "Your follicular phase is your power-up mode—max energy and focus! Your menstrual phase is your save point for rest and recovery. 🏆",
    color: "from-cyan-400 to-pink-500",
    bgGradient: "bg-gradient-to-br from-cyan-500/20 to-pink-500/20",
    icon: <Gamepad2 className="w-5 h-5" />,
    image: mimiGamer,
  },
};

const MimiQuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<MimiType[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswer = (type: MimiType) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = (): MimiResult => {
    const counts: Record<MimiType, number> = {
      warrior: 0,
      fairy: 0,
      angel: 0,
      mystic: 0,
      boss: 0,
      gamer: 0,
    };

    answers.forEach((answer) => {
      counts[answer]++;
    });

    const maxType = Object.entries(counts).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0] as MimiType;

    return mimiResults[maxType];
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setQuizStarted(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100;

  const allTypes = [
    { name: "Warrior", color: "from-rose-400 to-orange-400", image: mimiWarrior },
    { name: "Fairy", color: "from-pink-400 to-purple-400", image: mimiFairy },
    { name: "Angel", color: "from-amber-300 to-yellow-400", image: mimiAngel },
    { name: "Mystic", color: "from-indigo-400 to-violet-500", image: mimiMystic },
    { name: "Boss", color: "from-slate-600 to-purple-600", image: mimiBoss },
    { name: "Gamer", color: "from-cyan-400 to-pink-500", image: mimiGamer },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!quizStarted ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Personality Quiz</span>
                </motion.div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  What <span className="text-primary">Mimi</span> Are You?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Discover which Mimi personality matches your cycle style! Answer 6 quick questions to find your perfect companion match.
                </p>

                {/* Preview of all 6 Mimi types */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 mb-10">
                  {allTypes.map((type, index) => (
                    <motion.div
                      key={type.name}
                      className="p-3 rounded-2xl bg-card/50 border border-border/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden">
                        <img src={type.image} alt={`${type.name} Mimi`} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs font-medium">{type.name}</p>
                    </motion.div>
                  ))}
                </div>

                <Button size="lg" onClick={startQuiz} className="gap-2">
                  Start the Quiz
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            ) : showResult ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center"
              >
                {(() => {
                  const result = getResult();
                  return (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="mb-8"
                      >
                        <div className={`w-44 h-44 mx-auto rounded-full bg-gradient-to-r ${result.color} p-1 mb-6`}>
                          <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                            <img
                              src={result.image}
                              alt={result.name}
                              className="w-40 h-40 object-cover rounded-full"
                            />
                          </div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <p className="text-sm text-muted-foreground mb-2">You are...</p>
                          <h2
                            className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${result.color} bg-clip-text`}
                            style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                          >
                            {result.name}
                          </h2>
                          <p className="text-lg text-primary font-medium mb-6">{result.title}</p>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className={`${result.bgGradient} rounded-3xl p-8 mb-8 text-left`}
                      >
                        <p className="text-foreground mb-6">{result.description}</p>
                        <div className="p-4 bg-background/50 rounded-xl">
                          <p className="text-sm font-medium text-primary mb-1">🌙 Your Cycle Superpower</p>
                          <p className="text-sm text-muted-foreground">{result.cycleVibe}</p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                      >
                        <Button variant="outline" onClick={resetQuiz} className="gap-2">
                          <RotateCcw className="w-4 h-4" />
                          Take Again
                        </Button>
                        <Button className="gap-2">
                          <Sparkles className="w-4 h-4" />
                          Join Waitlist with {result.name}
                        </Button>
                      </motion.div>
                    </>
                  );
                })()}
              </motion.div>
            ) : (
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      initial={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="text-center mb-8">
                  <p className="text-sm text-primary mb-2">{questions[currentQuestion].subtitle}</p>
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {questions[currentQuestion].question}
                  </h3>
                </div>

                {/* Options */}
                <div className="grid gap-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswer(option.type)}
                      className="w-full p-5 rounded-2xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{option.emoji}</span>
                        <span className="text-lg font-medium group-hover:text-primary transition-colors">
                          {option.text}
                        </span>
                        <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
    </section>
  );
};

export default MimiQuizSection;

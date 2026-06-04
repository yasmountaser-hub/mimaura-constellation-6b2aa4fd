export interface Article {
  slug: string;
  title: string;
  category: string;
  emoji: string;
  readTime: string;
  summary: string;
  comingSoon?: boolean;
  content: string; // markdown-ish; rendered as paragraphs + headings
}

export const articles: Article[] = [
  {
    slug: "adhd-luteal-phase",
    title: "Why Your ADHD Feels Worse Before Your Period",
    category: "ADHD & Neurodiversity",
    emoji: "🧠",
    readTime: "5 min",
    summary:
      "Estrogen drops affect dopamine levels — here's the science behind why focus crashes in your luteal phase and what you can do about it.",
    content: `
## The estrogen–dopamine bridge

Estrogen doesn't just regulate your cycle — it boosts dopamine, the same neurotransmitter ADHD brains run low on. When estrogen peaks in your follicular phase, focus, motivation and working memory often feel sharper. When it nosedives in the late luteal phase (the week before your period), so does dopamine availability.

For ADHDers this isn't a "bad week" — it's a neurochemical shift you can actually plan around.

## What you might notice

- Stimulant meds feel weaker or wear off faster
- Tasks you breezed through last week feel impossible
- Emotional regulation drops (rejection sensitivity flares)
- Sleep gets choppier; mornings feel heavier

## Strategies that actually help

**Front-load the month.** Schedule deep work, big decisions and social commitments in your follicular and ovulatory weeks. Treat your luteal week as admin + maintenance time.

**Talk to your prescriber.** Some ADHDers benefit from a small luteal-phase dose adjustment. This is a real, researched conversation — bring your tracked data.

**Protect your basics.** Protein at breakfast, magnesium glycinate in the evening, earlier bedtime, lower-stim plans. None of these "fix" the dip; they soften the landing.

**Externalize everything.** Lists, alarms, visual timers. When working memory tanks, scaffolding wins.

## The bigger picture

You're not lazy, inconsistent or broken. You're cyclical — and once you can see the pattern, you stop fighting yourself. That's the whole point of tracking with Mimi.
`,
  },
  {
    slug: "cycle-phases-explained",
    title: "The 4 Cycle Phases Explained (Without the Medical Jargon)",
    category: "Cycles & Hormones",
    emoji: "🌙",
    readTime: "7 min",
    summary:
      "A beginner-friendly, neurodivergent-accessible guide to understanding menstrual, follicular, ovulatory, and luteal phases.",
    content: `
Your cycle isn't a single event — it's four mini-seasons inside every month. Here's the version no one taught you in school.

## 1. Menstrual phase (your period, ~days 1–5)

Hormones are at their lowest. Energy is usually lower too. This is your inward season — rest is not optional, it's biologically appropriate. Cravings for warmth, quiet and carbs are normal.

## 2. Follicular phase (~days 6–13)

Estrogen rises. Mood lifts. New ideas land easily. This is often the best window for starting projects, learning, exercising harder, and being social. Many ADHDers describe this as "feeling like a real person again."

## 3. Ovulatory phase (~days 14–16)

Estrogen peaks, testosterone spikes briefly. Communication, confidence and libido tend to be at their highest. Great for presentations, hard conversations, dates, performance.

## 4. Luteal phase (~days 17–28)

Progesterone rises, then both hormones crash before your period. The first half can feel grounded and productive (good for finishing things). The second half — the famous PMS week — is when sensitivity, fatigue, and ADHD/PMDD symptoms peak.

## Why this matters

Once you can name the phase, you can stop blaming yourself for being "inconsistent." You're not. You're predictable in a way the world just hasn't been built around.
`,
  },
  {
    slug: "sensory-overload-cycle",
    title: "Sensory Overload & Your Cycle: The Connection Nobody Talks About",
    category: "ADHD & Neurodiversity",
    emoji: "🧠",
    readTime: "6 min",
    summary:
      "Your sensory sensitivity can fluctuate with your hormones. Learn to anticipate and prepare for high-sensitivity days.",
    content: `
## The link

Sensory thresholds aren't fixed. Estrogen and progesterone both modulate how your nervous system processes sound, light, touch and temperature. For autistic and ADHD folks, that means a tag that didn't bother you in week two can feel unbearable in week four.

## Common patterns

- **Late luteal:** noise tolerance plummets, lights feel too bright, social energy collapses
- **Ovulation:** some people feel almost "neurotypical-passing" — others get overstimulated by everything
- **Menstrual:** craving deep pressure, weighted blankets, low-stim everything

## Build a phase-aware sensory kit

Keep these ready *before* you need them:
- Noise-cancelling earbuds or loops
- A pair of comfy, no-tag clothes set aside for luteal week
- Pre-made meals for the days cooking feels too loud
- A "no" template you can copy-paste to cancel plans

## Track it once

You only need one or two cycles of noticing sensory overload to start spotting your pattern. Then it stops being mysterious — and you stop apologising for needing what you need.
`,
  },
  {
    slug: "gentle-movement-phases",
    title: "Gentle Movement for Every Phase",
    category: "Nutrition & Movement",
    emoji: "🥑",
    readTime: "4 min",
    summary:
      "Not every day is a HIIT day. Phase-aligned movement suggestions that honor where your body is right now.",
    content: `
Fitness culture pretends your body is the same every day. It isn't. Here's a kinder framework.

## Menstrual: rest + restore

Walks, gentle yin, stretching, naps. Your body is doing real work — let it.

## Follicular: build + try new things

Energy is rising. Great time for strength training, new classes, longer cardio, learning a movement skill.

## Ovulatory: peak output

Highest power and coordination. If you like to push, push here.

## Luteal: steady + lower-intensity

Strength still works, but recovery takes longer. Swap HIIT for pilates, swimming, hiking. In the final days before your period, "movement" can just mean a slow walk and stretching on the floor.

## The rule

Some movement > perfect movement. Aligning with your cycle isn't about doing less — it's about doing what your body can actually use that day.
`,
  },
  {
    slug: "anxiety-vs-hormones",
    title: "Anxiety vs. Hormones: How to Tell the Difference",
    category: "Mental Health",
    emoji: "💜",
    readTime: "6 min",
    summary:
      "Sometimes anxiety is situational, sometimes it's hormonal. Here's how to start noticing the patterns.",
    content: `
Both feel the same in the moment: racing thoughts, tight chest, dread. But the *source* changes what helps.

## Hormonal anxiety often:

- Shows up at roughly the same point each cycle (commonly late luteal)
- Lifts within a day or two of your period starting
- Has no specific "story" — your brain reaches for one to explain the feeling
- Comes with body signs: bloating, breast tenderness, headaches

## Situational anxiety often:

- Tracks to a specific trigger (work, relationship, news)
- Persists across cycle phases
- Eases when the situation eases

## Why this matters

If your anxiety is hormonal and you treat it as a character flaw, you spiral. If it's situational and you wait for it to "pass with your period," you ignore something real. Tracking lets you tell the difference — and choose the right response (rest + self-compassion vs. action + boundaries).

If you suspect PMDD (severe luteal symptoms that resolve with your period), please talk to a clinician. It's treatable, and you deserve support.
`,
  },
  {
    slug: "executive-dysfunction-guide",
    title: "The Executive Dysfunction Survival Guide",
    category: "ADHD & Neurodiversity",
    emoji: "🧠",
    readTime: "8 min",
    summary:
      "Practical, no-shame strategies for when your brain won't cooperate — especially during hormone shifts.",
    content: `
Executive dysfunction isn't laziness. It's the gap between knowing what to do and being able to start. Hormone dips can blow that gap wide open.

## Lower the bar — radically

If "clean the kitchen" feels impossible, try "put one dish in the sink." Done is done. Momentum is the goal, not perfection.

## Body double

Work alongside someone (in person, on video, or via an app). The simple presence of another human can unstick a frozen brain.

## Make it visible

Hidden = invisible = forgotten. Put the gym bag by the door. Leave the meds on the counter. Use a whiteboard, not an app you'll never open.

## Pair tasks with rewards

Boring task + favourite podcast. Annoying email + nice drink. Don't moralise productivity — bribe yourself like the brilliant gremlin you are.

## Honour the dip week

In your late luteal phase, plan *less* and forgive *more*. Pre-cook, pre-decide, pre-schedule when you have capacity, so future-you doesn't have to make hard choices on hard days.

## The reframe

You don't have a discipline problem. You have a brain that runs on interest, novelty and dopamine — and a cycle that changes how much of those are available. Work with it, not against it.
`,
  },
];

export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug);

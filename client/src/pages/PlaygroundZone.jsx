import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';

export const PlaygroundZone = () => {
  const [unlockedCards, setUnlockedCards] = useState([]);
  const [mathInput, setMathInput] = useState(35);
  const [missionIndex, setMissionIndex] = useState(0);
  const [questAccepted, setQuestAccepted] = useState(false);

  const cards = [
    {
      id: 1,
      title: 'Inherent Genius',
      quote: 'Every student is born with natural wonder. Education is not pouring into a vessel; it is igniting a luminous flame.',
    },
    {
      id: 2,
      title: 'Power of Patterns',
      quote: 'Numbers are not cold equations; they are cosmic rhythms and harmony waiting to be played like music.',
    },
    {
      id: 3,
      title: 'Tranquil Focus',
      quote: 'When the mind becomes as still as clear water, complex problems solve themselves naturally.',
    },
    {
      id: 4,
      title: 'Fearless Resilience',
      quote: 'Mistakes are not failures; they are experiments showing you the exact path to deeper understanding.',
    },
    {
      id: 5,
      title: 'Empathetic Strength',
      quote: 'True intelligence is gentle. The greatest leaders listen deeply and speak with kindness.',
    },
    {
      id: 6,
      title: 'Take Your Flight',
      quote: 'You have wings of wisdom and wings of effort. Open them both, and your highest dreams will take flight.',
    },
  ];

  const missions = [
    'Teach one peer or family member a Vedic pattern trick today.',
    'Practice 5 minutes of mindful slow breathing before opening your study desk.',
    'Write down 3 questions you are genuinely curious about in science or nature.',
    'Read 15 minutes of an inspiring book in complete digital silence.',
    'Offer a thoughtful compliment to a classmate or teacher on something they did well.',
  ];

  const handleUnlockCard = (id) => {
    setUnlockedCards((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const tens = Math.floor(mathInput / 10);
  const ones = mathInput % 10;
  const digitSum = tens + ones;

  return (
    <div>
      {/* Classic Detail Hero */}
      <section className="bg-[#EEE6D9] border-b border-[#DED8CD] py-16 lg:py-24">
        <div className="shell max-w-[1050px] space-y-6">
          <p className="kicker">Interactive Student &amp; Cognitive Lab</p>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,4.3rem)] leading-[1.1] tracking-[-0.03em] text-[#2A302D] max-w-[820px]">
            The student wonder &amp; <em>Astromath lab.</em>
          </h1>
          <p className="text-[1.08rem] text-[#59625B] max-w-[660px] leading-relaxed">
            Designed by Lakshmipriya to help learners experience how pattern recognition, calm breathing, and cognitive visualization dissolve math anxiety.
          </p>
        </div>
      </section>

      {/* Astromath & Daily Mind Quest */}
      <section className="py-16 lg:py-24">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Vedic Pattern Engine */}
          <div className="lg:col-span-6 bg-[#F7F2E9] border border-[#DED8CD] p-8 sm:p-10 space-y-6">
            <div className="space-y-2">
              <p className="kicker">Vedic Pattern Engine</p>
              <h2 className="font-serif text-3xl text-[#2A302D] leading-snug">
                Multiply any 2-digit number by 11 in <em>two seconds.</em>
              </h2>
              <p className="text-sm text-[#59625B] leading-relaxed">
                In Astromath seminars, students never cram tables. They discover mathematical symmetry:
              </p>
            </div>

            <div className="space-y-3">
              <p className="kicker">Select a test number</p>
              <div className="flex items-center gap-2 flex-wrap">
                {[14, 25, 35, 42, 53, 62].map((num) => (
                  <button
                    key={num}
                    onClick={() => setMathInput(num)}
                    className={`px-4 py-2 text-sm font-semibold border transition-colors cursor-pointer ${
                      mathInput === num
                        ? 'bg-[#3D4A3D] text-[#FAF7F0] border-[#3D4A3D]'
                        : 'bg-[#FAF7F0] text-[#2A302D] border-[#DED8CD] hover:border-[#9D5A41]'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#FAF7F0] border border-[#DED8CD] p-6 space-y-2">
              <p className="text-xs text-[#59625B] leading-relaxed">
                Pattern Rule: Place the sum of the digits (
                <strong className="text-[#2A302D]">
                  {tens} + {ones} = {digitSum}
                </strong>
                ) directly between the two digits:
              </p>
              <p className="font-serif text-3xl text-[#2A302D]">
                {mathInput} &times; 11 = <em className="text-[#9D5A41]">{mathInput * 11}</em>
              </p>
            </div>
          </div>

          {/* Daily Mind Quest */}
          <div className="lg:col-span-6 bg-[#FAF7F0] border border-[#DED8CD] p-8 sm:p-10 space-y-6">
            <div className="flex items-center justify-between">
              <p className="kicker">Daily Mind Quest</p>
              <button
                onClick={() => {
                  setMissionIndex((missionIndex + 1) % missions.length);
                  setQuestAccepted(false);
                }}
                className="text-xs font-semibold text-[#9D5A41] hover:text-[#2A302D] flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Next Quest
              </button>
            </div>

            <h2 className="font-serif text-3xl text-[#2A302D]">
              Active Focus &amp; Curiosity Practice
            </h2>

            <blockquote className="bg-[#F0E9DC] border-l-2 border-[#9D5A41] p-6 font-serif italic text-xl text-[#2A302D] leading-relaxed">
              &ldquo;{missions[missionIndex]}&rdquo;
            </blockquote>

            <button
              onClick={() => setQuestAccepted(true)}
              className="solid-btn w-full"
            >
              {questAccepted ? 'Practice accepted for today' : 'Accept this practice'} <span>&#8599;</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contemplation Cards */}
      <section className="bg-[#F8F5ED] border-t border-[#DED8CD] py-16 lg:py-24">
        <div className="shell space-y-10">
          <div className="max-w-2xl space-y-2">
            <p className="kicker">Student Masterclass Notebooks</p>
            <h2 className="section-heading">Radiant mind contemplations.</h2>
            <p className="text-sm text-[#59625B]">
              Select any card to reveal a guiding principle from Lakshmipriya&apos;s student workshops.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((c) => {
              const isUnlocked = unlockedCards.includes(c.id);
              return (
                <div
                  key={c.id}
                  onClick={() => handleUnlockCard(c.id)}
                  className={`cursor-pointer p-7 border transition-colors flex flex-col justify-between min-h-[180px] ${
                    isUnlocked
                      ? 'bg-[#FAF7F0] border-[#9D5A41]'
                      : 'bg-[#FAF7F0] border-[#DED8CD] hover:border-[#2A302D]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="kicker">0{c.id}</span>
                      <span className="text-xs text-[#59625B]">
                        {isUnlocked ? 'Revealed' : 'Select to read'}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#2A302D]">{c.title}</h3>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#DED8CD]">
                    {isUnlocked ? (
                      <p className="font-serif italic text-sm text-[#3E4540] leading-relaxed">
                        &ldquo;{c.quote}&rdquo;
                      </p>
                    ) : (
                      <p className="text-xs text-[#59625B]">
                        Click to reveal contemplation...
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* School Invite Band */}
      <section className="bg-[#D8E0D5] py-16 lg:py-20 text-center">
        <div className="shell max-w-[700px] space-y-5">
          <p className="kicker">For Schools &amp; Educators</p>
          <h2 className="section-heading">
            Invite Lakshmipriya to conduct an <em>Astromath seminar.</em>
          </h2>
          <p className="text-sm text-[#455048] leading-relaxed">
            Interactive half-day seminars and 4-week student bootcamps designed for elementary, middle, and high school students.
          </p>
          <div className="pt-2">
            <Link to="/contact" className="solid-btn">
              Invite to your school <span>&#8599;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

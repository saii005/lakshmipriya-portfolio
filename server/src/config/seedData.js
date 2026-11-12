// Seed Data Focused on Current Leadership, Active Seminars & Student Masterclasses
// Lakshmipriya Vinothkumar | Founder, Take Your Flight • Co-Founder, self to Self

export const seedProfile = {
  name: "Lakshmipriya Vinothkumar",
  titles: [
    "Mind & Human Transformation Educator",
    "Founder, Take Your Flight",
    "Co-Founder, self to Self",
    "Board of Directors, Uni5 (USA) & Shakti Foundation",
    "Keynote Speaker & Mental Education Architect"
  ],
  contact: {
    phones: ["+91 7650992525", "+91 9790662672"],
    emails: ["reachtolakshmipriya@gmail.com", "lakeepri@gmail.com"],
    locations: ["Chennai", "Pondicherry", "Coimbatore", "Bangalore"]
  },
  tagline: "Empowering Young Minds. Awakening Inner Genius. Transforming Education.",
  summary: "A visionary mind transformation educator, keynote speaker, and institutional strategist dedicated to unlocking the highest human potential. Through signature seminars, interactive school bootcamps, and holistic curricula, inspiring thousands of students, parents, and educators globally across Canada, USA, France, Japan, Singapore, China, and India.",
  qualifications: [
    { degree: "M.Sc. Psychology", institute: "University of Madras", year: "Post-Graduate" },
    { degree: "MBA (Human Resources)", institute: "University of Madras", year: "2009", score: "67%" },
    { degree: "B.E. (Electrical and Electronics)", institute: "PET Engineering College / Anna University", year: "2006", score: "75.33%" },
    { degree: "Diploma in Early Childhood Education", institute: "Specialized Training", year: "Certified" },
    { degree: "Certification in Indian Knowledge Systems (IKS)", institute: "Sanatana & IKS Academy", year: "Certified" },
    { degree: "Holistic Therapies & Coaching", institute: "Pranic Healing, Pranic Violet, Dorn Therapy, NLP, TA, Astrology", year: "Practitioner" }
  ],
  languages: ["English", "Tamil", "Japanese"],
  milestones: [
    { metric: "10,000+", label: "Students & Learners Reached", icon: "Users" },
    { metric: "10+", label: "Countries Hosted Seminars & Labs", icon: "Globe" },
    { metric: "25+", label: "Signature Transformational Masterclasses", icon: "BookOpen" },
    { metric: "₹50L+", label: "Educational Revenue & Reach at Uni5 (USA)", icon: "TrendingUp" },
    { metric: "18+", label: "Years Impacting Human Potential", icon: "Award" }
  ]
};

export const seedServices = [
  {
    title: "Astromath & Speed Brain Acceleration Seminar",
    slug: "astromath-brain-acceleration",
    category: "Student Seminars & Bootcamps",
    badge: "High Demand in Schools",
    tagline: "Remove math phobia instantly through cosmic pattern recognition and brain stimulation.",
    description: "An electrifying, interactive seminar designed for school students (Ages 7–16). Students discover mental calculation tricks, bilateral brain activation, spatial geometry, and memory palaces that turn math from a source of stress into pure wonder.",
    highlights: [
      "2-Second mental arithmetic and Vedic pattern mastery",
      "Memory retention secrets and spatial visualization",
      "Attention enhancement games to eliminate exam anxiety",
      "Fearless problem-solving mindset for school exams"
    ],
    audience: "School Students (Grades 3 to 12), Youth Camps",
    duration: "Half-Day Interactive Seminars & 4-Week Cohorts"
  },
  {
    title: "Amplify Your Potential: Career & Life Blueprint Masterclass",
    slug: "amplify-potential-career-masterclass",
    category: "Teens & College Students",
    badge: "Flagship Masterclass",
    tagline: "Equipping young adults with emotional resilience, employability, and clear purpose.",
    description: "Tailored for college students, CA aspirants, and teenagers preparing for competitive milestones. Blends aptitude strategy, group discussion mastery, time prioritization, and subconscious confidence building to prepare India's youth for leadership.",
    highlights: [
      "Aptitude coaching, interview skills & group discussions",
      "Self-directed goal setting & laser-focused time management",
      "Conflict resolution and effective interpersonal communication",
      "Personal development coaching for competitive exam aspirants"
    ],
    audience: "College Students, CA Aspirants, High School Seniors",
    duration: "Full-Day Masterclasses & Weekend Intensive Labs"
  },
  {
    title: "Institutional Mental Education & Teacher Empowerment",
    slug: "mental-education-teacher-empowerment",
    category: "Schools & Educational Institutions",
    badge: "Institutional Growth",
    tagline: "Empowering teachers and schools to teach how to think, not what to think.",
    description: "Comprehensive institutional development consulting based on Integral Education principles (Sri Aurobindo Ashram). Includes complete mental education curricula, experiential lesson plans, student worksheets, and faculty training workshops.",
    highlights: [
      "Complete K-12 Mental Education curriculum & teacher manuals",
      "Interactive classroom management & empathetic pedagogy",
      "Science-based experimental learning activities (IKS rooted)",
      "Measurable student engagement & academic quality improvement"
    ],
    audience: "School Principals, Educational Trusts, Teachers & Facilitators",
    duration: "Annual School Partnerships & 2-Day Faculty Workshops"
  },
  {
    title: "Conscious Parenting & Child Behavioral Guidance",
    slug: "conscious-parenting-guidance",
    category: "Parents & Families",
    badge: "Transformative",
    tagline: "Nurturing emotional safety, natural talents, and deep parent-child connection.",
    description: "Drawing from extensive counselling experience at Ashram Kindergarten & Big School. Equips modern parents with compassionate behavioral interventions, learning disability support, and natural screen-time reduction strategies.",
    highlights: [
      "Identifying & supporting learning disabilities with empathy",
      "Positive discipline without yelling, threats, or burnout",
      "Parental emotional self-regulation and family harmony",
      "Prenatal psychology and holistic lifestyle coaching for mothers"
    ],
    audience: "Parents, Expecting Mothers, Family Counselors",
    duration: "Parenting Cohorts & One-on-One Family Consultations"
  },
  {
    title: "Self to Self: Mindfulness, Pranic Energy & Stress Mastery",
    slug: "self-to-self-mindfulness-pranic",
    category: "Holistic Wellness & Leaders",
    badge: "Deep Transformation",
    tagline: "Harmonizing mind, breath, and vital energy for sustained high performance.",
    description: "Co-founded initiative providing certified Pranic Healing, Pranic Violet, Dorn Therapy guidance, and deep awareness meditation. Perfect for corporate executives, educators, and seekers experiencing burnout or chronic stress.",
    highlights: [
      "Pranayama breathwork for immediate nervous system calm",
      "Mindfulness techniques to conquer mental fatigue",
      "Natural circadian rhythm & Ayurvedic lifestyle alignment",
      "Community wellness and preventive health consultation"
    ],
    audience: "Corporate Executives, Educators, Wellness Seekers",
    duration: "Executive Retreats, Seminars & Private Healing Circles"
  },
  {
    title: "Power of Women: Resilience, Leadership & Prenatal Wisdom",
    slug: "power-of-women-leadership",
    category: "Women Empowerment",
    badge: "Inspiring Leadership",
    tagline: "Igniting the boundless strength, intuition, and leadership within women.",
    description: "A transformative keynote and workshop series celebrating women's inner leadership, career flourishing, and holistic health. Features specialized modules on prenatal empowerment, emotional independence, and workplace well-being.",
    highlights: [
      "Women leadership & voice empowerment masterclasses",
      "Emotional resilience & overcoming imposter syndrome",
      "Prenatal and maternal wellness science",
      "Work-life equilibrium for modern professionals"
    ],
    audience: "Women Professionals, College Women, Mothers",
    duration: "Keynote Speeches & Multi-Week Empowerment Cohorts"
  }
];

export const seedDocuments = [
  {
    title: "Take Your Flight: Awakening Inner Genius in Students",
    slug: "take-your-flight-student-mastery",
    category: "Student Seminars",
    badge: "Keynote Slide Deck",
    order: 1,
    summary: "The flagship student empowerment framework teaching young minds how to conquer fear, master focus, and unlock limitless learning.",
    slides: [
      {
        slideNumber: 1,
        title: "The Vision of Take Your Flight",
        subtitle: "Why every child is an extraordinary genius waiting to bloom",
        icon: "Sparkles",
        bulletPoints: [
          "Every student possesses innate intellectual brilliance that conventional rote exams fail to measure.",
          "Our mission: Combining inner mastery (tranquil mind, self-belief) with external competencies (speed learning, logic).",
          "Trained thousands of young learners across 10+ countries to approach studies with curiosity instead of fear.",
          "When a child feels emotionally safe and inspired, their capacity to learn expands infinitely."
        ],
        quote: "You have wings of wisdom and wings of effort—open them and take flight!",
        tags: ["Take Your Flight", "Student Empowerment", "Mind Mastery"]
      },
      {
        slideNumber: 2,
        title: "Astromath: Playing with Cosmic Numbers",
        subtitle: "How pattern-based learning eliminates math anxiety forever",
        icon: "Target",
        bulletPoints: [
          "Mathematics is not a dry formula; it is the natural musical rhythm of the universe.",
          "Vedic pattern recognition enables students to calculate 2-digit to 4-digit arithmetic mentally in seconds.",
          "Activates both brain hemispheres simultaneously: analytical logic and creative spatial visualization.",
          "Results: 92% of participating students report instant reduction in exam anxiety and newfound joy in math."
        ],
        quote: "Math is the rhythm of the cosmos; when you see the pattern, numbers begin to dance.",
        tags: ["Astromath", "Vedic Math", "Brain Stimulation"]
      },
      {
        slideNumber: 3,
        title: "Focus Gym: Building Unshakeable Concentration",
        subtitle: "Simple daily protocols for modern students battling digital distractions",
        icon: "Compass",
        bulletPoints: [
          "Attention span is a muscle that can be systematically trained through breath and observation.",
          "The 'Balloon Breath' ritual: quieting exam jitters in less than 90 seconds.",
          "Memory Palace protocols: organizing complex subjects into vivid mental galleries.",
          "Building active study habits without relying on late-night cramming or parental pressure."
        ],
        quote: "When the mind is as calm as still water, the brightest stars of thought can shine.",
        tags: ["Concentration", "Study Skills", "Exam Preparation"]
      }
    ]
  },
  {
    title: "Integral Education: Reimagining K-12 Classrooms",
    slug: "integral-education-classroom-architecture",
    category: "Institutional Seminars",
    badge: "School Leadership Deck",
    order: 2,
    summary: "Insights from years of counselling and curriculum development at Sri Aurobindo Ashram Kindergarten & Big School in Pondicherry.",
    slides: [
      {
        slideNumber: 1,
        title: "What is True Integral Education?",
        subtitle: "Developing the physical, vital, mental, psychic, and spiritual dimensions",
        icon: "BookOpen",
        bulletPoints: [
          "Conventional education trains only memory; integral education nurtures the total human being.",
          "Hands-on experience at Sri Aurobindo Ashram Kindergarten School as dedicated Counsellor.",
          "Designing mental education curricula, teacher manuals, and student activity kits for the Big School.",
          "Moving away from punitive grading toward intrinsic talent identification and joyful self-discovery."
        ],
        quote: "A flower does not compete with the flower next to it. It just blooms.",
        tags: ["Integral Education", "Sri Aurobindo Ashram", "Holistic Pedagogy"]
      },
      {
        slideNumber: 2,
        title: "Empowering Teachers & School Faculty",
        subtitle: "From instructional lecturers to empathetic human mentors",
        icon: "Users",
        bulletPoints: [
          "Faculty training programs helping educators understand developmental psychology and student trauma.",
          "Tailored intervention strategies for children with ADHD, dyslexia, and learning differences.",
          "Classroom activities that cultivate empathy, mutual respect, and active collaboration among peers.",
          "Providing schools with turnkey experiential learning kits rooted in Indian Knowledge Systems (IKS)."
        ],
        quote: "To inspire a child, the teacher must first be alight with wonder.",
        tags: ["Teacher Training", "Classroom Excellence", "Curriculum Design"]
      }
    ]
  },
  {
    title: "Self to Self: Mindfulness & High-Performance Vitality",
    slug: "self-to-self-mindfulness-masterclass",
    category: "Leadership & Wellness",
    badge: "Executive Masterclass Deck",
    order: 3,
    summary: "Practical mindfulness, Pranic vital energy protocols, and stress resilience for professionals and educators.",
    slides: [
      {
        slideNumber: 1,
        title: "The Architecture of Inner Vitality",
        subtitle: "Harmonizing psychology, pranayama breathwork, and energy science",
        icon: "Sun",
        bulletPoints: [
          "Certified practice across Pranic Healing, Pranic Violet, Dorn Therapy, and Nadi lifestyle consultation.",
          "Conducted leadership retreats and personal transformation courses valued up to ₹3 lakhs.",
          "Understanding how chronic workplace stress drains cognitive capacity and emotional balance.",
          "Daily energetic cleansing and breathwork to sustain sharp focus and peace throughout demanding schedules."
        ],
        quote: "Quiet the noise within, and your true power will speak.",
        tags: ["Mindfulness", "Pranic Healing", "Stress Mastery"]
      }
    ]
  }
];

export const seedAdmin = {
  name: "Lakshmipriya Vinothkumar",
  email: "admin@lakshmipriya.com",
  password: "PriyaAdmin2026!",
  role: "admin"
};

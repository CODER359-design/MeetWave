export type UserProfile = {
  id: string;
  name: string;
  age: number;
  city: string;
  distance: number;
  bio: string;
  photos: string[];
  interests: string[];
  goal: string;
  verified: boolean;
  premium: boolean;
  compatibilityScore: number;
  lastActive: Date;
  badges: string[];
  job: string;
  education: string;
};

export type ChatMessage = {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  read: boolean;
  type: "text" | "ice-breaker" | "image";
};

export type Conversation = {
  id: string;
  user: UserProfile;
  lastMessage: ChatMessage;
  unreadCount: number;
  matchedAt: Date;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  date: Date;
  time: string;
  price: number;
  capacity: number;
  registered: number;
  image: string;
  isOnline: boolean;
  organizer: string;
  tags: string[];
};

export const INTERESTS = [
  "Путешествия", "Кино", "Спорт", "Музыка", "Кулинария", "Йога",
  "Фотография", "Чтение", "Танцы", "Игры", "Арт", "Театр",
  "Бег", "Велоспорт", "Кофе", "Вино", "Pets", "Outdoor",
  "Технологии", "Стартапы", "Психология", "Медитация"
];

export const GOALS = [
  "Серьёзные отношения",
  "Знакомство и общение",
  "Дружба",
  "Совместные активности",
  "Всё зависит от человека",
];

const avatarColors = [
  "from-pink-400 to-rose-600",
  "from-violet-400 to-purple-600",
  "from-blue-400 to-indigo-600",
  "from-teal-400 to-cyan-600",
  "from-amber-400 to-orange-600",
  "from-green-400 to-emerald-600",
];

export const MOCK_PROFILES: UserProfile[] = [
  {
    id: "1",
    name: "Анастасия",
    age: 27,
    city: "Москва",
    distance: 2.3,
    bio: "Люблю утренний кофе, арт-галереи и импровизированные поездки. Работаю в маркетинге, но мечтаю написать роман. Ищу человека, с которым интересно молчать.",
    photos: ["1", "2", "3"],
    interests: ["Кофе", "Арт", "Чтение", "Путешествия", "Кино"],
    goal: "Серьёзные отношения",
    verified: true,
    premium: true,
    compatibilityScore: 94,
    lastActive: new Date(Date.now() - 5 * 60 * 1000),
    badges: ["verified", "attending-events", "top-match"],
    job: "Маркетинг-директор",
    education: "НИУ ВШЭ",
  },
  {
    id: "2",
    name: "Михаил",
    age: 30,
    city: "Москва",
    distance: 5.1,
    bio: "Архитектор, который думает о пространстве даже вне работы. Занимаюсь бегом по утрам, а вечером — джаз и книги. Ценю честность больше, чем идеальные свидания.",
    photos: ["4", "5"],
    interests: ["Бег", "Музыка", "Чтение", "Арт", "Кофе"],
    goal: "Серьёзные отношения",
    verified: true,
    premium: false,
    compatibilityScore: 87,
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    badges: ["verified"],
    job: "Архитектор",
    education: "МАРХИ",
  },
  {
    id: "3",
    name: "Дарья",
    age: 25,
    city: "Москва",
    distance: 1.8,
    bio: "UX-дизайнер, веган, любитель горного велосипеда. По выходным — фермерские рынки и yoga в парке. Верю, что лучшие связи рождаются за общим столом.",
    photos: ["6", "7", "8"],
    interests: ["Велоспорт", "Йога", "Кулинария", "Outdoor", "Pets"],
    goal: "Всё зависит от человека",
    verified: true,
    premium: true,
    compatibilityScore: 82,
    lastActive: new Date(Date.now() - 30 * 60 * 1000),
    badges: ["verified", "attending-events"],
    job: "UX-дизайнер",
    education: "Строгановка",
  },
  {
    id: "4",
    name: "Иван",
    age: 32,
    city: "Москва",
    distance: 8.4,
    bio: "Предприниматель в сфере edtech. Люблю горы, стрит-фуд и длинные разговоры о смысле. Был в 40+ странах, но лучшие воспоминания — о простых моментах дома.",
    photos: ["9", "10"],
    interests: ["Путешествия", "Технологии", "Стартапы", "Outdoor", "Кофе"],
    goal: "Серьёзные отношения",
    verified: true,
    premium: false,
    compatibilityScore: 78,
    lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000),
    badges: ["verified"],
    job: "CEO / Founder",
    education: "СКОЛTECH",
  },
  {
    id: "5",
    name: "Полина",
    age: 28,
    city: "Москва",
    distance: 3.7,
    bio: "Психолог и практикующий коуч. Обожаю театр, джазовые концерты и незапланированные прогулки. Верю, что уязвимость — это сила, а не слабость.",
    photos: ["11", "12", "13"],
    interests: ["Психология", "Театр", "Музыка", "Медитация", "Чтение"],
    goal: "Серьёзные отношения",
    verified: true,
    premium: true,
    compatibilityScore: 91,
    lastActive: new Date(Date.now() - 15 * 60 * 1000),
    badges: ["verified", "top-match", "attending-events"],
    job: "Психолог-коуч",
    education: "МГУ",
  },
  {
    id: "6",
    name: "Алексей",
    age: 29,
    city: "Москва",
    distance: 6.2,
    bio: "Разработчик, который не только сидит за компом. Скалолазание, сноуборд, авторское кино. Ищу человека, с которым можно и поговорить и помолчать.",
    photos: ["14", "15"],
    interests: ["Технологии", "Outdoor", "Кино", "Игры", "Бег"],
    goal: "Знакомство и общение",
    verified: false,
    premium: false,
    compatibilityScore: 73,
    lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000),
    badges: [],
    job: "Senior Developer",
    education: "МФТИ",
  },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    user: MOCK_PROFILES[0],
    lastMessage: {
      id: "m1",
      senderId: "1",
      text: "Привет! Я тоже обожаю это кафе на Патриках 😊",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      read: false,
      type: "text",
    },
    unreadCount: 3,
    matchedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "c2",
    user: MOCK_PROFILES[4],
    lastMessage: {
      id: "m2",
      senderId: "me",
      text: "Очень интересно, расскажи больше о своей работе!",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      read: true,
      type: "text",
    },
    unreadCount: 0,
    matchedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "c3",
    user: MOCK_PROFILES[2],
    lastMessage: {
      id: "m3",
      senderId: "3",
      text: "Может, на воскресный yoga в парке Горького?",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: false,
      type: "text",
    },
    unreadCount: 1,
    matchedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
];

export const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: "msg1",
    senderId: "1",
    text: "Привет! Увидела, что ты тоже ходишь в галерею «Гараж». Там сейчас классная выставка!",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000),
    read: true,
    type: "text",
  },
  {
    id: "msg2",
    senderId: "me",
    text: "Привет, Анастасия! Да, был там на прошлой неделе. Какую выставку ты имеешь в виду?",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 25 * 60 * 1000),
    read: true,
    type: "text",
  },
  {
    id: "msg3",
    senderId: "1",
    text: "Инсталляцию «Звук тишины» — там можно провести часа два и не заметить. Ты куда-нибудь ходишь на выходных?",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: true,
    type: "text",
  },
  {
    id: "msg4",
    senderId: "me",
    text: "Думаю сходить на джазовый концерт в Эрмитаже. Любишь джаз?",
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
    read: true,
    type: "text",
  },
  {
    id: "msg5",
    senderId: "1",
    text: "Привет! Я тоже обожаю это кафе на Патриках 😊",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    read: false,
    type: "text",
  },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: "e1",
    title: "Speed Dating: Люди умные и интересные",
    description: "Вечер быстрых знакомств в уютном баре для тех, кто ценит глубокие разговоры. Формат 5 минут — 12 встреч. Нетворкинг, игры-icebreakers, живая музыка.",
    category: "Speed Dating",
    city: "Москва",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    time: "19:00",
    price: 1200,
    capacity: 40,
    registered: 31,
    image: "e1",
    isOnline: false,
    organizer: "MeetWave Events",
    tags: ["Speed dating", "Нетворкинг", "Живая музыка"],
  },
  {
    id: "e2",
    title: "Онлайн: Мастер-класс «Первое свидание без стресса»",
    description: "Психолог и коуч по отношениям разберёт самые частые ошибки первых свиданий. Практические техники уверенности, разговора и читки интереса партнёра.",
    category: "Вебинар",
    city: "Онлайн",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    time: "20:00",
    price: 0,
    capacity: 200,
    registered: 147,
    image: "e2",
    isOnline: true,
    organizer: "Полина Краснова, коуч",
    tags: ["Психология", "Онлайн", "Бесплатно"],
  },
  {
    id: "e3",
    title: "Пикник для тех, кто хочет познакомиться",
    description: "Летний пикник в парке Горького. Настольные игры, командные конкурсы, еда и напитки включены. Без смартфонов — только живое общение!",
    category: "Outdoor",
    city: "Москва",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    time: "14:00",
    price: 800,
    capacity: 60,
    registered: 44,
    image: "e3",
    isOnline: false,
    organizer: "MeetWave Events",
    tags: ["Outdoor", "Игры", "Еда"],
  },
  {
    id: "e4",
    title: "Мастер-класс по итальянской кухне для двоих",
    description: "Готовим вместе пасту, ризотто и тирамису. Идеально для знакомства через общее дело. Шеф-повар, вино и хорошая компания включены.",
    category: "Кулинария",
    city: "Москва",
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    time: "18:00",
    price: 2500,
    capacity: 20,
    registered: 18,
    image: "e4",
    isOnline: false,
    organizer: "Cucina Italiana",
    tags: ["Кулинария", "Вино", "Малая группа"],
  },
  {
    id: "e5",
    title: "Онлайн: Групповой квест «Вместе сильнее»",
    description: "Интерактивный квест для знакомств в онлайн-формате. Командные задания, викторины и тайный Санта. Призы для победителей!",
    category: "Квест",
    city: "Онлайн",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    time: "19:30",
    price: 500,
    capacity: 100,
    registered: 67,
    image: "e5",
    isOnline: true,
    organizer: "MeetWave Events",
    tags: ["Квест", "Онлайн", "Командная игра"],
  },
  {
    id: "e6",
    title: "Coffee Meetup: Первые свидания за кофе",
    description: "Неформальные кофе-знакомства в камерной атмосфере. 8 случайных пар за час, потом свободное общение. Кофе и десерты включены.",
    category: "Coffee Date",
    city: "Санкт-Петербург",
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    time: "11:00",
    price: 600,
    capacity: 16,
    registered: 12,
    image: "e6",
    isOnline: false,
    organizer: "MeetWave SPb",
    tags: ["Кофе", "Малая группа", "СПб"],
  },
];

export const COMPATIBILITY_QUESTIONS = [
  {
    id: "q1",
    question: "Как вы предпочитаете проводить выходные?",
    options: [
      "Активно: спорт, прогулки, события",
      "Спокойно: дома, кино, книги",
      "Смешанно: зависит от настроения",
      "С друзьями и большой компанией",
    ],
  },
  {
    id: "q2",
    question: "Что для вас важнее в отношениях?",
    options: [
      "Общие интересы и хобби",
      "Схожие ценности и взгляды",
      "Интеллектуальная совместимость",
      "Физическое притяжение и энергия",
    ],
  },
  {
    id: "q3",
    question: "Как вы справляетесь с конфликтами?",
    options: [
      "Сразу обсуждаю, не откладываю",
      "Беру паузу, потом говорю",
      "Стараюсь избегать конфликтов",
      "Ищу компромисс сразу",
    ],
  },
  {
    id: "q4",
    question: "Ваш идеальный первый отпуск вдвоём?",
    options: [
      "Море, пляж, расслабление",
      "Горы, активный туризм",
      "Европейские города, культура",
      "Экзотика, нестандартные маршруты",
    ],
  },
  {
    id: "q5",
    question: "Как вы относитесь к планированию будущего?",
    options: [
      "Люблю детальные планы на годы",
      "Планирую, но гибко",
      "Живу настоящим моментом",
      "Общие цели важнее конкретных планов",
    ],
  },
];

export const ADMIN_STATS = {
  totalUsers: 12847,
  mau: 9234,
  newThisWeek: 847,
  verifiedProfiles: 8921,
  premiumUsers: 1203,
  totalMatches: 34567,
  avgMatchTime: 31,
  totalChats: 28934,
  activeEvents: 23,
  reportsToday: 12,
  pendingVerification: 89,
  retentionD30: 42,
  nps: 52,
  csat: 4.6,
  arpu: 5.8,
};

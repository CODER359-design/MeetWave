import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "meetwave";

const USERS = [
  {
    email: "anna@example.com",
    name: "Анна",
    age: 27,
    city: "Москва",
    bio: "Люблю путешествия, йогу и хорошую музыку. Ищу интересного собеседника.",
    photos: ["/photos/anna1.jpg"],
    interests: ["Путешествия", "Йога", "Музыка", "Кофе"],
    goal: "Серьёзные отношения",
    job: "Дизайнер",
    verified: true,
    premium: false,
    status: "active",
  },
  {
    email: "mikhail@example.com",
    name: "Михаил",
    age: 31,
    city: "Москва",
    bio: "Разработчик, люблю горы и сноуборд. Ценю искренность.",
    photos: ["/photos/mikhail1.jpg"],
    interests: ["Спорт", "Горы", "IT", "Кино"],
    goal: "Серьёзные отношения",
    job: "Software Engineer",
    verified: true,
    premium: true,
    status: "active",
  },
  {
    email: "daria@example.com",
    name: "Дарья",
    age: 25,
    city: "Москва",
    bio: "Фотограф, обожаю природу и животных. Ищу единомышленника.",
    photos: ["/photos/daria1.jpg"],
    interests: ["Фото", "Природа", "Животные", "Арт"],
    goal: "Новые знакомства",
    job: "Фотограф",
    verified: true,
    premium: false,
    status: "active",
  },
  {
    email: "ivan@example.com",
    name: "Иван",
    age: 29,
    city: "Санкт-Петербург",
    bio: "Предприниматель, увлекаюсь спортом и путешествиями.",
    photos: ["/photos/ivan1.jpg"],
    interests: ["Бизнес", "Спорт", "Путешествия"],
    goal: "Серьёзные отношения",
    job: "CEO",
    verified: false,
    premium: true,
    status: "active",
  },
  {
    email: "polina@example.com",
    name: "Полина",
    age: 24,
    city: "Москва",
    bio: "Студентка, люблю книги, кино и долгие прогулки.",
    photos: ["/photos/polina1.jpg"],
    interests: ["Книги", "Кино", "Прогулки", "Кофе"],
    goal: "Новые знакомства",
    education: "МГУ",
    verified: true,
    premium: false,
    status: "active",
  },
];

const EVENTS = [
  {
    title: "Speed Dating: Умные люди",
    description: "Вечер быстрых знакомств для интеллектуалов. 10 мини-свиданий по 7 минут.",
    category: "Speed Dating",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    time: "19:00",
    city: "Москва",
    isOnline: false,
    capacity: 20,
    registered: 11,
    price: 1200,
    organizer: "MeetWave Events",
    tags: ["speed dating", "интеллектуалы", "знакомства"],
  },
  {
    title: "Вебинар: Первое свидание без стресса",
    description: "Психолог расскажет, как справиться с волнением и произвести впечатление.",
    category: "Вебинар",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    time: "20:00",
    city: "Онлайн",
    isOnline: true,
    capacity: 100,
    registered: 47,
    price: 0,
    organizer: "MeetWave Academy",
    tags: ["вебинар", "психология", "свидания"],
  },
  {
    title: "Пикник в Парке Горького",
    description: "Неформальная встреча на свежем воздухе. Берём пледы, еду и хорошее настроение!",
    category: "Outdoor",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    time: "14:00",
    city: "Москва",
    isOnline: false,
    capacity: 30,
    registered: 14,
    price: 800,
    organizer: "MeetWave Events",
    tags: ["пикник", "outdoor", "парк"],
  },
];

async function seed() {
  console.log("🌱 Starting database seed...");

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB_NAME);

  console.log("📦 Clearing existing data...");
  await db.collection("users").deleteMany({});
  await db.collection("events").deleteMany({});
  await db.collection("matches").deleteMany({});
  await db.collection("messages").deleteMany({});
  await db.collection("swipes").deleteMany({});

  console.log("👤 Seeding users...");
  const now = new Date();
  const usersToInsert = USERS.map((u) => ({
    ...u,
    passwordHash: "demo",
    profileProgress: 75,
    badges: u.verified ? ["verified"] : [],
    createdAt: now,
    updatedAt: now,
    lastActive: now,
    language: "ru" as const,
  }));
  await db.collection("users").insertMany(usersToInsert);

  console.log("📅 Seeding events...");
  const eventsToInsert = EVENTS.map((e) => ({
    ...e,
    createdAt: now,
  }));
  await db.collection("events").insertMany(eventsToInsert);

  console.log("✅ Seed completed!");
  console.log(`   - ${USERS.length} users`);
  console.log(`   - ${EVENTS.length} events`);

  await client.close();
}

seed().catch(console.error);

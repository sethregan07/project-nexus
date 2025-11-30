import { supabase } from './lib/supabase.ts';

const sampleArticles = [
  {
    id: 1,
    title: "The Future of AI in Technology",
    content: "Artificial Intelligence is revolutionizing the way we live and work. From machine learning algorithms to neural networks, AI is becoming an integral part of our daily lives. This comprehensive article explores the latest developments in AI technology and their potential impact on various industries.",
    author: "John Doe",
    image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    category: "Technology",
    published_date: "2024-11-30T10:00:00Z",
    created_at: "2024-11-30T10:00:00Z",
    updated_at: "2024-11-30T10:00:00Z",
  },
  {
    id: 2,
    title: "Sustainable Energy Solutions for 2024",
    content: "As the world moves towards renewable energy sources, innovative solutions are emerging to combat climate change. Solar, wind, and hydroelectric power are leading the charge in creating a sustainable future.",
    author: "Jane Smith",
    image_url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    category: "Environment",
    published_date: "2024-11-29T14:30:00Z",
    created_at: "2024-11-29T14:30:00Z",
    updated_at: "2024-11-29T14:30:00Z",
  },
  {
    id: 3,
    title: "The Rise of Remote Work Culture",
    content: "The pandemic accelerated the adoption of remote work, and now companies are embracing flexible work arrangements. This article discusses the benefits, challenges, and best practices for successful remote work implementation.",
    author: "Mike Johnson",
    image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    category: "Business",
    published_date: "2024-11-28T09:15:00Z",
    created_at: "2024-11-28T09:15:00Z",
    updated_at: "2024-11-28T09:15:00Z",
  },
  {
    id: 4,
    title: "Advancements in Quantum Computing",
    content: "Quantum computing represents the next frontier in computational power. This article delves into recent breakthroughs and their potential applications in cryptography, drug discovery, and complex problem-solving.",
    author: "Sarah Wilson",
    image_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    category: "Science",
    published_date: "2024-11-27T16:45:00Z",
    created_at: "2024-11-27T16:45:00Z",
    updated_at: "2024-11-27T16:45:00Z",
  },
  {
    id: 5,
    title: "The Impact of 5G Technology",
    content: "5G networks are transforming connectivity and enabling new technologies. From IoT devices to autonomous vehicles, 5G is paving the way for innovations that were previously impossible.",
    author: "David Brown",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    category: "Technology",
    published_date: "2024-11-26T11:20:00Z",
    created_at: "2024-11-26T11:20:00Z",
    updated_at: "2024-11-26T11:20:00Z",
  },
  {
    id: 6,
    title: "Mental Health in the Digital Age",
    content: "As technology becomes more integrated into our lives, the importance of mental health awareness grows. This article explores the effects of digital connectivity on mental well-being and strategies for maintaining balance.",
    author: "Lisa Chen",
    image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    category: "Health",
    published_date: "2024-11-25T13:10:00Z",
    created_at: "2024-11-25T13:10:00Z",
    updated_at: "2024-11-25T13:10:00Z",
  },
  {
    id: 7,
    title: "Blockchain Beyond Cryptocurrency",
    content: "While blockchain technology gained fame through cryptocurrencies, its applications extend far beyond digital money. This article examines blockchain's role in supply chain management, voting systems, and secure data sharing.",
    author: "Tom Anderson",
    image_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    category: "Technology",
    published_date: "2024-11-24T15:35:00Z",
    created_at: "2024-11-24T15:35:00Z",
    updated_at: "2024-11-24T15:35:00Z",
  },
  {
    id: 8,
    title: "The Evolution of Electric Vehicles",
    content: "Electric vehicles are revolutionizing transportation. From Tesla's innovations to traditional automakers' adaptations, EVs are becoming more accessible and efficient. This article covers the latest developments and future trends.",
    author: "Emma Davis",
    image_url: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&q=80",
    category: "Automotive",
    published_date: "2024-11-23T12:50:00Z",
    created_at: "2024-11-23T12:50:00Z",
    updated_at: "2024-11-23T12:50:00Z",
  },
  {
    id: 9,
    title: "Cybersecurity in the IoT Era",
    content: "As Internet of Things devices proliferate, cybersecurity becomes increasingly critical. This article discusses current threats, best practices, and emerging technologies for protecting connected devices and networks.",
    author: "Robert Taylor",
    image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    category: "Security",
    published_date: "2024-11-22T10:25:00Z",
    created_at: "2024-11-22T10:25:00Z",
    updated_at: "2024-11-22T10:25:00Z",
  },
  {
    id: 10,
    title: "The Future of Space Exploration",
    content: "Space exploration is entering a new era with private companies and international collaborations. This article explores upcoming missions, technological advancements, and the potential for human settlement beyond Earth.",
    author: "Anna Martinez",
    image_url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
    category: "Science",
    published_date: "2024-11-21T14:40:00Z",
    created_at: "2024-11-21T14:40:00Z",
    updated_at: "2024-11-21T14:40:00Z",
  },
  {
    id: 11,
    title: "Augmented Reality in Education",
    content: "Augmented reality is transforming education by providing immersive learning experiences. From interactive textbooks to virtual field trips, AR technology is making learning more engaging and effective.",
    author: "Chris Lee",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    category: "Education",
    published_date: "2024-11-20T16:55:00Z",
    created_at: "2024-11-20T16:55:00Z",
    updated_at: "2024-11-20T16:55:00Z",
  },
  {
    id: 12,
    title: "Sustainable Fashion Movement",
    content: "The fashion industry is undergoing a sustainability revolution. This article examines eco-friendly materials, ethical manufacturing practices, and consumer trends shaping the future of sustainable fashion.",
    author: "Maria Garcia",
    image_url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    category: "Fashion",
    published_date: "2024-11-19T11:30:00Z",
    created_at: "2024-11-19T11:30:00Z",
    updated_at: "2024-11-19T11:30:00Z",
  },
  {
    id: 13,
    title: "The Rise of Voice Technology",
    content: "Voice assistants and speech recognition are becoming ubiquitous. This article explores the technology behind voice interfaces, current applications, and future developments in voice-controlled systems.",
    author: "Kevin White",
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    category: "Technology",
    published_date: "2024-11-18T13:15:00Z",
    created_at: "2024-11-18T13:15:00Z",
    updated_at: "2024-11-18T13:15:00Z",
  },
  {
    id: 14,
    title: "Urban Farming Innovations",
    content: "As cities grow, urban farming offers solutions for local food production. This article discusses vertical farming, hydroponics, and other innovative approaches to sustainable urban agriculture.",
    author: "Rachel Green",
    image_url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    category: "Agriculture",
    published_date: "2024-11-17T15:20:00Z",
    created_at: "2024-11-17T15:20:00Z",
    updated_at: "2024-11-17T15:20:00Z",
  },
  {
    id: 15,
    title: "The Psychology of Social Media",
    content: "Social media platforms shape our behavior and mental health. This article examines the psychological effects of social networking, addiction patterns, and strategies for healthy digital habits.",
    author: "Daniel Kim",
    image_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    category: "Psychology",
    published_date: "2024-11-16T10:45:00Z",
    created_at: "2024-11-16T10:45:00Z",
    updated_at: "2024-11-16T10:45:00Z",
  },
  {
    id: 16,
    title: "Advances in Medical Imaging",
    content: "Medical imaging technology continues to evolve, providing clearer and more accurate diagnoses. This article covers recent developments in MRI, CT scans, and emerging imaging techniques.",
    author: "Dr. Jennifer Adams",
    image_url: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    category: "Medicine",
    published_date: "2024-11-15T12:00:00Z",
    created_at: "2024-11-15T12:00:00Z",
    updated_at: "2024-11-15T12:00:00Z",
  },
  {
    id: 17,
    title: "The Economics of Cryptocurrency",
    content: "Cryptocurrencies are reshaping financial systems worldwide. This article analyzes the economic implications, market dynamics, and regulatory challenges facing digital currencies.",
    author: "Michael Thompson",
    image_url: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
    category: "Finance",
    published_date: "2024-11-14T14:25:00Z",
    created_at: "2024-11-14T14:25:00Z",
    updated_at: "2024-11-14T14:25:00Z",
  },
  {
    id: 18,
    title: "Climate Change Adaptation Strategies",
    content: "As climate change impacts become more evident, adaptation strategies are crucial. This article explores community resilience, infrastructure improvements, and policy approaches to climate adaptation.",
    author: "Dr. Laura Nelson",
    image_url: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&q=80",
    category: "Environment",
    published_date: "2024-11-13T16:10:00Z",
    created_at: "2024-11-13T16:10:00Z",
    updated_at: "2024-11-13T16:10:00Z",
  },
  {
    id: 19,
    title: "The Future of Work",
    content: "Work is evolving with technology and societal changes. This article examines trends in remote work, gig economy, automation, and the skills needed for future careers.",
    author: "James Wilson",
    image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    category: "Business",
    published_date: "2024-11-12T11:55:00Z",
    created_at: "2024-11-12T11:55:00Z",
    updated_at: "2024-11-12T11:55:00Z",
  },
  {
    id: 20,
    title: "Renewable Energy Storage Solutions",
    content: "Energy storage is key to renewable energy adoption. This article discusses battery technology, pumped hydro storage, and emerging solutions for efficient energy storage and distribution.",
    author: "Sophie Patel",
    image_url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    category: "Energy",
    published_date: "2024-11-11T13:40:00Z",
    created_at: "2024-11-11T13:40:00Z",
    updated_at: "2024-11-11T13:40:00Z",
  },
];

const sampleCategories = [
  { category: "Technology", count: 5 },
  { category: "Science", count: 3 },
  { category: "Business", count: 2 },
  { category: "Environment", count: 2 },
  { category: "Health", count: 1 },
  { category: "Automotive", count: 1 },
  { category: "Security", count: 1 },
  { category: "Education", count: 1 },
  { category: "Fashion", count: 1 },
  { category: "Agriculture", count: 1 },
  { category: "Psychology", count: 1 },
  { category: "Medicine", count: 1 },
  { category: "Finance", count: 1 },
  { category: "Energy", count: 1 },
];

async function migrateToSupabase() {
  try {
    console.log('Starting migration to Supabase...');

    console.log('Inserting articles...');
    const { data: articlesData, error: articlesError } = await supabase
      .from('articles')
      .upsert(sampleArticles, { onConflict: 'id' })
      .select();

    if (articlesError) {
      console.error('Error inserting articles:', articlesError);
    } else {
      console.log(`Successfully inserted/updated ${articlesData?.length || 0} articles`);
    }

    console.log('Inserting/updating categories...');
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .upsert(sampleCategories, { onConflict: 'category' })
      .select();

    if (categoriesError) {
      console.error('Error inserting categories:', categoriesError);
    } else {
      console.log(`Successfully inserted/updated ${categoriesData?.length || 0} categories`);
    }

    console.log('Migration completed successfully!');
    console.log('Your Next.js app now has all the static data migrated to Supabase.');

  } catch (error) {
    console.error('Unexpected error during migration:', error);
  }
}

// Run the migration
migrateToSupabase();

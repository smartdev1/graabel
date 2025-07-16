<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div class="container-custom section-padding">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Conseils Santé
          </h1>
          <p class="text-xl text-blue-100 animate-fade-in">
            Découvrez nos guides et conseils d'experts pour prendre soin de votre santé.
          </p>
        </div>
      </div>
    </section>

    <!-- Categories Filter -->
    <section class="section-padding bg-white border-b">
      <div class="container-custom">
        <div class="flex flex-wrap justify-center gap-4">
          <button 
            @click="selectedCategory = ''"
            :class="[
              'px-6 py-2 rounded-full font-medium transition-colors',
              selectedCategory === '' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            Tous les conseils
          </button>
          <button 
            v-for="category in categories" 
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-6 py-2 rounded-full font-medium transition-colors',
              selectedCategory === category 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Articles -->
    <section class="section-padding bg-gray-50">
      <div class="container-custom">
        <div class="card overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <div class="relative">
              <NuxtImg 
                src="https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Article principal"
                class="w-full h-64 lg:h-full object-cover"
              />
              <div class="absolute top-4 left-4">
                <span class="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  À la une
                </span>
              </div>
            </div>
            <div class="p-8 flex flex-col justify-center">
              <div class="text-sm text-gray-500 mb-2">Prévention • 5 min de lecture</div>
              <h2 class="text-2xl font-bold text-gray-900 mb-4">
                Comment renforcer son système immunitaire naturellement
              </h2>
              <p class="text-gray-600 mb-6">
                Découvrez les meilleures stratégies naturelles pour booster vos défenses immunitaires 
                et rester en bonne santé toute l'année.
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <UserIcon class="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Dr. Marie Dubois</div>
                    <div class="text-sm text-gray-500">Pharmacienne</div>
                  </div>
                </div>
                <button class="btn-primary">
                  Lire l'article
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Articles Grid -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900">
            {{ selectedCategory || 'Tous nos conseils' }}
          </h2>
          <div class="flex items-center space-x-2">
            <SearchIcon class="w-5 h-5 text-gray-400" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Rechercher un conseil..."
              class="input-field w-64"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="article in filteredArticles" 
            :key="article.id"
            class="card group hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div class="relative overflow-hidden rounded-t-lg">
              <NuxtImg 
                :src="article.image" 
                :alt="article.title"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute top-3 left-3">
                <span class="bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                  {{ article.category }}
                </span>
              </div>
              <div class="absolute top-3 right-3">
                <span class="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                  {{ article.readTime }}
                </span>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                {{ article.title }}
              </h3>
              <p class="text-gray-600 mb-4 line-clamp-3">
                {{ article.excerpt }}
              </p>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <UserIcon class="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ article.author }}</div>
                    <div class="text-xs text-gray-500">{{ article.date }}</div>
                  </div>
                </div>
                
                <div class="flex items-center space-x-2 text-gray-500">
                  <EyeIcon class="w-4 h-4" />
                  <span class="text-sm">{{ article.views }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Load More Button -->
        <div class="text-center mt-12">
          <button class="btn-outline">
            Charger plus d'articles
          </button>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div class="container-custom">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-4">Restez informé</h2>
          <p class="text-xl text-blue-100 mb-8">
            Recevez nos derniers conseils santé directement dans votre boîte mail
          </p>
          <div class="flex flex-col sm:flex-row max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Votre adresse email"
              class="flex-1 px-4 py-3 rounded-l-lg sm:rounded-r-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button class="bg-white text-primary-600 px-6 py-3 rounded-r-lg sm:rounded-l-none hover:bg-gray-100 transition-colors font-medium">
              S'abonner
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Tips -->
    <section class="section-padding bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Conseils express</h2>
          <p class="text-xl text-gray-600">
            Des astuces rapides pour votre bien-être quotidien
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="card p-6 text-center group hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
              <DropletIcon class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Hydratation</h3>
            <p class="text-sm text-gray-600">Buvez au moins 1,5L d'eau par jour</p>
          </div>

          <div class="card p-6 text-center group hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 transition-colors">
              <SunIcon class="w-6 h-6 text-secondary-600" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Vitamine D</h3>
            <p class="text-sm text-gray-600">15 min de soleil quotidien suffisent</p>
          </div>

          <div class="card p-6 text-center group hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
              <MoonIcon class="w-6 h-6 text-purple-600" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Sommeil</h3>
            <p class="text-sm text-gray-600">7-8h de sommeil pour récupérer</p>
          </div>

          <div class="card p-6 text-center group hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <HeartIcon class="w-6 h-6 text-green-600" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Activité</h3>
            <p class="text-sm text-gray-600">30 min d'exercice par jour</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  UserIcon, 
  SearchIcon, 
  EyeIcon, 
  DropletIcon, 
  SunIcon, 
  MoonIcon, 
  HeartIcon 
} from 'lucide-vue-next'

// Reactive data
const selectedCategory = ref('')
const searchQuery = ref('')

const categories = ref([
  'Prévention',
  'Nutrition',
  'Médicaments',
  'Bien-être',
  'Premiers secours',
  'Santé mentale'
])

const articles = ref([
  {
    id: 1,
    title: 'Les bienfaits des probiotiques sur la digestion',
    excerpt: 'Découvrez comment les probiotiques peuvent améliorer votre santé digestive et renforcer votre système immunitaire.',
    category: 'Nutrition',
    author: 'Dr. Pierre Martin',
    date: '15 Jan 2024',
    readTime: '4 min',
    views: '1.2k',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    title: 'Gestion du stress : techniques naturelles',
    excerpt: 'Apprenez des méthodes efficaces pour gérer le stress au quotidien sans médicaments.',
    category: 'Bien-être',
    author: 'Sophie Laurent',
    date: '12 Jan 2024',
    readTime: '6 min',
    views: '890',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    title: 'Premiers secours : que faire en cas de brûlure',
    excerpt: 'Guide pratique pour réagir correctement face à une brûlure et éviter les complications.',
    category: 'Premiers secours',
    author: 'Dr. Marie Dubois',
    date: '10 Jan 2024',
    readTime: '3 min',
    views: '2.1k',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    title: 'Interactions médicamenteuses à éviter',
    excerpt: 'Les combinaisons de médicaments dangereuses et comment les éviter pour votre sécurité.',
    category: 'Médicaments',
    author: 'Dr. Pierre Martin',
    date: '8 Jan 2024',
    readTime: '5 min',
    views: '1.5k',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    title: 'Alimentation équilibrée : les bases',
    excerpt: 'Comprendre les principes d\'une alimentation saine pour maintenir une bonne santé.',
    category: 'Nutrition',
    author: 'Sophie Laurent',
    date: '5 Jan 2024',
    readTime: '7 min',
    views: '980',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 6,
    title: 'Prévention des infections hivernales',
    excerpt: 'Conseils pratiques pour éviter les rhumes et grippes pendant la saison froide.',
    category: 'Prévention',
    author: 'Dr. Marie Dubois',
    date: '3 Jan 2024',
    readTime: '4 min',
    views: '1.8k',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
])

// Computed
const filteredArticles = computed(() => {
  let filtered = articles.value

  if (selectedCategory.value) {
    filtered = filtered.filter(article => article.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    )
  }

  return filtered
})

// SEO
useHead({
  title: 'Conseils Santé - GRAABEL-PHARMA',
  meta: [
    {
      name: 'description',
      content: 'Découvrez nos conseils santé d\'experts : prévention, nutrition, bien-être, premiers secours. Guides pratiques rédigés par nos pharmaciens.'
    }
  ]
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
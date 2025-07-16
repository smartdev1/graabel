<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div class="container-custom section-padding">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Formations Professionnelles
          </h1>
          <p class="text-xl text-blue-100 animate-fade-in">
            Développez vos compétences avec nos formations certifiées pour les professionnels de santé
          </p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="section-padding bg-white border-b">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="animate-fade-in">
            <div class="text-3xl font-bold text-primary-600 mb-2">50+</div>
            <div class="text-gray-600">Formations disponibles</div>
          </div>
          <div class="animate-fade-in">
            <div class="text-3xl font-bold text-secondary-600 mb-2">2000+</div>
            <div class="text-gray-600">Professionnels formés</div>
          </div>
          <div class="animate-fade-in">
            <div class="text-3xl font-bold text-purple-600 mb-2">98%</div>
            <div class="text-gray-600">Taux de satisfaction</div>
          </div>
          <div class="animate-fade-in">
            <div class="text-3xl font-bold text-green-600 mb-2">24h</div>
            <div class="text-gray-600">Support disponible</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section class="section-padding bg-gray-50 border-b">
      <div class="container-custom">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <!-- Category Filters -->
          <div class="flex flex-wrap gap-2">
            <button 
              @click="selectedCategory = ''"
              :class="[
                'px-4 py-2 rounded-full font-medium transition-colors',
                selectedCategory === '' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              ]"
            >
              Toutes les formations
            </button>
            <button 
              v-for="category in categories" 
              :key="category"
              @click="selectedCategory = category"
              :class="[
                'px-4 py-2 rounded-full font-medium transition-colors',
                selectedCategory === category 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              ]"
            >
              {{ category }}
            </button>
          </div>

          <!-- Search and Sort -->
          <div class="flex items-center space-x-4">
            <div class="relative">
              <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Rechercher une formation..."
                class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select 
              v-model="sortBy"
              class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="date">Plus récentes</option>
              <option value="title">Titre A-Z</option>
              <option value="duration">Durée</option>
              <option value="price">Prix</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Formations Grid -->
    <section class="section-padding bg-gray-50">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="formation in filteredFormations" 
            :key="formation.id"
            class="card group hover:shadow-lg transition-shadow"
          >
            <div class="relative overflow-hidden rounded-t-lg">
              <NuxtImg 
                :src="formation.image" 
                :alt="formation.title"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              <!-- Badges -->
              <div class="absolute top-3 left-3 space-y-1">
                <span class="bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                  {{ formation.category }}
                </span>
                <span 
                  v-if="formation.level"
                  :class="[
                    'block px-2 py-1 rounded-full text-xs font-medium',
                    formation.level === 'Débutant' ? 'bg-green-100 text-green-800' :
                    formation.level === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  ]"
                >
                  {{ formation.level }}
                </span>
              </div>

              <!-- Price -->
              <div class="absolute top-3 right-3">
                <span class="bg-primary-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                  {{ formation.price === 0 ? 'Gratuit' : formatPrice(formation.price) }}
                </span>
              </div>
            </div>

            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                {{ formation.title }}
              </h3>
              
              <p class="text-gray-600 mb-4 line-clamp-3">
                {{ formation.description }}
              </p>

              <!-- Formation Details -->
              <div class="space-y-2 mb-6">
                <div class="flex items-center text-sm text-gray-500">
                  <ClockIcon class="w-4 h-4 mr-2" />
                  <span>{{ formation.duration }}</span>
                </div>
                <div class="flex items-center text-sm text-gray-500">
                  <UsersIcon class="w-4 h-4 mr-2" />
                  <span>{{ formation.enrolled }} inscrits</span>
                </div>
                <div class="flex items-center text-sm text-gray-500">
                  <CalendarIcon class="w-4 h-4 mr-2" />
                  <span>Disponible {{ formation.availability }}</span>
                </div>
              </div>

              <!-- Rating -->
              <div class="flex items-center mb-4">
                <div class="flex items-center">
                  <StarIcon 
                    v-for="i in 5" 
                    :key="i"
                    :class="[
                      'w-4 h-4',
                      i <= formation.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    ]"
                  />
                </div>
                <span class="text-sm text-gray-500 ml-2">({{ formation.reviews }} avis)</span>
              </div>

              <!-- Instructor -->
              <div class="flex items-center mb-6">
                <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <UserIcon class="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div class="font-medium text-gray-900">{{ formation.instructor }}</div>
                  <div class="text-sm text-gray-500">{{ formation.instructorTitle }}</div>
                </div>
              </div>

              <!-- Action Button -->
              <button 
                @click="enrollFormation(formation)"
                class="w-full btn-primary"
              >
                <BookOpenIcon class="w-4 h-4 mr-2" />
                {{ formation.price === 0 ? 'Accéder gratuitement' : 'S\'inscrire' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredFormations.length === 0" class="text-center py-12">
          <BookOpenIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Aucune formation trouvée</h3>
          <p class="text-gray-600 mb-4">Essayez de modifier vos critères de recherche</p>
          <button @click="resetFilters" class="btn-primary">
            Réinitialiser les filtres
          </button>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir nos formations ?</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Une approche pédagogique innovante pour des professionnels exigeants
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="text-center group">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
              <AwardIcon class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Certifications reconnues</h3>
            <p class="text-gray-600">
              Nos formations sont certifiées et reconnues par les organismes professionnels
            </p>
          </div>

          <div class="text-center group">
            <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 transition-colors">
              <PlayCircleIcon class="w-8 h-8 text-secondary-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Contenu interactif</h3>
            <p class="text-gray-600">
              Vidéos, quiz, cas pratiques pour un apprentissage optimal
            </p>
          </div>

          <div class="text-center group">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
              <HeadphonesIcon class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Support personnalisé</h3>
            <p class="text-gray-600">
              Accompagnement individuel par nos experts tout au long de votre parcours
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-4">Prêt à développer vos compétences ?</h2>
          <p class="text-xl text-blue-100 mb-8">
            Rejoignez plus de 2000 professionnels qui ont choisi nos formations
          </p>
          <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button class="btn-secondary">
              Découvrir le catalogue
            </button>
            <button class="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
              Demander un devis
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  SearchIcon, 
  ClockIcon, 
  UsersIcon, 
  CalendarIcon, 
  StarIcon, 
  UserIcon, 
  BookOpenIcon,
  AwardIcon,
  PlayCircleIcon,
  HeadphonesIcon
} from 'lucide-vue-next'

// Reactive data
const selectedCategory = ref('')
const searchQuery = ref('')
const sortBy = ref('date')

const categories = ref([
  'Pharmacologie',
  'Conseil pharmaceutique',
  'Réglementation',
  'Phytothérapie',
  'Cosmétique',
  'Nutrition'
])

const formations = ref([
  {
    id: 1,
    title: 'Pharmacologie clinique avancée',
    description: 'Approfondissez vos connaissances en pharmacologie clinique avec cette formation complète destinée aux pharmaciens expérimentés.',
    category: 'Pharmacologie',
    level: 'Avancé',
    price: 299,
    duration: '20 heures',
    enrolled: 156,
    availability: 'immédiatement',
    rating: 4.8,
    reviews: 42,
    instructor: 'Dr. Marie Dubois',
    instructorTitle: 'Pharmacienne hospitalière',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    title: 'Conseil en phytothérapie',
    description: 'Maîtrisez les bases de la phytothérapie pour conseiller efficacement vos patients sur les plantes médicinales.',
    category: 'Phytothérapie',
    level: 'Intermédiaire',
    price: 199,
    duration: '15 heures',
    enrolled: 203,
    availability: 'immédiatement',
    rating: 4.6,
    reviews: 67,
    instructor: 'Pierre Martin',
    instructorTitle: 'Pharmacien phytothérapeute',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    title: 'Réglementation pharmaceutique 2024',
    description: 'Mise à jour complète sur la réglementation pharmaceutique française et européenne en vigueur.',
    category: 'Réglementation',
    level: 'Débutant',
    price: 0,
    duration: '8 heures',
    enrolled: 445,
    availability: 'immédiatement',
    rating: 4.4,
    reviews: 89,
    instructor: 'Sophie Laurent',
    instructorTitle: 'Juriste en droit pharmaceutique',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    title: 'Conseil cosmétique personnalisé',
    description: 'Développez vos compétences en conseil cosmétique pour répondre aux besoins spécifiques de chaque client.',
    category: 'Cosmétique',
    level: 'Intermédiaire',
    price: 149,
    duration: '12 heures',
    enrolled: 178,
    availability: 'immédiatement',
    rating: 4.7,
    reviews: 34,
    instructor: 'Dr. Marie Dubois',
    instructorTitle: 'Dermato-cosmétologue',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    title: 'Nutrition et compléments alimentaires',
    description: 'Formation complète sur la nutrition et le conseil en compléments alimentaires en officine.',
    category: 'Nutrition',
    level: 'Débutant',
    price: 179,
    duration: '10 heures',
    enrolled: 267,
    availability: 'immédiatement',
    rating: 4.5,
    reviews: 56,
    instructor: 'Pierre Martin',
    instructorTitle: 'Pharmacien nutritionniste',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 6,
    title: 'Techniques de conseil pharmaceutique',
    description: 'Perfectionnez vos techniques de communication et de conseil pour optimiser la relation avec vos patients.',
    category: 'Conseil pharmaceutique',
    level: 'Intermédiaire',
    price: 229,
    duration: '16 heures',
    enrolled: 134,
    availability: 'immédiatement',
    rating: 4.9,
    reviews: 78,
    instructor: 'Sophie Laurent',
    instructorTitle: 'Formatrice en communication',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
])

// Computed
const filteredFormations = computed(() => {
  let filtered = formations.value

  if (selectedCategory.value) {
    filtered = filtered.filter(formation => formation.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(formation => 
      formation.title.toLowerCase().includes(query) ||
      formation.description.toLowerCase().includes(query) ||
      formation.category.toLowerCase().includes(query)
    )
  }

  // Sort
  switch (sortBy.value) {
    case 'title':
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'duration':
      filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration))
      break
    case 'price':
      filtered.sort((a, b) => a.price - b.price)
      break
    default:
      // Keep original order (most recent)
      break
  }

  return filtered
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF'
  }).format(price)
}

const enrollFormation = (formation) => {
  // Simuler l'inscription
  alert(`Inscription à la formation: ${formation.title}`)
}

const resetFilters = () => {
  selectedCategory.value = ''
  searchQuery.value = ''
  sortBy.value = 'date'
}

// SEO
useHead({
  title: 'Formations Professionnelles - GRAABEL-PHARMA',
  meta: [
    {
      name: 'description',
      content: 'Formations certifiées pour pharmaciens et professionnels de santé. Pharmacologie, phytothérapie, conseil pharmaceutique et plus encore.'
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
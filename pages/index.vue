<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white relative overflow-hidden">
      <div class="container-custom section-padding">
        <!-- Slider Container -->
        <div class="h-[500px] md:h-[600px] rounded-lg overflow-hidden">
          <!-- Slides -->
          <div class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            :style="{ opacity: currentSlide === 0 ? 1 : 0 }">
            <NuxtImg
              src="https://images.pexels.com/photos/5726709/pexels-photo-5726709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Médecin souriant" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-secondary-600/80"></div>
          </div>

          <div class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            :style="{ opacity: currentSlide === 1 ? 1 : 0 }">
            <NuxtImg
              src="https://images.pexels.com/photos/3845751/pexels-photo-3845751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Pharmacien conseillant" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-secondary-600/80"></div>
          </div>

          <div class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            :style="{ opacity: currentSlide === 2 ? 1 : 0 }">
            <NuxtImg
              src="https://images.pexels.com/photos/5726707/pexels-photo-5726707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Médicaments de qualité" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-secondary-600/80"></div>
          </div>

          <!-- Content Overlay -->
          <div class="relative z-10 h-full flex items-center">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              <div class="space-y-6">
                <h1 class="text-4xl md:text-5xl font-bold leading-tight animate-fade-in">
                  Votre santé, notre priorité
                </h1>
                <p class="text-xl text-blue-100 animate-fade-in">
                  Découvrez notre pharmacie en ligne avec des produits certifiés, des conseils d'experts et une
                  livraison rapide à domicile.
                </p>
                <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in">
                  <NuxtLink to="/shop" class="btn-secondary">
                    Découvrir nos produits
                  </NuxtLink>
                  <NuxtLink to="/conseils"
                    class="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                    Conseils santé
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Dots -->
          <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            <button v-for="(slide, index) in 3" :key="index" @click="goToSlide(index)"
              class="w-3 h-3 rounded-full transition-all" :class="{
                'bg-white w-6': currentSlide === index,
                'bg-white/50': currentSlide !== index
              }"></button>
          </div>
        </div>
      </div>
    </section>
    <!-- Features Section -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="tracking-in-expand text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir GRAABEL-PHARMA ?</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Une expérience pharmaceutique moderne avec des services personnalisés
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center group">
            <div
              class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
              <ShieldCheckIcon class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Produits certifiés</h3>
            <p class="text-gray-600">Tous nos médicaments sont certifiés et approuvés par les autorités sanitaires</p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 transition-colors">
              <TruckIcon class="w-8 h-8 text-secondary-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Livraison rapide</h3>
            <p class="text-gray-600">Livraison à domicile en 24-48h partout en France</p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
              <UserIcon class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Conseil personnalisé</h3>
            <p class="text-gray-600">Nos pharmaciens experts vous accompagnent dans vos choix</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section-padding bg-gray-50">
      <div class="container-custom">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Produits phares</h2>
          <NuxtLink to="/shop" class="btn-outline">
            Voir tous les produits
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product"
            class="animate-fade-in" />
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Nos services</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Une gamme complète de services pour prendre soin de votre santé
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Carte 1 : Formations santé -->
          <div
            class="rounded-2xl overflow-hidden bg-blue-100 text-center shadow-md transition-transform hover:scale-105">
            <img
              src="https://images.pexels.com/photos/5940700/pexels-photo-5940700.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Formations santé" class="w-full h-60 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-bold text-blue-800 mb-2">Formations santé</h3>
              <p class="text-blue-900 font-medium text-base mb-4">
                Formations certifiées pour les professionnels de santé
              </p>
              <NuxtLink to="/formations" class="text-blue-700 font-semibold hover:underline">
                En savoir plus →
              </NuxtLink>
            </div>
          </div>

          <!-- Carte 2 : Consultation en ligne -->
          <div
            class="rounded-2xl overflow-hidden bg-violet-200 text-center shadow-md transition-transform hover:scale-105">
            <img
              src="https://images.pexels.com/photos/8867637/pexels-photo-8867637.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Consultation en ligne" class="w-full h-60 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-bold text-violet-800 mb-2">Consultation en ligne</h3>
              <p class="text-violet-900 font-medium text-base mb-4">
                Posez vos questions à nos pharmaciens experts
              </p>
              <NuxtLink to="#" class="text-violet-700 font-semibold hover:underline">
                Consulter →
              </NuxtLink>
            </div>
          </div>

          <!-- Carte 3 : Rappels médicaments -->
          <div
            class="rounded-2xl overflow-hidden bg-orange-200 text-center shadow-md transition-transform hover:scale-105">
            <img
              src="https://images.pexels.com/photos/8376172/pexels-photo-8376172.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Rappels médicaments" class="w-full h-60 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-bold text-orange-800 mb-2">Rappels médicaments</h3>
              <p class="text-orange-900 font-medium text-base mb-4">
                Ne manquez plus jamais vos prises de médicaments
              </p>
              <NuxtLink to="#" class="text-orange-700 font-semibold hover:underline">
                Configurer →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Section -->
    <section class="section-padding bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="tracking-in-expand text-3xl font-bold text-gray-900 mb-4">Blog et conseils</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos derniers articles et conseils santé
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="card p-6 hover:shadow-lg transition-shadow">
            <h3 class="text-xl font-semibold mb-2">Article 1</h3>
            <p class="text-gray-600 mb-4">Résumé de l'article 1</p>
            <NuxtLink to="#" class="text-primary-600 hover:text-primary-700 font-medium">
              Lire la suite →
            </NuxtLink>
          </div>

          <div class="card p-6 hover:shadow-lg transition-shadow">
            <h3 class="text-xl font-semibold mb-2">Article 2</h3>
            <p class="text-gray-600 mb-4">Résumé de l'article 2</p>
            <NuxtLink to="#" class="text-primary-600 hover:text-primary-700 font-medium">
              Lire la suite →
            </NuxtLink>
          </div>

          <div class="card p-6 hover:shadow-lg transition-shadow">
            <h3 class="text-xl font-semibold mb-2">Article 3</h3>
            <p class="text-gray-600 mb-4">Résumé de l'article 3</p>
            <NuxtLink to="#" class="text-primary-600 hover:text-primary-700 font-medium">
              Lire la suite →
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <!-- End Blog Section -->

    <!-- Newsletter Section -->
    <section class="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div class="container-custom">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-4">Restez informé</h2>
          <p class="text-xl text-blue-100 mb-8">
            Recevez nos conseils santé, promotions et actualités directement dans votre boîte mail
          </p>
          <div class="flex flex-col sm:flex-row max-w-md mx-auto">
            <input type="email" placeholder="Votre adresse email"
              class="flex-1 px-4 py-3 rounded-l-lg sm:rounded-r-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-white" />
            <button
              class="bg-white text-primary-600 px-6 py-3 rounded-r-lg sm:rounded-l-none hover:bg-gray-100 transition-colors font-medium">
              S'abonner
            </button>
          </div>
          <p class="text-sm text-blue-100 mt-4">
            Pas de spam, vous pouvez vous désabonner à tout moment
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
  .tracking-in-expand {
	animation: tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}

 @keyframes tracking-in-expand {
      0% {
        letter-spacing: -0.5em;
        opacity: 0;
      }
      40% {
        opacity: 0.6;
      }
      100% {
        opacity: 1;
      }
    }

</style>

<script setup>
import {
  ShieldCheckIcon,
  TruckIcon,
  UserIcon,
  BookOpenIcon,
  MessageCircleIcon,
  CalendarIcon
} from 'lucide-vue-next'
import { useProductsStore } from '~/stores/products'
import ProductCard from '~/components/ProductCard.vue'

const productsStore = useProductsStore()
const currentSlide = ref(0)

// Charger les produits au montage
onMounted(() => {
  productsStore.fetchProducts(),
    setInterval(() => {
      currentSlide.value = (currentSlide.value + 1) % 3
    }, 5000)

})

const goToSlide = (index) => {
  currentSlide.value = index
}

// Produits phares
const featuredProducts = computed(() => productsStore.featuredProducts)

// SEO
useHead({
  title: 'GRAABEL-PHARMA - Votre pharmacie en ligne de confiance',
  meta: [
    {
      name: 'description',
      content: 'Pharmacie en ligne certifiée avec produits pharmaceutiques, conseils santé et livraison rapide. Découvrez nos formations et consultations en ligne.'
    }
  ]
})
</script>
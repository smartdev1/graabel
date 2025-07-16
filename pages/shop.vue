<template>
  <div class="section-padding bg-gray-50">
    <div class="container-custom">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Boutique</h1>
        <p class="text-xl text-gray-600">
          Découvrez notre large gamme de produits pharmaceutiques
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:col-span-1">
          <div class="card p-6 sticky top-20">
            <h3 class="text-lg font-semibold mb-4">Filtres</h3>

            <!-- Categories -->
            <div class="mb-6">
              <h4 class="font-medium mb-3">Catégories</h4>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    v-model="filters.category"
                    class="mr-2"
                  />
                  <span>Toutes</span>
                </label>
                <label
                  v-for="category in categories"
                  :key="category"
                  class="flex items-center"
                >
                  <input
                    type="radio"
                    name="category"
                    :value="category"
                    v-model="filters.category"
                    class="mr-2"
                  />
                  <span>{{ category }}</span>
                </label>
              </div>
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <h4 class="font-medium mb-3">Prix (FCFA)</h4>
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    v-model="filters.minPrice"
                    class="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    v-model="filters.maxPrice"
                    class="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Stock Filter -->
            <div class="mb-6">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="filters.inStock"
                  class="mr-2"
                />
                <span>En stock uniquement</span>
              </label>
            </div>

            <!-- Prescription Filter -->
            <div class="mb-6">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="filters.prescriptionRequired"
                  class="mr-2"
                />
                <span>Produits sur ordonnance</span>
              </label>
            </div>

            <!-- Reset Filters -->
            <button
              @click="resetFilters"
              class="w-full btn-outline"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="lg:col-span-3">
          <!-- Results Header -->
          <div class="flex justify-between items-center mb-6">
            <p class="text-gray-600">
              {{ sortedProducts.length }} produit{{ sortedProducts.length > 1 ? 's' : '' }} trouvé{{ sortedProducts.length > 1 ? 's' : '' }}
            </p>
            <div class="flex items-center space-x-2">
              <label class="text-sm text-gray-600">Trier par :</label>
              <select
                v-model="sortBy"
                class="px-3 py-2 border rounded-lg text-sm"
              >
                <option value="name">Nom</option>
                <option value="price">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="rating">Note</option>
              </select>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="text-center py-12">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"
            ></div>
            <p class="text-gray-600 mt-4">Chargement des produits...</p>
          </div>

          <!-- Products Grid -->
          <div
            v-else-if="paginatedProducts.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <ProductCard
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="product"
              class="animate-fade-in"
            />
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <SearchIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Aucun produit trouvé
            </h3>
            <p class="text-gray-600 mb-4">
              Essayez de modifier vos critères de recherche
            </p>
            <button @click="resetFilters" class="btn-primary">
              Réinitialiser les filtres
            </button>
          </div>

          <!-- Pagination Controls -->
          <div
            v-if="totalPages > 1"
            class="mt-8 flex justify-center items-center space-x-2"
          >
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-4 py-2 border rounded disabled:opacity-50"
            >
              Précédent
            </button>

            <span class="text-gray-600">
              Page {{ currentPage }} sur {{ totalPages }}
            </span>

            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 border rounded disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { SearchIcon } from 'lucide-vue-next'
import { useProductsStore } from '~/stores/products'
import ProductCard from '~/components/ProductCard.vue'

// Store
const productsStore = useProductsStore()

// Filtres locaux
const filters = ref({
  category: '',
  minPrice: 0,
  maxPrice: 10000,
  inStock: false,
  prescriptionRequired: false
})

// Tri
const sortBy = ref('name')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(20) // 20 produits par page

// Données dérivées
const loading = computed(() => productsStore.loading)
const categories = computed(() => productsStore.categories)

// Produits filtrés
const filteredProducts = computed(() => {
  return productsStore.products.filter(product => {
    const matchesCategory = !filters.value.category || product.category === filters.value.category
    const matchesPrice = product.price >= filters.value.minPrice && product.price <= filters.value.maxPrice
    const matchesStock = !filters.value.inStock || product.inStock
    const matchesPrescription = !filters.value.prescriptionRequired || product.prescriptionRequired

    return matchesCategory && matchesPrice && matchesStock && matchesPrescription
  })
})

// Produits triés
const sortedProducts = computed(() => {
  const products = [...filteredProducts.value]

  switch (sortBy.value) {
    case 'price':
      return products.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return products.sort((a, b) => b.price - a.price)
    case 'rating':
      return products.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    default:
      return products.sort((a, b) => a.name.localeCompare(b.name))
  }
})

// Produits paginés
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return sortedProducts.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(sortedProducts.value.length / itemsPerPage.value)
})

// Réinitialiser les filtres
const resetFilters = () => {
  filters.value = {
    category: '',
    minPrice: 0,
    maxPrice: 10000,
    inStock: false,
    prescriptionRequired: false
  }
  currentPage.value = 1
}

// Remettre à la page 1 si liste change
watch([sortedProducts], () => {
  currentPage.value = 1
})

// Lifecycle
onMounted(() => {
  productsStore.fetchProducts()
})

// SEO
useHead({
  title: 'Boutique - GRAABEL-PHARMA',
  meta: [
    {
      name: 'description',
      content: 'Découvrez notre large gamme de produits pharmaceutiques certifiés. Médicaments, vitamines, matériel médical et plus encore.'
    }
  ]
})
</script>

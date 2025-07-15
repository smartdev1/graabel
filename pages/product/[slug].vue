<template>
  <div v-if="product" class="section-padding bg-gray-50">
    <div class="container-custom">
      <!-- Breadcrumb -->
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm text-gray-600">
          <li><NuxtLink to="/" class="hover:text-primary-600">Accueil</NuxtLink></li>
          <li>/</li>
          <li><NuxtLink to="/shop" class="hover:text-primary-600">Boutique</NuxtLink></li>
          <li>/</li>
          <li class="text-gray-900">{{ product.name }}</li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Images -->
        <div>
          <div class="bg-white rounded-lg shadow-sm p-8 mb-4">
            <NuxtImg 
              :src="product.image" 
              :alt="product.name"
              class="w-full h-96 object-cover rounded-lg"
            />
          </div>
          
          <!-- Additional Images -->
          <div v-if="product.images" class="grid grid-cols-4 gap-2">
            <div 
              v-for="(image, index) in product.images" 
              :key="index"
              class="bg-white rounded-lg shadow-sm p-2 cursor-pointer hover:shadow-md transition-shadow"
            >
              <NuxtImg 
                :src="image" 
                :alt="`${product.name} - Image ${index + 1}`"
                class="w-full h-20 object-cover rounded"
              />
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <div>
            <span class="text-sm text-gray-500">{{ product.category }}</span>
            <h1 class="text-3xl font-bold text-gray-900 mt-1">{{ product.name }}</h1>
          </div>

          <!-- Rating -->
          <div v-if="product.rating" class="flex items-center space-x-2">
            <div class="flex items-center">
              <StarIcon 
                v-for="i in 5" 
                :key="i"
                :class="[
                  'w-5 h-5',
                  i <= product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                ]"
              />
            </div>
            <span class="text-sm text-gray-600">({{ product.reviewCount }} avis)</span>
          </div>

          <!-- Price -->
          <div class="flex items-center space-x-4">
            <span class="text-3xl font-bold text-primary-600">{{ formatPrice(product.price) }}</span>
            <span 
              v-if="product.regularPrice && product.regularPrice > product.price" 
              class="text-xl text-gray-500 line-through"
            >
              {{ formatPrice(product.regularPrice) }}
            </span>
            <span 
              v-if="product.regularPrice && product.regularPrice > product.price" 
              class="bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full text-sm font-medium"
            >
              -{{ Math.round((1 - product.price / product.regularPrice) * 100) }}%
            </span>
          </div>

          <!-- Stock Status -->
          <div class="flex items-center space-x-2">
            <div 
              :class="[
                'w-3 h-3 rounded-full',
                product.inStock ? 'bg-green-500' : 'bg-red-500'
              ]"
            />
            <span :class="product.inStock ? 'text-green-700' : 'text-red-700'">
              {{ product.inStock ? 'En stock' : 'Rupture de stock' }}
            </span>
            <span v-if="product.inStock && product.stockQuantity <= 5" class="text-orange-600">
              ({{ product.stockQuantity }} restant{{ product.stockQuantity > 1 ? 's' : '' }})
            </span>
          </div>

          <!-- Description -->
          <div>
            <h3 class="text-lg font-semibold mb-2">Description</h3>
            <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
          </div>

          <!-- Product Details -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-if="product.sku" class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-medium text-gray-900 mb-1">Référence</h4>
              <p class="text-gray-600">{{ product.sku }}</p>
            </div>
            
            <div v-if="product.manufacturer" class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-medium text-gray-900 mb-1">Fabricant</h4>
              <p class="text-gray-600">{{ product.manufacturer }}</p>
            </div>

            <div v-if="product.dosage" class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-medium text-gray-900 mb-1">Dosage</h4>
              <p class="text-gray-600">{{ product.dosage }}</p>
            </div>

            <div v-if="product.activeIngredients" class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-medium text-gray-900 mb-1">Principe actif</h4>
              <p class="text-gray-600">{{ product.activeIngredients.join(', ') }}</p>
            </div>
          </div>

          <!-- Prescription Warning -->
          <div v-if="product.prescriptionRequired" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div class="flex items-center">
              <AlertTriangleIcon class="w-5 h-5 text-yellow-600 mr-2" />
              <div>
                <h4 class="font-medium text-yellow-800">Produit sur ordonnance</h4>
                <p class="text-sm text-yellow-700">
                  Ce médicament nécessite une ordonnance valide pour être commandé
                </p>
              </div>
            </div>
          </div>

          <!-- Quantity and Add to Cart -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center border rounded-lg">
              <button 
                @click="decreaseQuantity"
                class="p-2 hover:bg-gray-100 rounded-l-lg"
              >
                <MinusIcon class="w-4 h-4" />
              </button>
              <span class="px-4 py-2 border-l border-r">{{ quantity }}</span>
              <button 
                @click="increaseQuantity"
                class="p-2 hover:bg-gray-100 rounded-r-lg"
              >
                <PlusIcon class="w-4 h-4" />
              </button>
            </div>

            <button 
              @click="addToCart"
              :disabled="!product.inStock || (product.prescriptionRequired && !userStore.canOrderPrescription)"
              class="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCartIcon class="w-5 h-5 mr-2" />
              Ajouter au panier
            </button>

            <button class="btn-outline px-4">
              <HeartIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Additional Actions -->
          <div class="grid grid-cols-2 gap-4">
            <button class="btn-outline">
              <MessageCircleIcon class="w-4 h-4 mr-2" />
              Poser une question
            </button>
            <button class="btn-outline">
              <ShareIcon class="w-4 h-4 mr-2" />
              Partager
            </button>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Produits similaires</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id" 
            :product="relatedProduct"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="section-padding bg-gray-50">
    <div class="container-custom">
      <div class="animate-pulse">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="bg-gray-200 h-96 rounded-lg"></div>
          <div class="space-y-4">
            <div class="bg-gray-200 h-8 rounded"></div>
            <div class="bg-gray-200 h-4 rounded w-3/4"></div>
            <div class="bg-gray-200 h-6 rounded w-1/2"></div>
            <div class="bg-gray-200 h-20 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  StarIcon, 
  AlertTriangleIcon, 
  MinusIcon, 
  PlusIcon, 
  ShoppingCartIcon, 
  HeartIcon, 
  MessageCircleIcon, 
  ShareIcon 
} from 'lucide-vue-next'
import { useProductsStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'
import ProductCard from '~/components/ProductCard.vue'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const userStore = useUserStore()

const quantity = ref(1)

// Computed
const product = computed(() => productsStore.currentProduct)
const relatedProducts = computed(() => {
  if (!product.value) return []
  return productsStore.productsByCategory(product.value.category)
    .filter(p => p.id !== product.value.id)
    .slice(0, 4)
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF'
  }).format(price)
}

const increaseQuantity = () => {
  if (quantity.value < product.value.stockQuantity) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (!product.value.inStock) return
  
  if (product.value.prescriptionRequired && !userStore.canOrderPrescription) {
    alert('Ce produit nécessite une ordonnance valide')
    return
  }
  
  for (let i = 0; i < quantity.value; i++) {
    cartStore.addItem({
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      image: product.value.image,
      category: product.value.category,
      prescription_required: product.value.prescriptionRequired
    })
  }
}

// Lifecycle
onMounted(async () => {
  await productsStore.fetchProducts()
  const productId = parseInt(route.params.slug)
  await productsStore.fetchProduct(productId)
})

// SEO
useHead(() => ({
  title: product.value ? `${product.value.name} - GRAABEL-PHARMA` : 'Produit - GRAABEL-PHARMA',
  meta: [
    {
      name: 'description',
      content: product.value ? product.value.description : 'Découvrez ce produit sur GRAABEL-PHARMA'
    }
  ]
}))
</script>
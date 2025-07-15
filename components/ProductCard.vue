<template>
  <div class="card group hover:scale-105 transition-transform duration-300">
    <div class="relative overflow-hidden rounded-t-lg">
      <NuxtImg 
        :src="product.image" 
        :alt="product.name"
        class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
      />
      
      <!-- Badges -->
      <div class="absolute top-2 left-2 space-y-1">
        <span v-if="product.prescriptionRequired" class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Ordonnance
        </span>
        <span v-if="product.regularPrice && product.regularPrice > product.price" class="bg-secondary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Promo
        </span>
      </div>

      <!-- Quick Actions -->
      <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button class="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors">
          <HeartIcon class="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <!-- Stock Badge -->
      <div class="absolute bottom-2 left-2">
        <span 
          :class="[
            'px-2 py-1 rounded-full text-xs font-medium',
            product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          ]"
        >
          {{ product.inStock ? 'En stock' : 'Rupture' }}
        </span>
      </div>
    </div>

    <div class="p-4">
      <!-- Category -->
      <div class="text-sm text-gray-500 mb-1">{{ product.category }}</div>
      
      <!-- Title -->
      <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">
        <NuxtLink :to="`/product/${product.slug}`" class="hover:text-primary-600 transition-colors">
          {{ product.name }}
        </NuxtLink>
      </h3>

      <!-- Description -->
      <p class="text-sm text-gray-600 mb-3 line-clamp-2">
        {{ product.shortDescription }}
      </p>

      <!-- Rating -->
      <div v-if="product.rating" class="flex items-center mb-3">
        <div class="flex items-center">
          <StarIcon 
            v-for="i in 5" 
            :key="i"
            :class="[
              'w-4 h-4',
              i <= product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            ]"
          />
        </div>
        <span class="text-sm text-gray-500 ml-2">({{ product.reviewCount }})</span>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <span class="text-lg font-bold text-primary-600">{{ formatPrice(product.price) }}</span>
          <span 
            v-if="product.regularPrice && product.regularPrice > product.price" 
            class="text-sm text-gray-500 line-through"
          >
            {{ formatPrice(product.regularPrice) }}
          </span>
        </div>
        <div v-if="product.stockQuantity <= 5 && product.inStock" class="text-xs text-orange-600">
          Plus que {{ product.stockQuantity }} en stock
        </div>
      </div>

      <!-- Actions -->
      <div class="flex space-x-2">
        <button 
          @click="addToCart"
          :disabled="!product.inStock || (product.prescriptionRequired && !userStore.canOrderPrescription)"
          class="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCartIcon class="w-4 h-4 mr-2" />
          Ajouter
        </button>
        <NuxtLink 
          :to="`/product/${product.id}`"
          class="btn-outline px-3"
        >
          <EyeIcon class="w-4 h-4" />
        </NuxtLink>
      </div>

      <!-- Prescription Warning -->
      <div v-if="product.prescriptionRequired && !userStore.canOrderPrescription" class="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
        <AlertTriangleIcon class="w-4 h-4 inline mr-1" />
        Produit sur ordonnance uniquement
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  HeartIcon, 
  StarIcon, 
  ShoppingCartIcon, 
  EyeIcon,
  AlertTriangleIcon 
} from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const userStore = useUserStore()

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF'
  }).format(price)
}

const addToCart = () => {
  if (!props.product.inStock) return
  
  if (props.product.prescriptionRequired && !userStore.canOrderPrescription) {
    alert('Ce produit nécessite une ordonnance valide')
    return
  }
  
  cartStore.addItem({
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    image: props.product.image,
    category: props.product.category,
    prescription_required: props.product.prescriptionRequired
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
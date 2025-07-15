<template>
  <div>
    <!-- Overlay -->
    <transition name="fade">
      <div 
        v-if="cartStore.isOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-40"
        @click="cartStore.toggleCart()"
      />
    </transition>

    <!-- Sidebar -->
    <transition name="slide-right">
      <div 
        v-if="cartStore.isOpen"
        class="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b">
          <h2 class="text-lg font-semibold">Mon panier</h2>
          <button @click="cartStore.toggleCart()" class="p-2 hover:bg-gray-100 rounded-full">
            <XIcon class="w-5 h-5" />
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto p-6">
          <div v-if="cartStore.items.length === 0" class="text-center py-8">
            <ShoppingCartIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-500">Votre panier est vide</p>
            <NuxtLink to="/shop" @click="cartStore.toggleCart()" class="btn-primary mt-4 inline-block">
              Découvrir nos produits
            </NuxtLink>
          </div>

          <div v-else class="space-y-4">
            <div 
              v-for="item in cartStore.items" 
              :key="item.id"
              class="flex items-center space-x-4 p-4 border rounded-lg"
            >
              <NuxtImg 
                :src="item.image" 
                :alt="item.name"
                class="w-16 h-16 object-cover rounded-lg"
              />
              
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">{{ item.name }}</h4>
                <p class="text-sm text-gray-500">{{ item.category }}</p>
                <p class="text-sm font-medium text-primary-600">{{ formatPrice(item.price) }}</p>
              </div>

              <div class="flex items-center space-x-2">
                <button 
                  @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                  class="p-1 hover:bg-gray-100 rounded"
                >
                  <MinusIcon class="w-4 h-4" />
                </button>
                <span class="w-8 text-center">{{ item.quantity }}</span>
                <button 
                  @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                  class="p-1 hover:bg-gray-100 rounded"
                >
                  <PlusIcon class="w-4 h-4" />
                </button>
              </div>

              <button 
                @click="cartStore.removeItem(item.id)"
                class="p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="cartStore.items.length > 0" class="border-t p-6">
          <!-- Prescription Warning -->
          <div v-if="cartStore.requiresPrescription" class="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="flex items-center">
              <AlertTriangleIcon class="w-4 h-4 text-yellow-600 mr-2" />
              <span class="text-sm text-yellow-800">Votre panier contient des produits sur ordonnance</span>
            </div>
          </div>

          <!-- Summary -->
          <div class="space-y-2 mb-6">
            <div class="flex justify-between text-sm">
              <span>Sous-total</span>
              <span>{{ formatPrice(cartStore.subtotal) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Livraison</span>
              <span>{{ formatPrice(cartStore.shipping) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>TVA</span>
              <span>{{ formatPrice(cartStore.tax) }}</span>
            </div>
            <div class="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total</span>
              <span>{{ formatPrice(cartStore.grandTotal) }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="space-y-2">
            <NuxtLink 
              to="/checkout" 
              @click="cartStore.toggleCart()"
              class="w-full btn-primary block text-center"
            >
              Finaliser la commande
            </NuxtLink>
            <NuxtLink 
              to="/cart" 
              @click="cartStore.toggleCart()"
              class="w-full btn-outline block text-center"
            >
              Voir le panier
            </NuxtLink>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { 
  XIcon, 
  ShoppingCartIcon, 
  MinusIcon, 
  PlusIcon, 
  TrashIcon,
  AlertTriangleIcon 
} from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF'
  }).format(price)
}
</script>

<style scoped>
.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.3s ease;
}
.slide-right-enter-from, .slide-right-leave-to {
  transform: translateX(100%);
}
</style>
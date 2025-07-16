<template>
  <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
            <PlusIcon class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold text-gradient">GRAABEL-PHARMA</span>
        </NuxtLink>

        <!-- Navigation Desktop -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="text-gray-700 hover:text-primary-600 transition-colors">
            Accueil
          </NuxtLink>
          <NuxtLink to="/shop" class="text-gray-700 hover:text-primary-600 transition-colors">
            Boutique
          </NuxtLink>
          <NuxtLink to="/formations" class="text-gray-700 hover:text-primary-600 transition-colors">
            Formations
          </NuxtLink>
          <NuxtLink to="/conseils" class="text-gray-700 hover:text-primary-600 transition-colors">
            Conseils
          </NuxtLink>
          <NuxtLink to="/about" class="text-gray-700 hover:text-primary-600 transition-colors">
            À propos
          </NuxtLink>
          <NuxtLink to="/contact" class="text-gray-700 hover:text-primary-600 transition-colors">
            Contact
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <SearchIcon class="w-5 h-5" />
          </button>

          <!-- User Account -->
          <div ref="userMenuRef" class="relative">
            <button 
              @click="toggleUserMenu" 
              class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <UserIcon class="w-5 h-5" />
            </button>
            
            <transition name="fade">
              <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <template v-if="userStore.isAuthenticated">
                  <NuxtLink to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Mon compte
                  </NuxtLink>
                  <NuxtLink to="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Mes commandes
                  </NuxtLink>
                  <hr class="my-1">
                  <button @click="logout" class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Se déconnecter
                  </button>
                </template>
                <template v-else>
                  <NuxtLink to="/login" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Se connecter
                  </NuxtLink>
                  <NuxtLink to="/register" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    S'inscrire
                  </NuxtLink>
                </template>
              </div>
            </transition>
          </div>

          <!-- Cart -->
          <button @click="cartStore.toggleCart()" class="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <ShoppingCartIcon class="w-5 h-5" />
            <span 
              v-if="cartStore.itemCount > 0" 
              class="absolute -top-1 -right-1 bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium"
            >
              {{ cartStore.itemCount }}
            </span>
          </button>

          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu" 
            class="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MenuIcon v-if="!showMobileMenu" class="w-5 h-5" />
            <XIcon v-else class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide-up">
        <div ref="mobileMenuRef" v-if="showMobileMenu" class="md:hidden border-t border-gray-200 py-4">
          <nav class="flex flex-col space-y-2">
            <NuxtLink to="/" class="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              Accueil
            </NuxtLink>
            <NuxtLink to="/shop" class="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              Boutique
            </NuxtLink>
            <NuxtLink to="/formations" class="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              Formations
            </NuxtLink>
            <NuxtLink to="/conseils" class="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              Conseils
            </NuxtLink>
            <NuxtLink to="/about" class="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              À propos
            </NuxtLink>
            <NuxtLink to="/contact" class="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              Contact
            </NuxtLink>
          </nav>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { 
  PlusIcon, 
  SearchIcon, 
  UserIcon, 
  ShoppingCartIcon, 
  MenuIcon, 
  XIcon 
} from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'

const cartStore = useCartStore()
const userStore = useUserStore()

const showMobileMenu = ref(false)
const showUserMenu = ref(false)

const userMenuRef = ref(null)
const mobileMenuRef = ref(null)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const logout = () => {
  userStore.logout()
  showUserMenu.value = false
  navigateTo('/')
}

// Fermer les menus quand on clique ailleurs
onClickOutside(userMenuRef, () => {
  showUserMenu.value = false
})

onClickOutside(mobileMenuRef, () => {
  showMobileMenu.value = false
})
</script>
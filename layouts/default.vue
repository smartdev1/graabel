<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
    <CartSidebar />
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import CartSidebar from '~/components/CartSidebar.vue'
</script>
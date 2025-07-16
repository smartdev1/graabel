import { defineStore } from 'pinia'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  category: string
  prescription_required?: boolean
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
  total: number
  shipping: number
  tax: number
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    isOpen: false,
    total: 0,
    shipping: 5.99,
    tax: 0
  }),

  getters: {
    itemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    subtotal: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
    grandTotal: (state) => state.subtotal + state.shipping + state.tax,
    
    requiresPrescription: (state) => state.items.some(item => item.prescription_required)
  },

  actions: {
    addItem(product: Omit<CartItem, 'quantity'>) {
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      
      this.calculateTotal()
    },

    removeItem(productId: number) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.calculateTotal()
      }
    },

    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId)
        } else {
          item.quantity = quantity
          this.calculateTotal()
        }
      }
    },

    clearCart() {
      this.items = []
      this.calculateTotal()
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    },

    calculateTotal() {
      this.total = this.subtotal
      this.tax = this.total * 0.2 // 20% TVA
    }
  },

  persist: true
})
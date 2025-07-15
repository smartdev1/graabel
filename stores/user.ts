import { defineStore } from 'pinia'

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  phone?: string
  address?: {
    street: string
    city: string
    zipCode: string
    country: string
  }
  isProfessional?: boolean
  prescriptionValid?: boolean
}

export interface UserState {
  user: User | null
  isAuthenticated: boolean
  loading: false
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    isAuthenticated: false,
    loading: false
  }),

  getters: {
    fullName: (state) => {
      if (!state.user) return ''
      return `${state.user.firstName} ${state.user.lastName}`
    },
    
    canOrderPrescription: (state) => {
      return state.user?.isProfessional || state.user?.prescriptionValid
    }
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      try {
        // Simuler appel API
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock user data
        this.user = {
          id: 1,
          email,
          firstName: 'Jean',
          lastName: 'Dupont',
          phone: '0123456789',
          address: {
            street: '123 Rue de la Santé',
            city: 'Paris',
            zipCode: '75001',
            country: 'France'
          },
          isProfessional: false,
          prescriptionValid: true
        }
        
        this.isAuthenticated = true
      } catch (error) {
        throw new Error('Erreur de connexion')
      } finally {
        this.loading = false
      }
    },

    async register(userData: Omit<User, 'id'>) {
      this.loading = true
      try {
        // Simuler appel API
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        this.user = {
          id: Date.now(),
          ...userData
        }
        
        this.isAuthenticated = true
      } catch (error) {
        throw new Error('Erreur lors de l\'inscription')
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
    },

    updateProfile(updates: Partial<User>) {
      if (this.user) {
        this.user = { ...this.user, ...updates }
      }
    }
  },

  persist: true
})
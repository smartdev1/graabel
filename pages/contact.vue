<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div class="container-custom section-padding">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Contactez-nous
          </h1>
          <p class="text-xl text-blue-100 animate-fade-in">
            Notre équipe est là pour répondre à toutes vos questions
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Info & Form -->
    <section class="section-padding bg-gray-50">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Information -->
          <div class="space-y-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-6">Nos coordonnées</h2>
              <p class="text-gray-600 mb-8">
                N'hésitez pas à nous contacter pour toute question concernant nos produits, 
                services ou pour obtenir des conseils personnalisés.
              </p>
            </div>

            <!-- Contact Cards -->
            <div class="space-y-6">
              <div class="card p-6 hover:shadow-lg transition-shadow">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPinIcon class="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">Adresse</h3>
                    <p class="text-gray-600">Cocody Riviéra Jardins <br> Villa 204 Ilot A8</p>
                  </div>
                </div>
              </div>

              <div class="card p-6 hover:shadow-lg transition-shadow">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <PhoneIcon class="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">Téléphone</h3>
                    <p class="text-gray-600"> 27 22 43 17 73</p>
                    <p class="text-sm text-gray-500">Lun-Ven: 9h-19h, Sam: 9h-17h</p>
                  </div>
                </div>
              </div>

              <div class="card p-6 hover:shadow-lg transition-shadow">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MailIcon class="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">Email</h3>
                    <p class="text-gray-600">contact@graabelpharma</p>
                    <p class="text-sm text-gray-500">Réponse sous 24h</p>
                  </div>
                </div>
              </div>

              <div class="card p-6 hover:shadow-lg transition-shadow">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircleIcon class="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">Chat en direct</h3>
                    <p class="text-gray-600">Support instantané</p>
                    <button class="text-sm text-primary-600 hover:text-primary-700 font-medium mt-1">
                      Démarrer une conversation →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Emergency Contact -->
            <div class="bg-red-50 border border-red-200 rounded-lg p-6">
              <div class="flex items-center space-x-3">
                <AlertTriangleIcon class="w-6 h-6 text-red-600" />
                <div>
                  <h3 class="font-semibold text-red-900">Urgence médicale</h3>
                  <p class="text-red-700 text-sm">
                    En cas d'urgence, contactez le numero vert 185 ou  <br>
                    le 07 49 96 03 24 ou le 27 22 44 53 53 (SAMU) ou rendez-vous aux urgences
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="card p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h3>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <input 
                    v-model="form.firstName"
                    type="text" 
                    required
                    class="input-field"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input 
                    v-model="form.lastName"
                    type="text" 
                    required
                    class="input-field"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input 
                  v-model="form.email"
                  type="email" 
                  required
                  class="input-field"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input 
                  v-model="form.phone"
                  type="tel"
                  class="input-field"
                  placeholder="01 23 45 67 89"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Sujet *
                </label>
                <select 
                  v-model="form.subject"
                  required
                  class="input-field"
                >
                  <option value="">Choisissez un sujet</option>
                  <option value="question-produit">Question sur un produit</option>
                  <option value="commande">Suivi de commande</option>
                  <option value="conseil-sante">Conseil santé</option>
                  <option value="formation">Formation professionnelle</option>
                  <option value="partenariat">Partenariat</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea 
                  v-model="form.message"
                  required
                  rows="5"
                  class="input-field resize-none"
                  placeholder="Décrivez votre demande en détail..."
                ></textarea>
              </div>

              <div class="flex items-start space-x-3">
                <input 
                  v-model="form.consent"
                  type="checkbox" 
                  id="consent"
                  required
                  class="mt-1"
                />
                <label for="consent" class="text-sm text-gray-600">
                  J'accepte que mes données soient utilisées pour traiter ma demande. 
                  <NuxtLink to="#" class="text-primary-600 hover:text-primary-700">
                    Politique de confidentialité
                  </NuxtLink>
                </label>
              </div>

              <button 
                type="submit"
                :disabled="loading"
                class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading" class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Envoi en cours...
                </span>
                <span v-else class="flex items-center justify-center">
                  <SendIcon class="w-4 h-4 mr-2" />
                  Envoyer le message
                </span>
              </button>
            </form>

            <!-- Success Message -->
            <div v-if="showSuccess" class="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-center">
                <CheckCircleIcon class="w-5 h-5 text-green-600 mr-2" />
                <span class="text-green-800">Votre message a été envoyé avec succès !</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
            <p class="text-xl text-gray-600">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div class="space-y-4">
            <div 
              v-for="(faq, index) in faqs" 
              :key="index"
              class="card"
            >
              <button 
                @click="toggleFaq(index)"
                class="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span class="font-semibold text-gray-900">{{ faq.question }}</span>
                <ChevronDownIcon 
                  :class="[
                    'w-5 h-5 text-gray-500 transition-transform',
                    activeFaq === index ? 'rotate-180' : ''
                  ]"
                />
              </button>
              <div 
                v-if="activeFaq === index"
                class="px-6 pb-6 text-gray-600 animate-fade-in"
              >
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  MapPinIcon, 
  PhoneIcon, 
  MailIcon, 
  MessageCircleIcon,
  AlertTriangleIcon,
  SendIcon,
  CheckCircleIcon,
  ChevronDownIcon
} from 'lucide-vue-next'

// Form data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false
})

const loading = ref(false)
const showSuccess = ref(false)
const activeFaq = ref(null)

// FAQ data
const faqs = ref([
  {
    question: "Comment passer une commande ?",
    answer: "Vous pouvez passer commande directement sur notre site en ajoutant les produits à votre panier. Pour les médicaments sur ordonnance, vous devrez télécharger votre ordonnance lors de la commande."
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer: "Nous livrons en 24-48h partout en France métropolitaine. La livraison express en 24h est disponible pour les commandes passées avant 15h."
  },
  {
    question: "Comment obtenir des conseils pharmaceutiques ?",
    answer: "Nos pharmaciens sont disponibles par chat, téléphone ou email pour répondre à toutes vos questions. Vous pouvez également prendre rendez-vous pour une consultation personnalisée."
  },
  {
    question: "Acceptez-vous les ordonnances électroniques ?",
    answer: "Oui, nous acceptons les ordonnances électroniques. Vous pouvez les télécharger directement lors de votre commande ou nous les envoyer par email."
  },
  {
    question: "Proposez-vous des formations professionnelles ?",
    answer: "Oui, nous proposons des formations certifiées pour les professionnels de santé. Consultez notre section formations pour découvrir notre catalogue complet."
  }
])

// Methods
const submitForm = async () => {
  loading.value = true
  
  try {
    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      consent: false
    }
    
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error)
  } finally {
    loading.value = false
  }
}

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

// SEO
useHead({
  title: 'Contact - GRAABEL-PHARMA',
  meta: [
    {
      name: 'description',
      content: 'Contactez GRAABEL-PHARMA pour toutes vos questions. Notre équipe de pharmaciens experts est à votre disposition par téléphone, email ou chat.'
    }
  ]
})
</script>
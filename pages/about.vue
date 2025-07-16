<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div class="container-custom section-padding">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            À propos de GRAABEL-PHARMA
          </h1>
          <p class="text-xl text-blue-100 animate-fade-in">
            Votre partenaire santé de confiance depuis plus de 15 ans
          </p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="animate-fade-in">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Notre mission</h2>
            <p class="text-lg text-gray-700 mb-6 leading-relaxed">
              Chez GRAABEL-PHARMA, nous nous engageons à rendre les soins de santé accessibles à tous. 
              Notre mission est de fournir des produits pharmaceutiques de qualité, des conseils 
              d'experts et un service client exceptionnel.
            </p>
            <p class="text-gray-600 mb-6">
              Nous croyons que chaque personne mérite d'avoir accès à des soins de santé de qualité, 
              c'est pourquoi nous travaillons sans relâche pour offrir une expérience pharmaceutique 
              moderne et personnalisée.
            </p>
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <HeartIcon class="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Engagement qualité</h3>
                <p class="text-sm text-gray-600">Produits certifiés et contrôlés</p>
              </div>
            </div>
          </div>
          <div class="animate-fade-in">
            <NuxtImg 
              src="https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Équipe GRAABEL-PHARMA"
              class="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="section-padding bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Nos valeurs</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Les principes qui guident notre action au quotidien
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center group">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
              <ShieldCheckIcon class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Confiance</h3>
            <p class="text-gray-600">
              Nous établissons des relations durables basées sur la transparence et l'intégrité
            </p>
          </div>

          <div class="text-center group">
            <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 transition-colors">
              <UsersIcon class="w-8 h-8 text-secondary-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Proximité</h3>
            <p class="text-gray-600">
              Un accompagnement personnalisé et des conseils adaptés à chaque besoin
            </p>
          </div>

          <div class="text-center group">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
              <AwardIcon class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Excellence</h3>
            <p class="text-gray-600">
              Une recherche constante de la qualité dans tous nos services
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Notre équipe</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Des professionnels passionnés à votre service
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="card text-center group hover:shadow-lg transition-shadow">
            <div class="p-6">
              <div class="w-24 h-24 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <UserIcon class="w-12 h-12 text-white" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Dr. Marie Dubois</h3>
              <p class="text-primary-600 mb-3">Pharmacienne Titulaire</p>
              <p class="text-gray-600 text-sm">
                15 ans d'expérience en pharmacie clinique et conseil pharmaceutique
              </p>
            </div>
          </div>

          <div class="card text-center group hover:shadow-lg transition-shadow">
            <div class="p-6">
              <div class="w-24 h-24 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <UserIcon class="w-12 h-12 text-white" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Pierre Martin</h3>
              <p class="text-secondary-600 mb-3">Pharmacien Adjoint</p>
              <p class="text-gray-600 text-sm">
                Spécialiste en phytothérapie et médecines naturelles
              </p>
            </div>
          </div>

          <div class="card text-center group hover:shadow-lg transition-shadow">
            <div class="p-6">
              <div class="w-24 h-24 bg-gradient-to-r from-purple-600 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <UserIcon class="w-12 h-12 text-white" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Sophie Laurent</h3>
              <p class="text-purple-600 mb-3">Conseillère Santé</p>
              <p class="text-gray-600 text-sm">
                Experte en cosmétique et produits de parapharmacie
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="animate-fade-in">
            <div class="text-4xl font-bold mb-2">15+</div>
            <div class="text-blue-100">Années d'expérience</div>
          </div>
          <div class="animate-fade-in">
            <div class="text-4xl font-bold mb-2">10k+</div>
            <div class="text-blue-100">Clients satisfaits</div>
          </div>
          <div class="animate-fade-in">
            <div class="text-4xl font-bold mb-2">5k+</div>
            <div class="text-blue-100">Produits disponibles</div>
          </div>
          <div class="animate-fade-in">
            <div class="text-4xl font-bold mb-2">24/7</div>
            <div class="text-blue-100">Support client</div>
          </div>
        </div>
      </div>
    </section>

    <!-- History Section -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Notre histoire</h2>
            <p class="text-xl text-gray-600">
              Un parcours dédié à votre bien-être
            </p>
          </div>

          <div class="space-y-8">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold">2009</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Création de GRAABEL-PHARMA</h3>
                <p class="text-gray-600">
                  Ouverture de notre première pharmacie avec la vision de révolutionner 
                  l'accès aux soins de santé.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-secondary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold">2015</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Expansion digitale</h3>
                <p class="text-gray-600">
                  Lancement de notre plateforme en ligne pour servir nos clients 
                  partout en France.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold">2020</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Innovation santé</h3>
                <p class="text-gray-600">
                  Introduction de services de téléconsultation et de formations 
                  professionnelles.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold">2024</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Aujourd'hui</h3>
                <p class="text-gray-600">
                  Leader de la pharmacie en ligne avec plus de 10 000 clients 
                  satisfaits et une gamme complète de services.
                </p>
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
  HeartIcon, 
  ShieldCheckIcon, 
  UsersIcon, 
  AwardIcon, 
  UserIcon 
} from 'lucide-vue-next'

// SEO
useHead({
  title: 'À propos - GRAABEL-PHARMA',
  meta: [
    {
      name: 'description',
      content: 'Découvrez GRAABEL-PHARMA, votre pharmacie en ligne de confiance. Notre équipe d\'experts vous accompagne depuis plus de 15 ans pour tous vos besoins de santé.'
    }
  ]
})
</script>
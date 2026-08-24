<script setup lang="ts">
import { CAL_COM_URL } from '~/utils/navigation'

useSeoMeta({
  title: 'Contact Heya | Demande de démo et devis',
  description: 'Contactez Heya pour une démo, un devis Test/Location/Achat ou un rendez-vous avec Elise Furnon. Réponse sous 24h.'
})

const form = reactive({
  prefix: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  structureType: '',
  units: '',
  installDate: '',
  testDuration: '',
  offer: '',
  message: ''
})

const structureTypes = [
  'Résidence seniors',
  'Résidence étudiante',
  'Co-living',
  'Habitat inclusif',
  'Foyer jeunes travailleurs',
  'Copropriété',
  'Autre'
]

const testDurations = ['3 mois', '6 mois', '12 mois', 'Je ne sais pas encore']
const offers = ['Test', 'Location', 'Achat', 'À définir ensemble']

function onSubmit() {
  // Form submission to be wired to backend
}
</script>

<template>
  <div>
    <section class="bg-heya-cream py-16 sm:py-20">
      <UContainer>
        <div class="mx-auto max-w-2xl text-center">
          <p class="mb-4 text-[11px] font-semibold uppercase tracking-widest text-heya-accent">
            Contact
          </p>
          <h1 class="text-4xl font-bold text-heya-dark">
            Parlons de votre habitat partagé
          </h1>
          <p class="mt-5 text-lg text-heya-dark-border">
            Demandez une démo personnalisée, un devis pour une période de test (3, 6 ou 12 mois), ou un rendez-vous avec l'équipe Heya. Nous répondons sous 24h.
          </p>
        </div>
      </UContainer>
    </section>

    <section class="bg-white py-16 sm:py-20">
      <UContainer>
        <div class="grid gap-12 lg:grid-cols-2">
          <!-- Cal.com -->
          <div class="rounded-2xl border border-[#e1d9ca] bg-heya-cream p-8">
            <h2 class="text-xl font-bold text-heya-dark">
              Prendre rendez-vous
            </h2>
            <p class="mt-3 text-sm text-heya-dark-border">
              Idéal pour une première découverte, un échange avec Elise, des questions stratégiques.
            </p>
            <UButton
              :to="CAL_COM_URL"
              target="_blank"
              icon="i-lucide-calendar"
              class="mt-6 rounded-full bg-heya-accent text-white"
            >
              Réserver sur Cal.com
            </UButton>
          </div>

          <!-- Form -->
          <form
            class="space-y-4"
            @submit.prevent="onSubmit"
          >
            <h2 class="text-xl font-bold text-heya-dark">
              Demandez une démo ou un devis
            </h2>

            <div class="grid gap-4 sm:grid-cols-3">
              <USelect
                v-model="form.prefix"
                placeholder="Civilité"
                :items="['M.', 'Mme', 'Autre']"
              />
              <UInput
                v-model="form.firstName"
                placeholder="Prénom *"
                required
              />
              <UInput
                v-model="form.lastName"
                placeholder="Nom *"
                required
              />
            </div>

            <UInput
              v-model="form.email"
              type="email"
              placeholder="Email *"
              required
            />
            <UInput
              v-model="form.phone"
              type="tel"
              placeholder="Téléphone"
            />
            <USelect
              v-model="form.structureType"
              placeholder="Type de structure *"
              :items="structureTypes"
            />
            <UInput
              v-model="form.units"
              type="number"
              placeholder="Nombre d'unités / logements"
            />
            <UInput
              v-model="form.installDate"
              type="date"
              placeholder="Date d'installation souhaitée"
            />
            <div class="grid gap-4 sm:grid-cols-2">
              <USelect
                v-model="form.testDuration"
                placeholder="Durée de test"
                :items="testDurations"
              />
              <USelect
                v-model="form.offer"
                placeholder="Offre intéressée"
                :items="offers"
              />
            </div>
            <UTextarea
              v-model="form.message"
              placeholder="Message / Notes (180 caractères max)"
              :maxlength="180"
              :rows="3"
            />

            <UButton
              type="submit"
              class="w-full justify-center rounded-full bg-heya-accent text-white sm:w-auto"
            >
              Envoyer ma demande
            </UButton>
            <p class="text-xs text-heya-dark-border">
              Réponse sous 24h. Vos données sont protégées.
            </p>
          </form>
        </div>
      </UContainer>
    </section>
  </div>
</template>

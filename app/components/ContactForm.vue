<script setup lang="ts">
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  structureType: '',
  testDuration: '3 mois',
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

const testDurations = ['3 mois', '6 mois', '12 mois']

function onSubmit() {
  // Form submission to be wired to backend
}
</script>

<template>
  <form
    class="space-y-6"
    @submit.prevent="onSubmit"
  >
    <div class="grid gap-4 sm:grid-cols-2">
      <UFormField label="Prénom" required>
        <UInput
          v-model="form.firstName"
          placeholder="Votre prénom"
          required
        />
      </UFormField>
      <UFormField label="Nom" required>
        <UInput
          v-model="form.lastName"
          placeholder="Votre nom"
          required
        />
      </UFormField>
    </div>

    <UFormField label="Email" required>
      <UInput
        v-model="form.email"
        type="email"
        placeholder="vous@exemple.fr"
        required
      />
    </UFormField>

    <UFormField label="Téléphone">
      <UInput
        v-model="form.phone"
        type="tel"
        placeholder="06 00 00 00 00"
      />
    </UFormField>

    <UFormField label="Type de résidence" required>
      <USelect
        v-model="form.structureType"
        placeholder="Sélectionnez"
        :items="structureTypes"
      />
    </UFormField>

    <UFormField label="Durée de test">
      <URadioGroup
        v-model="form.testDuration"
        :items="testDurations"
        orientation="horizontal"
      />
    </UFormField>

    <UFormField label="Message">
      <UTextarea
        v-model="form.message"
        placeholder="Parlez-nous de votre projet..."
        :maxlength="180"
        :rows="3"
      />
    </UFormField>

    <UButton
      type="submit"
      icon="i-lucide-send"
      block
    >
      Envoyer ma demande
    </UButton>

    <p class="text-xs text-dimmed">
      Réponse sous 24h – Vos données sont protégées.
    </p>
  </form>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

interface DemoRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  structureType: string
  testDuration: string
  message: string
}

const toast = useToast()
const loading = ref(false)

const state = reactive<DemoRequest>({
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

const remainingChars = computed(() => 180 - state.message.length)

const fieldUi = {
  label: 'text-[#f1ede6] font-medium',
  error: 'text-error',
  hint: 'text-[#aaa293]',
  help: 'text-[#aaa293]'
}

const creamUi = {
  base: 'bg-[#faf6f0] text-[#3d3833] ring-[#ece6dc] placeholder:text-[#9a948c] rounded-lg'
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validate(formState: Partial<DemoRequest>): FormError[] {
  const errors: FormError[] = []
  const firstName = formState.firstName?.trim() ?? ''
  const lastName = formState.lastName?.trim() ?? ''
  const email = formState.email?.trim() ?? ''
  const phone = formState.phone?.trim() ?? ''
  const digits = phone.replace(/\D/g, '')

  if (!firstName) {
    errors.push({ name: 'firstName', message: 'Indiquez votre prénom' })
  }

  if (!lastName) {
    errors.push({ name: 'lastName', message: 'Indiquez votre nom' })
  }

  if (!email) {
    errors.push({ name: 'email', message: 'Indiquez votre email' })
  } else if (!isValidEmail(email)) {
    errors.push({ name: 'email', message: 'Cet email ne semble pas valide' })
  }

  if (phone && digits.length < 8) {
    errors.push({ name: 'phone', message: 'Indiquez un numéro plus complet' })
  }

  if (!formState.structureType) {
    errors.push({ name: 'structureType', message: 'Choisissez un type de résidence' })
  }

  if ((formState.message?.length ?? 0) > 180) {
    errors.push({ name: 'message', message: '180 caractères maximum' })
  }

  return errors
}

async function onSubmit(_event: FormSubmitEvent<DemoRequest>) {
  loading.value = true

  await new Promise(resolve => setTimeout(resolve, 400))

  toast.add({
    title: 'Demande envoyée',
    description: 'Nous vous répondons sous 24h.',
    color: 'success',
    icon: 'i-lucide-check'
  })

  state.firstName = ''
  state.lastName = ''
  state.email = ''
  state.phone = ''
  state.structureType = ''
  state.testDuration = '3 mois'
  state.message = ''
  loading.value = false
}
</script>

<template>
  <UForm
    class="contact-form-dark space-y-5"
    :state="state"
    :validate="validate"
    :validate-on="['blur', 'change']"
    @submit="onSubmit"
  >
    <div class="grid gap-4 sm:grid-cols-2">
      <UFormField
        name="firstName"
        label="Prénom"
        required
        :ui="fieldUi"
      >
        <UInput
          v-model="state.firstName"
          placeholder="Votre prénom"
          autocomplete="given-name"
          size="lg"
          color="neutral"
          :ui="creamUi"
        />
      </UFormField>
      <UFormField
        name="lastName"
        label="Nom"
        required
        :ui="fieldUi"
      >
        <UInput
          v-model="state.lastName"
          placeholder="Votre nom"
          autocomplete="family-name"
          size="lg"
          color="neutral"
          :ui="creamUi"
        />
      </UFormField>
    </div>

    <UFormField
      name="email"
      label="Email"
      required
      :ui="fieldUi"
    >
      <UInput
        v-model="state.email"
        type="email"
        placeholder="vous@exemple.fr"
        autocomplete="email"
        inputmode="email"
        size="lg"
        color="neutral"
        :ui="creamUi"
      />
    </UFormField>

    <UFormField
      name="phone"
      label="Téléphone"
      :ui="fieldUi"
    >
      <UInput
        v-model="state.phone"
        type="tel"
        placeholder="06 00 00 00 00"
        autocomplete="tel"
        inputmode="tel"
        size="lg"
        color="neutral"
        :ui="creamUi"
      />
    </UFormField>

    <UFormField
      name="structureType"
      label="Type de résidence"
      required
      :ui="fieldUi"
    >
      <USelect
        v-model="state.structureType"
        placeholder="Sélectionnez"
        :items="structureTypes"
        size="lg"
        color="neutral"
        trailing-icon="i-lucide-chevron-down"
        class="w-full"
        :ui="creamUi"
      />
    </UFormField>

    <UFormField
      name="testDuration"
      label="Durée de test"
      :ui="fieldUi"
    >
      <URadioGroup
        v-model="state.testDuration"
        :items="testDurations"
        orientation="horizontal"
        color="primary"
        size="lg"
        :ui="{
          fieldset: 'gap-x-6',
          label: 'text-[#f1ede6] font-medium',
          indicator: 'after:bg-[#faf6f0]'
        }"
      />
    </UFormField>

    <UFormField
      name="message"
      label="Message"
      :hint="`${remainingChars} caractères`"
      :ui="fieldUi"
    >
      <UTextarea
        v-model="state.message"
        placeholder="Parlez-nous de votre projet..."
        autoresize
        :maxrows="6"
        :maxlength="180"
        :rows="3"
        color="neutral"
        :ui="creamUi"
      />
    </UFormField>

    <UButton
      type="submit"
      icon="i-lucide-send"
      size="lg"
      block
      :loading="loading"
    >
      Envoyer ma demande
    </UButton>

    <p class="text-center text-xs text-[#aaa293]">
      Réponse sous 24h. Vos données sont protégées.
    </p>
  </UForm>
</template>

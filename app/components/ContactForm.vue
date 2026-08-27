<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import {
  contactRequestSchema,
  structureTypes,
  testDurations,
  type ContactRequest,
  type ContactRequestForm
} from '#shared/schemas/contact'

const toast = useToast()
const loading = ref(false)

const state = reactive<ContactRequestForm>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  structureType: '',
  testDuration: '3 mois',
  message: ''
})

const remainingChars = computed(() => 180 - (state.message?.length ?? 0))

const structureTypeModel = computed({
  get: () => state.structureType as (typeof structureTypes)[number] | undefined,
  set: (value: (typeof structureTypes)[number] | undefined) => {
    state.structureType = value ?? ''
  }
})

const fieldUi = {
  label: 'text-[#f1ede6] font-medium',
  error: 'text-error',
  hint: 'text-[#aaa293]',
  help: 'text-[#aaa293]'
}

const creamUi = {
  base: 'bg-[#faf6f0] text-[#3d3833] ring-[#ece6dc] placeholder:text-[#9a948c] rounded-lg'
}

async function onSubmit(_event: FormSubmitEvent<ContactRequest>) {
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
    :schema="contactRequestSchema"
    :state="state"
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
        v-model="structureTypeModel"
        placeholder="Sélectionnez"
        :items="[...structureTypes]"
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
        :items="[...testDurations]"
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

<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import { loginSchema, type LoginInput } from '#shared/schemas/auth'

definePageMeta({
  layout: false,
  auth: 'guest'
})

const signInEmail = useSignIn('email')

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'elise@heyaconvivialite.fr',
    required: true,
    autocomplete: 'email',
    icon: 'i-lucide-mail'
  },
  {
    name: 'password',
    type: 'password',
    label: 'Mot de passe',
    placeholder: 'Votre mot de passe',
    required: true,
    autocomplete: 'current-password',
    icon: 'i-lucide-lock-keyhole'
  }
]

const error = ref<string | null>(null)
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<LoginInput>) {
  error.value = null
  loading.value = true

  try {
    await signInEmail.execute(
      { email: event.data.email, password: event.data.password },
      { onSuccess: () => { void navigateTo('/admin') } }
    )
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Connexion impossible'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="admin-login min-h-[100dvh] lg:grid lg:grid-cols-2">
    <aside
      class="relative hidden overflow-hidden bg-heya-neutral-50 lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-14"
      aria-hidden="true"
    >
      <div
        class="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-heya-200/50 blur-3xl"
      />
      <div
        class="pointer-events-none absolute -bottom-16 -left-16 size-56 rounded-full bg-heya-violet-200/40 blur-3xl"
      />

      <div class="relative">
        <AppLogo class="h-9 w-auto" />
      </div>

      <div class="relative max-w-md space-y-4">
        <p class="text-sm font-semibold uppercase tracking-widest text-primary">
          Administration
        </p>
        <h1 class="text-3xl font-bold tracking-tight text-heya-neutral-800 text-balance">
          Gérez le contenu de heyaconvivialite.fr
        </h1>
        <p class="text-base leading-relaxed text-heya-neutral-600">
          Pages, articles de blog et publications planifiées depuis un seul espace.
        </p>
      </div>

      <p class="relative text-sm text-heya-neutral-500">
        Accès réservé à l'équipe Heya.
      </p>
    </aside>

    <main class="flex flex-col justify-center px-4 py-10 sm:px-8 lg:px-12 xl:px-16">
      <div class="mx-auto w-full max-w-md space-y-8">
        <div class="space-y-6 lg:hidden">
          <AppLogo class="mx-auto h-8 w-auto" />
        </div>

        <UPageCard
          variant="subtle"
          :ui="{
            root: 'rounded-[1.25rem] bg-elevated shadow-[var(--shadow-heya)] ring ring-default',
            container: 'p-6 sm:p-8'
          }"
        >
          <UAuthForm
            :schema="loginSchema"
            :fields="fields"
            :loading="loading"
            title="Connexion"
            description="Identifiez-vous pour accéder au tableau de bord."
            icon="i-lucide-shield-check"
            :submit="{
              label: 'Se connecter',
              block: true,
              size: 'lg'
            }"
            :ui="{
              title: 'text-2xl font-semibold text-highlighted',
              description: 'text-sm text-muted',
              leadingIcon: 'size-7 text-primary',
              form: 'space-y-5'
            }"
            @submit="onSubmit"
          >
            <template
              v-if="error"
              #validation
            >
              <UAlert
                color="error"
                variant="subtle"
                icon="i-lucide-circle-alert"
                :title="error"
              />
            </template>

            <template #footer>
              <ULink
                to="/"
                class="text-sm font-medium text-muted transition-colors hover:text-primary"
              >
                Retour au site public
              </ULink>
            </template>
          </UAuthForm>
        </UPageCard>

        <p class="text-center text-xs text-heya-neutral-500">
          Besoin d'aide ?
          <ULink
            to="/contact"
            class="font-medium text-heya-neutral-700 underline-offset-2 hover:text-primary hover:underline"
          >
            Contactez l'équipe
          </ULink>
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.admin-login {
  background:
    radial-gradient(ellipse 80% 50% at 50% -10%, rgb(255 118 60 / 0.08), transparent 55%),
    var(--ui-bg);
}
</style>

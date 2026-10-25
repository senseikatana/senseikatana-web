<script setup lang="ts">
import { site } from '~~/data/site'

const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const loading = ref(false)

/*
  Frontend only — no delivery endpoint yet.

  There is no backend, so this must NOT report success. Faking "sent" loses
  leads: the visitor believes the message arrived and moves on. Until a
  provider is wired up, the page explains itself and points at the channels
  that genuinely work.
*/
const hasBackend = false

const handleSubmit = () => {
  if (!hasBackend) return
}

const channels = computed(() => [
  {
    icon: 'i-simple-icons-whatsapp',
    label: t('contact.whatsappAction'),
    value: 'WhatsApp',
    href: '/contact/whatsapp',
    external: false,
  },
  {
    icon: 'i-lucide-phone',
    label: t('contact.callAction'),
    value: t('contact.callAction'),
    href: '/contact/call',
    external: false,
  },
  {
    icon: 'i-simple-icons-linkedin',
    label: t('contact.linkedinAction'),
    value: 'linkedin.com/in/senseijurado',
    href: site.linkedin,
    external: true,
  },
])

useSeoMeta({
  title: () => t('contact.title'),
  description: () => t('contact.subtitle'),
})
</script>

<template>
  <div>
    <!-- ── Cabecera ─────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden border-b border-dark-700/60">
      <div class="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-950" />
      <div
        class="glow-accent absolute inset-0"
        style="--glow-at: 20% 50%"
      />
      <div class="scanline absolute inset-0" />

      <UContainer class="relative py-20 lg:py-24">
        <div class="reveal max-w-3xl">
          <SectionMarker :label="t('contact.title')" />
          <h1 class="font-display text-6xl leading-[0.85] md:text-8xl">
            {{ t('contact.title') }}<span class="text-forge-500">.</span>
          </h1>
          <p class="mt-5 text-lg leading-relaxed text-white-400">
            {{ t('contact.subtitle') }}
          </p>
        </div>
      </UContainer>
    </section>

    <!-- ── Contenido ────────────────────────────────────────────────────── -->
    <section class="py-16 lg:py-20">
      <UContainer>
        <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p class="mb-8 text-lg leading-relaxed text-white-200">
              {{ t('contact.intro') }}
            </p>

            <div class="mb-8 flex flex-col gap-4">
              <a
                v-for="channel in channels"
                :key="channel.label"
                :href="channel.href"
                :target="channel.external ? '_blank' : undefined"
                :rel="channel.external ? 'noopener noreferrer' : undefined"
                class="q-contact-link"
              >
                <span class="q-contact-icon">
                  <UIcon
                    :name="channel.icon"
                    class="size-5"
                  />
                </span>
                <span>
                  <span class="q-contact-label block">{{ channel.label }}</span>
                  <span class="q-contact-value">{{ channel.value }}</span>
                </span>
              </a>

              <div class="q-contact-link">
                <span class="q-contact-icon">
                  <UIcon
                    name="i-lucide-map-pin"
                    class="size-5"
                  />
                </span>
                <span>
                  <span class="q-contact-label block">{{ t('about.location') }}</span>
                  <span class="q-contact-value">{{ t('contact.location') }}</span>
                </span>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <UCard
              v-if="hasBackend"
              class="border-dark-700/50 bg-dark-800/60"
            >
              <UForm
                :state="form"
                @submit="handleSubmit"
              >
                <UFormField
                  :label="t('contact.name')"
                  name="name"
                  class="mb-4"
                >
                  <UInput
                    v-model="form.name"
                    :placeholder="t('contact.namePlaceholder')"
                  />
                </UFormField>

                <UFormField
                  :label="t('contact.email')"
                  name="email"
                  class="mb-4"
                >
                  <UInput
                    v-model="form.email"
                    type="email"
                    :placeholder="t('contact.emailPlaceholder')"
                  />
                </UFormField>

                <UFormField
                  :label="t('contact.message')"
                  name="message"
                  class="mb-4"
                >
                  <UTextarea
                    v-model="form.message"
                    :placeholder="t('contact.messagePlaceholder')"
                    :rows="5"
                  />
                </UFormField>

                <UButton
                  type="submit"
                  block
                  :loading="loading"
                >
                  {{ t('contact.send') }}
                </UButton>
              </UForm>
            </UCard>

            <UCard
              v-else
              class="border-dark-700/50 bg-dark-800/60"
            >
              <div class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-info"
                  class="mt-0.5 size-5 shrink-0 text-amber-400"
                />
                <div>
                  <p class="text-white-200">
                    {{ t('contact.noBackendTitle') }}
                  </p>
                  <p class="mt-1 text-white-400">
                    {{ t('contact.noBackendBody') }}
                  </p>
                  <div class="mt-4 flex flex-wrap gap-3">
                    <UButton
                      href="/contact/whatsapp"
                      icon="i-lucide-message-circle"
                      size="sm"
                      variant="solid"
                    >
                      {{ t('contact.whatsappAction') }}
                    </UButton>
                    <UButton
                      href="/contact/call"
                      icon="i-lucide-phone"
                      size="sm"
                      variant="outline"
                      class="border-dark-600 text-white-300"
                    >
                      {{ t('contact.callAction') }}
                    </UButton>
                  </div>
                </div>
              </div>
            </UCard>

            <div class="card-forge p-6">
              <h2 class="mb-3 font-display text-2xl uppercase tracking-wide">
                {{ t('contact.responseTitle') }}
              </h2>
              <p class="text-sm leading-relaxed text-white-400">
                {{ t('contact.responseBody') }}
              </p>
            </div>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>

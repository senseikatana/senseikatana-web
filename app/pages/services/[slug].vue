<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { t } = useI18n()
const localePath = useLocalePath()

const { data: service } = await useAsyncData(`service-${slug}`, () =>
  queryCollection('services')
    .path(`/services/${slug}`)
    .first(),
)

if (!service.value) {
  throw createError({ statusCode: 404, message: t('services.empty') })
}

useSeoMeta({
  title: () => service.value?.title,
  description: () => service.value?.description,
})
</script>

<template>
  <div v-if="service">
    <!-- ── Cabecera ─────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden border-b border-dark-700/60">
      <div class="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-950" />
      <div
        class="glow-accent absolute inset-0"
        style="--glow-at: 80% 25%"
      />
      <div class="scanline absolute inset-0" />

      <UContainer class="relative py-20 lg:py-24">
        <div class="reveal max-w-3xl">
          <NuxtLink
            :to="localePath('/services')"
            class="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white-500 transition-colors hover:text-forge-500"
          >
            <UIcon
              name="i-lucide-arrow-left"
              class="size-3.5"
            />
            {{ t('services.back') }}
          </NuxtLink>

          <span class="mb-6 grid size-14 place-items-center border border-forge-500/30 bg-forge-500/5 text-forge-500">
            <UIcon
              :name="service.icon || 'i-lucide-box'"
              class="size-6"
            />
          </span>

          <h1 class="font-display text-5xl uppercase leading-[0.9] tracking-wide md:text-7xl">
            {{ service.title }}<span class="text-forge-500">.</span>
          </h1>
          <p class="mt-5 text-lg leading-relaxed text-white-400">
            {{ service.description }}
          </p>
        </div>
      </UContainer>
    </section>

    <!-- ── Cuerpo ───────────────────────────────────────────────────────── -->
    <section class="py-16 lg:py-20">
      <UContainer>
        <div class="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <article class="prose prose-invert max-w-none">
            <ContentRenderer :value="service" />
          </article>

          <aside class="space-y-8">
            <div
              v-if="service.deliverables?.length"
              class="card-forge p-6"
            >
              <h2 class="mb-4 font-heading text-xs uppercase tracking-[0.2em] text-forge-500">
                {{ t('services.includesTitle') }}
              </h2>
              <ul class="space-y-3">
                <li
                  v-for="item in service.deliverables"
                  :key="item"
                  class="flex gap-2 text-sm leading-relaxed text-white-300"
                >
                  <UIcon
                    name="i-lucide-check"
                    class="mt-0.5 size-4 shrink-0 text-forge-500"
                  />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <div
              v-if="service.stack?.length"
              class="card-forge p-6"
            >
              <h2 class="mb-4 font-heading text-xs uppercase tracking-[0.2em] text-forge-500">
                {{ t('services.stackTitle') }}
              </h2>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="item in service.stack"
                  :key="item"
                  class="rounded-full border border-dark-600 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white-400"
                >
                  {{ item }}
                </span>
              </div>
            </div>

            <div class="card-forge p-6">
              <h2 class="mb-3 font-display text-2xl uppercase tracking-wide">
                {{ t('services.ctaTitle') }}
              </h2>
              <p class="mb-5 text-sm leading-relaxed text-white-400">
                {{ t('services.ctaBody') }}
              </p>
              <NuxtLink
                :to="localePath('/contact')"
                class="q-btn q-btn-primary w-full justify-center"
              >
                {{ t('services.ctaButton') }}
              </NuxtLink>
            </div>
          </aside>
        </div>
      </UContainer>
    </section>
  </div>
</template>

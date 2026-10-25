<script setup lang="ts">
const { locale, t } = useI18n()
const localePath = useLocalePath()

const { data: services } = await useAsyncData(`services-${locale.value}`, () =>
  queryCollection('services')
    .where('draft', '=', false)
    .order('order', 'ASC')
    .all(),
)

useSeoMeta({
  title: () => t('services.title'),
  description: () => t('services.subtitle'),
})
</script>

<template>
  <div>
    <!-- ── Cabecera ─────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden border-b border-dark-700/60">
      <div class="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-950" />
      <div
        class="glow-accent absolute inset-0"
        style="--glow-at: 18% 45%"
      />
      <div class="scanline absolute inset-0" />

      <UContainer class="relative py-20 lg:py-24">
        <div class="reveal max-w-3xl">
          <SectionMarker :label="t('services.eyebrow')" />
          <h1 class="font-display text-6xl leading-[0.85] md:text-8xl">
            {{ t('services.title') }}<span class="text-forge-500">.</span>
          </h1>
          <p class="mt-5 text-lg leading-relaxed text-white-400">
            {{ t('services.subtitle') }}
          </p>
        </div>
      </UContainer>
    </section>

    <!-- ── Listado ──────────────────────────────────────────────────────── -->
    <section class="py-16 lg:py-20">
      <UContainer>
        <div
          v-if="services?.length"
          class="reveal-stagger grid gap-5 md:grid-cols-2"
        >
          <NuxtLink
            v-for="service in services"
            :key="service.path"
            :to="localePath(service.path)"
            class="card-forge group flex flex-col p-6 transition-colors hover:border-forge-500/60"
          >
            <div class="mb-5 flex items-start justify-between gap-4">
              <span class="grid size-11 place-items-center border border-forge-500/30 bg-forge-500/5 text-forge-500">
                <UIcon
                  :name="service.icon || 'i-lucide-box'"
                  class="size-5"
                />
              </span>
              <span class="font-mono text-[11px] uppercase tracking-[0.2em] text-white-500">
                0{{ service.order }}
              </span>
            </div>

            <h2 class="mb-3 font-display text-2xl uppercase tracking-wide text-white-50 transition-colors group-hover:text-forge-500">
              {{ service.title }}
            </h2>
            <p class="mb-5 flex-1 text-sm leading-relaxed text-white-400">
              {{ service.description }}
            </p>

            <div
              v-if="service.stack?.length"
              class="mb-5 flex flex-wrap gap-2"
            >
              <span
                v-for="item in service.stack"
                :key="item"
                class="rounded-full border border-dark-600 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white-400"
              >
                {{ item }}
              </span>
            </div>

            <span class="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-forge-500">
              {{ t('works.view') }}
              <UIcon
                name="i-lucide-arrow-right"
                class="size-3.5"
              />
            </span>
          </NuxtLink>
        </div>

        <p
          v-else
          class="py-24 text-center text-white-400"
        >
          {{ t('services.empty') }}
        </p>
      </UContainer>
    </section>
  </div>
</template>

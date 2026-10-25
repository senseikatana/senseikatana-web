<script setup lang="ts">
const { locale, t } = useI18n()
const localePath = useLocalePath()

const { data: works } = await useAsyncData(`works-${locale.value}`, () =>
  queryCollection('works')
    .where('draft', '=', false)
    .order('order', 'ASC')
    .all(),
)

useSeoMeta({
  title: () => t('works.title'),
  description: () => t('works.subtitle'),
})
</script>

<template>
  <div>
    <!-- ── Cabecera ─────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden border-b border-dark-700/60">
      <div class="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-950" />
      <div
        class="glow-accent absolute inset-0"
        style="--glow-at: 25% 35%"
      />
      <div class="scanline absolute inset-0" />

      <UContainer class="relative py-20 lg:py-24">
        <div class="reveal max-w-3xl">
          <SectionMarker :label="t('works.eyebrow')" />
          <h1 class="font-display text-6xl leading-[0.85] md:text-8xl">
            {{ t('works.title') }}<span class="text-forge-500">.</span>
          </h1>
          <p class="mt-5 text-lg leading-relaxed text-white-400">
            {{ t('works.subtitle') }}
          </p>
        </div>
      </UContainer>
    </section>

    <!-- ── Listado ──────────────────────────────────────────────────────── -->
    <section class="py-16 lg:py-20">
      <UContainer>
        <div
          v-if="works?.length"
          class="reveal-stagger grid gap-6 md:grid-cols-2"
        >
          <article
            v-for="work in works"
            :key="work.path"
            class="card-forge group flex flex-col overflow-hidden"
          >
            <div class="flex flex-1 flex-col p-6">
              <div class="mb-4 flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.15em]">
                <span class="text-forge-500">
                  {{ work.sector }}
                </span>
                <span class="text-white-500">{{ work.year }}</span>
              </div>

              <h2 class="mb-3 font-display text-3xl uppercase tracking-wide text-white-50 transition-colors group-hover:text-forge-500">
                {{ work.title }}
              </h2>
              <p class="mb-5 flex-1 text-sm leading-relaxed text-white-400">
                {{ work.description }}
              </p>

              <div
                v-if="work.stack?.length"
                class="mb-6 flex flex-wrap gap-2"
              >
                <span
                  v-for="item in work.stack"
                  :key="item"
                  class="rounded-full border border-dark-600 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white-400"
                >
                  {{ item }}
                </span>
              </div>

              <NuxtLink
                :to="localePath(work.path)"
                class="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-forge-500 transition-colors hover:text-forge-400"
              >
                {{ t('works.view') }}
                <UIcon
                  name="i-lucide-arrow-up-right"
                  class="size-3.5"
                />
              </NuxtLink>
            </div>
          </article>
        </div>

        <p
          v-else
          class="py-24 text-center text-white-400"
        >
          {{ t('works.empty') }}
        </p>
      </UContainer>
    </section>
  </div>
</template>

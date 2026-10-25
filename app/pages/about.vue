<script setup lang="ts">
import { site } from '~~/data/site'

const { t, tm } = useI18n()
const localePath = useLocalePath()

const principles = computed(() => tm('about.principles') as { title: string, body: string }[])

const stack = [
  { title: 'Frontend', items: ['Nuxt', 'Vue', 'Astro', 'Next', 'React', 'TypeScript', 'Tailwind'] },
  { title: 'Backend', items: ['Python', 'FastAPI', 'Node', 'Bun', 'Prisma', 'PostgreSQL', 'SQLite'] },
  { title: 'Infra', items: ['Cloudflare', 'Docker', 'GitHub Actions', 'Vercel', 'Linux'] },
  { title: 'Herramientas', items: ['Stripe', 'InsForge', 'Vitest', 'Playwright', 'ESLint'] },
]

useSeoMeta({
  title: () => t('about.title'),
  description: () => t('about.lead'),
})
</script>

<template>
  <div>
    <!-- ── Cabecera ─────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden border-b border-dark-700/60">
      <div class="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-950" />
      <div
        class="glow-accent absolute inset-0"
        style="--glow-at: 80% 20%"
      />
      <div class="scanline absolute inset-0" />

      <UContainer class="relative py-20 lg:py-28">
        <div class="flex flex-col items-start gap-12 lg:flex-row lg:gap-16">
          <div class="reveal max-w-2xl flex-1">
            <SectionMarker :label="t('about.eyebrow')" />

            <h1 class="mb-4 font-display text-5xl leading-[0.9] uppercase md:text-7xl">
              {{ t('about.title') }}<span class="text-forge-500">.</span>
            </h1>

            <p class="mb-8 text-lg leading-relaxed text-white-300 md:text-xl">
              {{ t('about.lead') }}
            </p>

            <div class="mb-10 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white-400">
              <span class="flex items-center gap-1.5">
                <UIcon
                  name="i-lucide-map-pin"
                  class="text-forge-500"
                />
                {{ t('about.location') }}
              </span>
              <a
                :href="site.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 transition-colors hover:text-white-50"
              >
                <UIcon
                  name="i-simple-icons-linkedin"
                  class="text-forge-500"
                />
                LinkedIn
              </a>
              <a
                :href="site.github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 transition-colors hover:text-white-50"
              >
                <UIcon
                  name="i-simple-icons-github"
                  class="text-forge-500"
                />
                GitHub
              </a>
            </div>

            <NuxtLink
              :to="localePath('/contact')"
              class="q-btn q-btn-primary"
            >
              {{ t('about.ctaButton') }}
            </NuxtLink>
          </div>

          <div
            class="reveal shrink-0"
            style="--reveal-delay: 0.2s"
          >
            <div class="notch-corner p-2">
              <div class="size-48 md:size-56 lg:size-64">
                <ProfileAvatar
                  :alt="t('about.title')"
                  :size="384"
                />
              </div>
              <p class="mt-4 max-w-56 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white-500">
                {{ t('about.caption') }}
              </p>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ── Bio ──────────────────────────────────────────────────────────── -->
    <section class="py-20 lg:py-24">
      <UContainer class="max-w-3xl">
        <SectionMarker :label="t('about.bioTitle')" />
        <h2 class="mb-6 font-display text-4xl uppercase md:text-5xl">
          {{ t('about.bioTitle') }}
        </h2>
        <p class="mb-5 text-lg leading-relaxed text-white-300">
          {{ t('about.bio1') }}
        </p>
        <p class="text-lg leading-relaxed text-white-400">
          {{ t('about.bio2') }}
        </p>
      </UContainer>
    </section>

    <!-- ── Principios ───────────────────────────────────────────────────── -->
    <section class="border-y border-dark-700/60 bg-dark-900 py-20 lg:py-24">
      <UContainer>
        <div class="mb-12 max-w-2xl">
          <SectionMarker :label="t('about.principlesTitle')" />
          <h2 class="q-section-title q-left">
            {{ t('about.principlesTitle') }}
          </h2>
        </div>

        <div class="reveal-stagger grid gap-5 md:grid-cols-2">
          <article
            v-for="(principle, index) in principles"
            :key="principle.title"
            class="card-forge p-6"
          >
            <span class="mb-4 block font-mono text-[11px] uppercase tracking-[0.2em] text-forge-500">
              0{{ index + 1 }}
            </span>
            <h3 class="mb-2 font-display text-2xl uppercase tracking-wide text-white-50">
              {{ principle.title }}
            </h3>
            <p class="text-sm leading-relaxed text-white-400">
              {{ principle.body }}
            </p>
          </article>
        </div>
      </UContainer>
    </section>

    <!-- ── Stack ────────────────────────────────────────────────────────── -->
    <section class="py-20 lg:py-24">
      <UContainer>
        <div class="mb-12 max-w-2xl">
          <SectionMarker :label="t('about.stackTitle')" />
          <h2 class="q-section-title q-left">
            {{ t('about.stackTitle') }}
          </h2>
          <p class="q-section-subtitle q-left">
            {{ t('about.stackSubtitle') }}
          </p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="group in stack"
            :key="group.title"
            class="card-forge p-6"
          >
            <h3 class="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-forge-500">
              {{ group.title }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="item in group.items"
                :key="item"
                class="rounded-full border border-dark-600 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white-400"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ── Open source + CTA ────────────────────────────────────────────── -->
    <section class="border-t border-dark-700/50 py-20 lg:py-24">
      <UContainer>
        <div class="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div class="reveal">
            <SectionMarker :label="t('about.openSourceTitle')" />
            <h2 class="q-section-title q-left q-gradient-text">
              {{ t('about.openSourceTitle') }}
            </h2>
            <p class="max-w-xl leading-relaxed text-white-400">
              {{ t('about.openSourceBody') }}
            </p>
            <a
              href="https://github.com/senseikatana"
              target="_blank"
              rel="noopener noreferrer"
              class="q-btn q-btn-outline mt-8"
            >
              <UIcon
                name="i-simple-icons-github"
                class="size-4"
              />
              GitHub
            </a>
          </div>

          <div
            class="reveal bracket-frame border border-dark-700 bg-dark-900/40 p-8 text-center lg:p-10"
            style="--reveal-delay: 0.1s"
          >
            <h2 class="mb-4 font-display text-3xl uppercase tracking-wide md:text-4xl">
              {{ t('about.ctaTitle') }}
            </h2>
            <p class="mb-7 text-white-400">
              {{ t('about.ctaBody') }}
            </p>
            <NuxtLink
              :to="localePath('/contact')"
              class="q-btn q-btn-primary"
            >
              {{ t('about.ctaButton') }}
            </NuxtLink>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>

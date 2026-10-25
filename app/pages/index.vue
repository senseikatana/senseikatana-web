<script setup lang="ts">
const { locale, t, tm } = useI18n()
const localePath = useLocalePath()

const { data: services } = await useAsyncData(`home-services-${locale.value}`, () =>
  queryCollection('services')
    .where('draft', '=', false)
    .order('order', 'ASC')
    .all(),
)

const { data: works } = await useAsyncData(`home-works-${locale.value}`, () =>
  queryCollection('works')
    .where('draft', '=', false)
    .order('order', 'ASC')
    .limit(3)
    .all(),
)

const { data: posts } = await useAsyncData(`home-blog-${locale.value}`, () =>
  queryCollection('blog')
    .where('published', '=', true)
    .order('date', 'DESC')
    .limit(3)
    .all(),
)

const marquee = computed(() => tm('brand.marquee') as string[])

useSeoMeta({
  title: () => t('nav.home'),
  description: () => t('home.intro'),
})
</script>

<template>
  <div>
    <!-- ── Héroe ─────────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden pb-24 pt-28">
      <div class="q-hero-grid" />
      <div
        class="glow-accent absolute inset-0"
        style="--glow-at: 72% 28%"
      />
      <div class="scanline absolute inset-0 opacity-60" />

      <div class="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div class="reveal">
          <p class="q-greeting mb-6">
            <span class="q-dot" />
            {{ t('home.greeting') }}
          </p>

          <h1 class="mb-5 font-display text-[clamp(2.75rem,7vw,5.5rem)] uppercase leading-[0.9] tracking-wide">
            <span class="headline-line"><span>{{ t('home.headline.1') }}</span></span>
            <span class="headline-line"><span class="text-outline-dim">{{ t('home.headline.2') }}</span></span>
            <span class="headline-line"><span>{{ t('home.headline.3') }}<span class="text-forge-500">.</span></span></span>
          </h1>

          <p class="mb-7 max-w-xl text-lg leading-relaxed text-white-400">
            {{ t('home.intro') }}
          </p>

          <div class="mb-9 flex flex-wrap gap-2.5">
            <span
              v-for="tag in $tm('home.tags')"
              :key="tag"
              class="q-tag"
            >
              {{ tag }}
            </span>
          </div>

          <div class="flex flex-wrap gap-4">
            <NuxtLink
              :to="localePath('/services')"
              class="q-btn q-btn-primary"
            >
              {{ t('home.ctaServices') }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/contact')"
              class="q-btn q-btn-outline"
            >
              {{ t('home.ctaContact') }}
            </NuxtLink>
          </div>
        </div>

        <div
          class="reveal relative mx-auto w-full max-w-[380px]"
          style="--reveal-delay: 0.15s"
        >
          <div class="q-photo w-full">
            <div class="q-photo-inner aspect-square">
              <img
                src="/img/avatar-768.webp"
                :alt="t('home.photoAlt')"
                width="768"
                height="768"
              >
            </div>
          </div>

          <div class="q-badge q-badge-1">
            <UIcon
              name="i-lucide-layers"
              class="size-6 text-forge-500"
            />
            <div>
              <div class="q-badge-label">
                {{ t('about.stackTitle') }}
              </div>
              Nuxt · Astro · Next
            </div>
          </div>

          <div class="q-badge q-badge-2">
            <UIcon
              name="i-lucide-git-branch"
              class="size-6 text-forge-500"
            />
            <div>
              <div class="q-badge-label">
                Open source
              </div>
              KatanaKit
            </div>
          </div>
        </div>
      </div>

      <div class="absolute inset-x-0 bottom-0 border-t border-dark-700/60 bg-dark-950/70 py-3 backdrop-blur-sm">
        <TheMarquee :items="marquee" />
      </div>
    </section>

    <!-- ── Servicios ────────────────────────────────────────────────────── -->
    <section class="border-t border-dark-700/60 py-20 lg:py-24">
      <UContainer>
        <div class="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div class="reveal">
            <SectionMarker :label="t('services.eyebrow')" />
            <h2 class="q-section-title q-left">
              {{ t('home.servicesTitle') }}
            </h2>
            <p class="q-section-subtitle q-left">
              {{ t('home.servicesSubtitle') }}
            </p>
          </div>
          <NuxtLink
            :to="localePath('/services')"
            class="q-btn q-btn-outline shrink-0"
          >
            {{ t('home.servicesAll') }}
          </NuxtLink>
        </div>

        <div class="reveal-stagger grid gap-5 md:grid-cols-2">
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
            <h3 class="mb-3 font-display text-2xl uppercase tracking-wide text-white-50 transition-colors group-hover:text-forge-500">
              {{ service.title }}
            </h3>
            <p class="flex-1 text-sm leading-relaxed text-white-400">
              {{ service.description }}
            </p>
            <span class="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-forge-500">
              {{ t('works.view') }}
              <UIcon
                name="i-lucide-arrow-right"
                class="size-3.5"
              />
            </span>
          </NuxtLink>
        </div>
      </UContainer>
    </section>

    <!-- ── Works ────────────────────────────────────────────────────────── -->
    <section class="border-t border-dark-700/50 py-20 lg:py-24">
      <UContainer>
        <div class="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div class="reveal">
            <SectionMarker :label="t('works.eyebrow')" />
            <h2 class="q-section-title q-left">
              {{ t('home.worksTitle') }}
            </h2>
            <p class="q-section-subtitle q-left">
              {{ t('home.worksSubtitle') }}
            </p>
          </div>
          <NuxtLink
            :to="localePath('/works')"
            class="q-btn q-btn-outline shrink-0"
          >
            {{ t('home.worksAll') }}
          </NuxtLink>
        </div>

        <div class="reveal-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="work in works"
            :key="work.path"
            class="q-project-card"
          >
            <div class="q-thumb q-thumb-icon">
              <UIcon
                name="i-lucide-folder-kanban"
                class="size-12"
              />
            </div>
            <div class="q-info">
              <div class="q-cat">
                {{ work.sector }}
              </div>
              <h3>{{ work.title }}</h3>
              <p class="q-desc">
                {{ work.description }}
              </p>
              <div class="q-meta">
                <span>{{ work.year }}</span>
                <NuxtLink
                  :to="localePath(work.path)"
                  class="q-view-btn"
                  :aria-label="`${t('works.view')}: ${work.title}`"
                >
                  →
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </UContainer>
    </section>

    <!-- ── Sobre mí ─────────────────────────────────────────────────────── -->
    <section class="border-t border-dark-700/50 py-20 lg:py-24">
      <UContainer>
        <div class="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div class="reveal justify-self-center lg:justify-self-start">
            <div class="q-photo w-full max-w-sm">
              <div class="q-photo-inner aspect-4/5">
                <img
                  src="/img/avatar-768.webp"
                  :alt="t('home.photoAlt')"
                  width="768"
                  height="768"
                >
              </div>
            </div>
          </div>

          <div
            class="reveal"
            style="--reveal-delay: 0.1s"
          >
            <SectionMarker :label="t('about.eyebrow')" />
            <h2 class="q-section-title q-left q-gradient-text">
              {{ t('home.aboutTitle') }}
            </h2>
            <p class="mb-8 max-w-xl text-base leading-relaxed text-white-400 md:text-lg">
              {{ t('home.aboutBody') }}
            </p>
            <NuxtLink
              :to="localePath('/about')"
              class="q-btn q-btn-outline"
            >
              {{ t('home.aboutCta') }}
            </NuxtLink>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ── Blog ─────────────────────────────────────────────────────────── -->
    <section
      v-if="posts?.length"
      class="border-t border-dark-700/50 py-20 lg:py-24"
    >
      <UContainer>
        <div class="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div class="reveal">
            <SectionMarker :label="t('blog.eyebrow')" />
            <h2 class="q-section-title q-left">
              {{ t('home.blogTitle') }}
            </h2>
            <p class="q-section-subtitle q-left">
              {{ t('home.blogSubtitle') }}
            </p>
          </div>
          <NuxtLink
            :to="localePath('/blog')"
            class="q-btn q-btn-outline shrink-0"
          >
            {{ t('home.blogAll') }}
          </NuxtLink>
        </div>

        <div class="reveal-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="post in posts"
            :key="post.id"
            :to="localePath(post.path)"
            class="q-featured-card"
          >
            <div class="q-featured-media">
              <UIcon
                name="i-lucide-file-text"
                class="size-14"
              />
            </div>
            <span class="q-featured-badge">{{ t('blog.title') }}</span>
            <div class="q-featured-overlay">
              <div class="q-cat">
                {{ new Date(post.date).toLocaleDateString(locale) }}
              </div>
              <h3>{{ post.title }}</h3>
              <p>{{ post.description || '' }}</p>
            </div>
          </NuxtLink>
        </div>
      </UContainer>
    </section>

    <!-- ── CTA ──────────────────────────────────────────────────────────── -->
    <section class="border-t border-dark-700/50 py-20 lg:py-24">
      <UContainer>
        <div class="bracket-frame reveal border border-dark-700 bg-dark-900/40 p-8 text-center md:p-12">
          <h2 class="mb-4 font-display text-4xl uppercase tracking-wide md:text-6xl">
            {{ t('home.ctaTitle') }}
          </h2>
          <p class="mx-auto mb-8 max-w-2xl text-white-400">
            {{ t('home.ctaBody') }}
          </p>
          <NuxtLink
            :to="localePath('/contact')"
            class="q-btn q-btn-primary"
          >
            {{ t('home.ctaButton') }}
          </NuxtLink>
        </div>
      </UContainer>
    </section>
  </div>
</template>

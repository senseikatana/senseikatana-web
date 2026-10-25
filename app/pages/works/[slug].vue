<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { t } = useI18n()
const localePath = useLocalePath()

const { data: work } = await useAsyncData(`work-${slug}`, () =>
  queryCollection('works')
    .path(`/works/${slug}`)
    .first(),
)

if (!work.value) {
  throw createError({ statusCode: 404, message: t('works.empty') })
}

useSeoMeta({
  title: () => work.value?.title,
  description: () => work.value?.description,
})
</script>

<template>
  <div v-if="work">
    <!-- ── Cabecera ─────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden border-b border-dark-700/60">
      <div class="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-950" />
      <div
        class="glow-accent absolute inset-0"
        style="--glow-at: 75% 30%"
      />
      <div class="scanline absolute inset-0" />

      <UContainer class="relative py-20 lg:py-24">
        <div class="reveal max-w-4xl">
          <NuxtLink
            :to="localePath('/works')"
            class="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white-500 transition-colors hover:text-forge-500"
          >
            <UIcon
              name="i-lucide-arrow-left"
              class="size-3.5"
            />
            {{ t('works.back') }}
          </NuxtLink>

          <div class="mb-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-forge-500">
            <span v-if="work.sector">{{ work.sector }}</span>
            <span
              v-if="work.year"
              class="text-white-500"
            >{{ work.year }}</span>
            <span
              v-if="work.client"
              class="text-white-500"
            >{{ work.client }}</span>
          </div>

          <h1 class="font-display text-5xl uppercase leading-[0.9] tracking-wide md:text-7xl">
            {{ work.title }}<span class="text-forge-500">.</span>
          </h1>
          <p class="mt-5 max-w-2xl text-lg leading-relaxed text-white-400">
            {{ work.description }}
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <a
              v-if="work.liveUrl"
              :href="work.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="q-btn q-btn-primary"
            >
              <UIcon
                name="i-lucide-external-link"
                class="size-4"
              />
              {{ t('works.visit') }}
            </a>
            <a
              v-if="work.repoUrl"
              :href="work.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="q-btn q-btn-outline"
            >
              <UIcon
                name="i-simple-icons-github"
                class="size-4"
              />
              {{ t('works.repo') }}
            </a>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ── Cuerpo ───────────────────────────────────────────────────────── -->
    <section class="py-16 lg:py-20">
      <UContainer>
        <div class="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div class="space-y-10">
            <div
              v-if="work.challenge"
              class="reveal"
            >
              <SectionMarker :label="t('works.challenge')" />
              <p class="text-lg leading-relaxed text-white-300">
                {{ work.challenge }}
              </p>
            </div>

            <div
              v-if="work.solution"
              class="reveal"
            >
              <SectionMarker :label="t('works.solution')" />
              <p class="text-lg leading-relaxed text-white-300">
                {{ work.solution }}
              </p>
            </div>

            <div
              v-if="work.outcome"
              class="reveal"
            >
              <SectionMarker :label="t('works.outcome')" />
              <p class="text-lg leading-relaxed text-white-300">
                {{ work.outcome }}
              </p>
            </div>

            <article class="prose prose-invert max-w-none">
              <ContentRenderer :value="work" />
            </article>
          </div>

          <aside class="space-y-8">
            <div class="card-forge p-6">
              <dl class="space-y-4 text-sm">
                <div v-if="work.role">
                  <dt class="font-mono text-[10px] uppercase tracking-[0.2em] text-forge-500">
                    {{ t('works.role') }}
                  </dt>
                  <dd class="mt-1 text-white-300">
                    {{ work.role }}
                  </dd>
                </div>
                <div v-if="work.client">
                  <dt class="font-mono text-[10px] uppercase tracking-[0.2em] text-forge-500">
                    {{ t('works.client') }}
                  </dt>
                  <dd class="mt-1 text-white-300">
                    {{ work.client }}
                  </dd>
                </div>
                <div v-if="work.sector">
                  <dt class="font-mono text-[10px] uppercase tracking-[0.2em] text-forge-500">
                    {{ t('works.sector') }}
                  </dt>
                  <dd class="mt-1 text-white-300">
                    {{ work.sector }}
                  </dd>
                </div>
                <div v-if="work.year">
                  <dt class="font-mono text-[10px] uppercase tracking-[0.2em] text-forge-500">
                    {{ t('works.year') }}
                  </dt>
                  <dd class="mt-1 text-white-300">
                    {{ work.year }}
                  </dd>
                </div>
              </dl>
            </div>

            <div
              v-if="work.stack?.length"
              class="card-forge p-6"
            >
              <h2 class="mb-4 font-heading text-xs uppercase tracking-[0.2em] text-forge-500">
                {{ t('works.stack') }}
              </h2>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="item in work.stack"
                  :key="item"
                  class="rounded-full border border-dark-600 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white-400"
                >
                  {{ item }}
                </span>
              </div>
            </div>

            <div class="card-forge p-6">
              <h2 class="mb-3 font-display text-2xl uppercase tracking-wide">
                {{ t('works.ctaTitle') }}
              </h2>
              <p class="mb-5 text-sm leading-relaxed text-white-400">
                {{ t('works.ctaBody') }}
              </p>
              <NuxtLink
                :to="localePath('/contact')"
                class="q-btn q-btn-primary w-full justify-center"
              >
                {{ t('works.ctaButton') }}
              </NuxtLink>
            </div>
          </aside>
        </div>
      </UContainer>
    </section>
  </div>
</template>

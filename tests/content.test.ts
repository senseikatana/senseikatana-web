import { describe, it, expect } from 'vitest'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const CONTENT_DIR = join(process.cwd(), 'content')
const COLLECTIONS = ['blog', 'services', 'works', 'testimonials'] as const

function filesIn(collection: string): string[] {
  return readdirSync(join(CONTENT_DIR, collection)).filter(file => !file.startsWith('.'))
}

function markdownFilesIn(collection: string): string[] {
  return filesIn(collection).filter(file => file.endsWith('.md'))
}

function frontmatterOf(path: string): string {
  return readFileSync(path, 'utf8').split('---')[1] ?? ''
}

function bodyOf(path: string): string {
  return readFileSync(path, 'utf8').split('---').slice(2).join('---')
}

describe('Content collections', () => {
  it.each(COLLECTIONS)('collection %s/ exists and is not empty', (collection) => {
    const files = filesIn(collection)

    expect(files.length, `content/${collection}/ está vacía`).toBeGreaterThan(0)
  })

  it('the resume collection is gone', () => {
    expect(existsSync(join(CONTENT_DIR, 'resume')), 'content/resume/ sigue existiendo').toBe(false)
  })

  it('every blog post declares the frontmatter the schema requires', () => {
    const posts = markdownFilesIn('blog')

    expect(posts.length).toBeGreaterThan(0)

    for (const post of posts) {
      const fm = frontmatterOf(join(CONTENT_DIR, 'blog', post))

      expect(fm, `${post}: sin title`).toContain('title:')
      expect(fm, `${post}: sin description`).toContain('description:')
      expect(fm, `${post}: sin date`).toContain('date:')
    }
  })

  it('every service is publishable: title, description, order and a non-empty body', () => {
    const services = markdownFilesIn('services')

    expect(services.length).toBeGreaterThan(0)

    for (const service of services) {
      const path = join(CONTENT_DIR, 'services', service)
      const fm = frontmatterOf(path)

      expect(fm, `${service}: sin title`).toContain('title:')
      expect(fm, `${service}: sin description`).toContain('description:')
      expect(fm, `${service}: sin order`).toContain('order:')
      expect(fm, `${service}: sigue en draft`).toContain('draft: false')
      expect(bodyOf(path).trim().length, `${service}: cuerpo vacío`).toBeGreaterThan(100)
    }
  })

  it('every work declares the three beats and a valid link', () => {
    const works = markdownFilesIn('works')

    expect(works.length).toBeGreaterThan(0)

    for (const work of works) {
      const path = join(CONTENT_DIR, 'works', work)
      const fm = frontmatterOf(path)

      expect(fm, `${work}: sin title`).toContain('title:')
      expect(fm, `${work}: sin description`).toContain('description:')
      expect(fm, `${work}: sin challenge`).toContain('challenge:')
      expect(fm, `${work}: sin solution`).toContain('solution:')
      expect(fm, `${work}: sin outcome`).toContain('outcome:')
      expect(fm, `${work}: sigue en draft`).toContain('draft: false')

      const links = fm.match(/^(\w+Url):\s*"([^"]+)"/gm) ?? []

      for (const line of links) {
        expect(line, `${work}: URL inválida → ${line}`).toMatch(/^(\w+Url):\s*"https:\/\/[^"]+"$/)
      }
    }
  })

  it('no TODO placeholder files survive in the published collections', () => {
    for (const collection of ['services', 'works'] as const) {
      const placeholders = filesIn(collection).filter(file => file.startsWith('TODO'))

      expect(placeholders, `${collection}/ todavía tiene placeholders`).toEqual([])
    }
  })

  it('testimonials require provenance so no quote floats free of its source', () => {
    const files = filesIn('testimonials').filter(file => file.endsWith('.json'))

    expect(files.length).toBeGreaterThan(0)

    for (const file of files) {
      const entry = JSON.parse(readFileSync(join(CONTENT_DIR, 'testimonials', file), 'utf8'))

      expect(entry.source, `${file}: falta source`).toBeTruthy()
      expect(entry.quote, `${file}: falta quote`).toBeTruthy()
      expect(entry.author, `${file}: falta author`).toBeTruthy()
    }
  })

  /*
    Contact details must never be published in the content layer.
    @nuxt/content serialises collections into `_payload.json`, which ships to
    the browser unasked. Keeping email/phone out of the source is the only
    reliable way to keep them out of the payload.
  */
  it('no contact details leak into the content collections', () => {
    for (const collection of COLLECTIONS) {
      for (const file of filesIn(collection)) {
        const raw = readFileSync(join(CONTENT_DIR, collection, file), 'utf8')

        expect(raw, `${collection}/${file}: contiene un email`).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/)
        expect(raw.replace(/\D/g, ''), `${collection}/${file}: contiene el teléfono`).not.toContain('637723747')
      }
    }
  })
})

import { render, screen } from '@testing-library/react'

// A stand-in for what scripts/optimize-images.mjs writes once real photography
// lands in assets/photos/.
jest.mock('../../src/generated/images.json', () => ({
  hero: { width: 2400, height: 1350, widths: [480, 1200, 2400] },
}))

// babel-jest hoists jest.mock above imports, so this order is fine.
import Image from '../../src/components/common/Image.jsx'

describe('Image — placeholder mode', () => {
  it('falls back to src when the name has no processed photo yet', () => {
    render(<Image name="not-yet-supplied" src="images/placeholder-room.svg" alt="Stanza" />)
    const img = screen.getByAltText('Stanza')
    expect(img.getAttribute('src')).toContain('placeholder-room.svg')
    expect(img).not.toHaveAttribute('srcset')
  })

  it('keeps explicit dimensions on the fallback so the box is still reserved', () => {
    render(
      <Image
        name="missing"
        src="images/placeholder-room.svg"
        alt="Stanza"
        width={800}
        height={600}
      />,
    )
    const img = screen.getByAltText('Stanza')
    expect(img).toHaveAttribute('width', '800')
    expect(img).toHaveAttribute('height', '600')
  })
})

describe('Image — processed photo', () => {
  it('emits a WebP srcset across every generated width', () => {
    render(<Image name="hero" src="images/placeholder-hero.svg" alt="La masseria" />)
    const img = screen.getByAltText('La masseria')

    const srcset = img.getAttribute('srcset')
    expect(srcset).toContain('hero-480.webp 480w')
    expect(srcset).toContain('hero-1200.webp 1200w')
    expect(srcset).toContain('hero-2400.webp 2400w')
  })

  it('uses the intrinsic dimensions from the manifest, not the caller', () => {
    render(<Image name="hero" src="x.svg" alt="La masseria" width={999} height={111} />)
    const img = screen.getByAltText('La masseria')
    expect(img).toHaveAttribute('width', '2400')
    expect(img).toHaveAttribute('height', '1350')
  })

  it('prefers the real photo over the placeholder once one exists', () => {
    render(<Image name="hero" src="images/placeholder-hero.svg" alt="La masseria" />)
    const img = screen.getByAltText('La masseria')
    expect(img.getAttribute('src')).toContain('hero-2400.webp')
    expect(img.getAttribute('src')).not.toContain('placeholder')
  })
})

describe('Image — loading policy', () => {
  it('defers by default', () => {
    render(<Image name="hero" src="x.svg" alt="a" />)
    expect(screen.getByAltText('a')).toHaveAttribute('loading', 'lazy')
  })

  it('loads the LCP element eagerly when marked priority', () => {
    render(<Image name="hero" src="x.svg" alt="a" priority />)
    const img = screen.getByAltText('a')
    expect(img).toHaveAttribute('loading', 'eager')
    expect(img).toHaveAttribute('fetchpriority', 'high')
  })
})

// starter tests: review before relying on them.
// Characterization tests for ShopCart's static seed-data modules (the
// data every shop/blog page renders from) - they pin down CURRENT shape,
// not a spec of what the shape "should" be.
import { describe, it, expect } from 'vitest'
import blogList from '../utilis/blogdata'
import products from '../products.json'

describe('blogdata', () => {
  it('exports 9 posts with sequential ids and a 2-entry metaList each', () => {
    expect(blogList).toHaveLength(9)
    blogList.forEach((post, index) => {
      expect(post.id).toBe(index + 1)
      expect(typeof post.title).toBe('string')
      expect(post.metaList).toHaveLength(2)
    })
  })
})

describe('products.json', () => {
  it('exports 76 products with the fields the shop UI relies on', () => {
    expect(products).toHaveLength(76)
    products.forEach((product) => {
      expect(typeof product.id).toBe('string')
      expect(typeof product.name).toBe('string')
      expect(typeof product.price).toBe('number')
      expect(typeof product.stock).toBe('number')
      expect(product.quantity).toBe(0)
    })
  })
})

import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'node:util'

// Jest's jsdom environment omits TextEncoder/TextDecoder, which React Router 7
// requires at import time. Node provides both; expose them as globals.
if (typeof globalThis.TextEncoder === 'undefined') {
  globalThis.TextEncoder = TextEncoder
  globalThis.TextDecoder = TextDecoder
}

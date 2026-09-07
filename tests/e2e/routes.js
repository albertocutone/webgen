// Derived from the app's own route table so a new page automatically gets
// navigation coverage and a CI screenshot.
import { ROUTES } from '../../src/routes.js'

export const VISUAL_ROUTES = ROUTES.map((r) => ({
  path: r.path,
  name: r.path === '/' ? 'home' : r.path.replace(/^\//, ''),
}))

import manifest from '../generated/images.json'

/**
 * Helpers over the generated image manifest.
 *
 * Photographs live in folders under assets/photos/, one per room, so the owner
 * can drop files in without touching code or matching an exact filename. These
 * resolve a folder to whatever is actually in it.
 */

/** Every processed image key under a folder, in stable alphabetical order. */
export function imagesIn(folder) {
  const prefix = `${folder.replace(/\/$/, '')}/`
  return Object.keys(manifest)
    .filter((key) => key.startsWith(prefix))
    .sort()
}

/**
 * The image to lead with for a folder, or null if it is still empty.
 * Callers fall back to a placeholder on null.
 */
export function leadImage(folder) {
  return imagesIn(folder)[0] ?? null
}

/** Photographs for a given room id, e.g. roomImages('doppia'). */
export function roomImages(roomId) {
  return imagesIn(`rooms/${roomId}`)
}

export function roomLeadImage(roomId) {
  return roomImages(roomId)[0] ?? null
}

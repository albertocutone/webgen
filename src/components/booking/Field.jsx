/**
 * One labelled form control with inline error wiring.
 *
 * The label is always a real <label for>, never a placeholder: placeholders
 * vanish on focus and are not announced reliably. Errors are linked through
 * aria-describedby and aria-invalid so screen readers announce them.
 */
export default function Field({
  id,
  label,
  error,
  required = false,
  optionalLabel,
  children,
  hint,
}) {
  const errorId = error ? `${id}-error` : undefined
  const hintId = hint ? `${id}-hint` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-stone-ink">
        {label}
        {required ? (
          <span className="ml-1 text-terracotta-600" aria-hidden="true">
            *
          </span>
        ) : (
          optionalLabel && <span className="ml-1 text-stone-muted">{optionalLabel}</span>
        )}
      </label>

      {hint && (
        <p id={hintId} className="mt-1 text-xs text-stone-muted">
          {hint}
        </p>
      )}

      {children({
        id,
        'aria-invalid': error ? 'true' : undefined,
        'aria-describedby': describedBy,
        required,
      })}

      {error && (
        <p id={errorId} className="mt-1 text-sm text-terracotta-700">
          {error}
        </p>
      )}
    </div>
  )
}

/** Shared input styling, so every control looks identical. */
export const controlClass =
  'mt-1 w-full rounded-md border border-limestone-300 bg-limestone-50 px-3 py-2 text-base ' +
  'text-stone-ink placeholder:text-stone-muted focus:border-olive-600 focus:outline-none ' +
  'aria-[invalid=true]:border-terracotta-600'

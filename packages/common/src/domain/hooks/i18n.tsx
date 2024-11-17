import { useTranslation } from 'react-i18next'

type Options = { [key: string]: string }

/**
 * A hook that returns a single function, `t`, which is a wrapper around
 * `react-i18next`'s `useTranslation` hook.
 *
 * This hook is a convenience wrapper that provides a single function to
 * translate strings instead of the entire `useTranslation` object. This allows
 * for a more concise API and fewer imports.
 *
 * @returns An object with a single key, `t`, which is a function that takes a
 * string and optional object of options and returns a translated string.
 */
function useI18n(): {
  t: (key: string, options?: Options) => string
} {
  const { t } = useTranslation()
  return {
    t: (key: string, options?: Options) => t(key, options),
  }
}

export { useI18n }

import type { DisplaySettings } from '~/types/display'
import {
  areDisplaySettingsEqual,
  getUnsupportedDisplayQueryKeys,
  parseDisplaySettingsFromQuery,
  serializeDisplaySettingsToQuery,
} from '~/utils/display-query'

function queryToString(query: ReturnType<typeof serializeDisplaySettingsToQuery>): string {
  const search = new URLSearchParams()

  for (const [key, value] of Object.entries(query)) {
    if (typeof value === 'string' && value.length > 0) {
      search.set(key, value)
    }
  }

  return search.toString()
}

export function useDisplaySettings() {
  const route = useRoute()
  const router = useRouter()
  const appConfig = useAppConfig()
  const toast = useToast()
  const isMounted = ref(false)
  const pendingUnsupportedKeys = ref<string[]>([])

  const settings = ref<DisplaySettings>(parseDisplaySettingsFromQuery(route.query))

  function showUnsupportedParameterToast(key: string) {
    toast.add({
      color: 'error',
      description: `Parameter ${key} was ignored.`,
      icon: 'lucide:triangle-alert',
      title: 'Unsupported URL parameter',
    })
  }

  onMounted(() => {
    isMounted.value = true

    for (const key of pendingUnsupportedKeys.value) {
      showUnsupportedParameterToast(key)
    }

    pendingUnsupportedKeys.value = []
  })

  watch(() => route.query, (newQuery) => {
    const parsed = parseDisplaySettingsFromQuery(newQuery)
    const unsupportedKeys = getUnsupportedDisplayQueryKeys(newQuery)

    if (import.meta.client && unsupportedKeys.length > 0) {
      if (isMounted.value) {
        for (const key of unsupportedKeys) {
          showUnsupportedParameterToast(key)
        }
      }
      else {
        pendingUnsupportedKeys.value = [...new Set([...pendingUnsupportedKeys.value, ...unsupportedKeys])]
      }
    }

    if (!areDisplaySettingsEqual(parsed, settings.value)) {
      settings.value = parsed
    }

    if (import.meta.client && unsupportedKeys.length > 0) {
      router.replace({
        query: serializeDisplaySettingsToQuery(parsed),
      })
    }
  }, {
    deep: true,
    immediate: true,
  })

  watch(settings, (newSettings) => {
    const nextQuery = serializeDisplaySettingsToQuery(newSettings)
    const currentSettings = parseDisplaySettingsFromQuery(route.query)

    if (areDisplaySettingsEqual(currentSettings, newSettings)) {
      return
    }

    router.replace({
      query: nextQuery,
    })
  }, {
    deep: true,
  })

  function setSettings(patch: Partial<DisplaySettings>) {
    settings.value = {
      ...settings.value,
      ...patch,
    }
  }

  const finalUrl = computed(() => {
    const queryString = queryToString(serializeDisplaySettingsToQuery(settings.value))
    const path = route.path
    const baseUrl = appConfig.general.siteUrl.endsWith('/')
      ? appConfig.general.siteUrl.slice(0, -1)
      : appConfig.general.siteUrl

    if (!queryString) {
      return `${baseUrl}${path}`
    }

    return `${baseUrl}${path}?${queryString}`
  })

  return {
    finalUrl,
    setSettings,
    settings,
  }
}

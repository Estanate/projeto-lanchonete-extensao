<script setup>
    import { ref, computed, watch, inject } from 'vue'
    import MenuForm from '@/components/MenuForm.vue'
    import CategoryFilter from '@/components/CategoryFilter.vue'
    import MenuItem from '@/components/MenuItem.vue'
    import MenuSummary from '@/components/MenuSummary.vue'
    import { fetchSuggestions } from '@/services/api'
    import { NOTIFY, ALL_CATEGORY } from '@/constants'

    const STORAGE_KEY = 'cardapio-items'
    const notify = inject('notify')

    const items = ref(loadSaved())
    const activeCategory = ref(ALL_CATEGORY)
    const loading = ref(false)
    const apiError = ref('')

    // filteredItems, availableCount, averagePrice: idênticos à v1

    async function loadSuggestions() {
        loading.value = true
        apiError.value = ''
        try {
            const data = await fetchSuggestions()
            const existingIds = new Set(items.value.map((i) => i.id))
            const fresh = data.filter((d) => !existingIds.has(d.id))
            items.value.push(...fresh)
            notify(`${fresh.length} sugestão(ões) carregada(s) da API`, NOTIFY.INFO)
        } catch (err) {
            apiError.value = err.message
            notify(`Falha ao carregar sugestões: ${err.message}`, NOTIFY.ERROR)
        } finally {
            loading.value = false
        }
    }
</script>
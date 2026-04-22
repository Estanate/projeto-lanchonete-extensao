<script setup>
    defineProps({
        activeCategory: {
            type: String,
            required: true,
        },
    })

    const emit = defineEmits(['filter-change'])

    import { FILTER_CATEGORIES } from '@/constants'
</script>

<template>
    <div class="d-flex flex-wrap gap-2 mb-4">
        <button
            v-for="cat in FILTER_CATEGORIES"
            :class="['pn-chip', { active: cat === activeCategory }]">
            {{ cat }}
        </button>
    </div>
</template>

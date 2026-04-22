<script setup>
    defineProps({
        item: {
            type: Object,
            required: true,
        },
    })

    const emit = defineEmits(['remove-item'])
</script>

<template>
<div class="pn-menu-card" :class="{ unavailable: !item.available }">
    <span class="pn-tag">{{ item.category }}</span>

    <h3 class="pn-menu-name">{{ item.name }}</h3>
    <div class="pn-menu-price">
        {{ formatBRL(item.price) }}
    </div>

    <span :class="['pn-pill', item.available
        ? 'done' : 'cancelled']">
        {{ item.available ? 'Disponível' : 'Indisponível' }}
    </span>
    <button class="btn btn-primary btn-sm" @click="addToCart">
        + Pedido
    </button>
</div>


</template>

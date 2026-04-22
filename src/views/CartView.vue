<script setup>
    import { computed, inject } from 'vue'
    import { useStore } from 'vuex'
    import { formatBRL } from '@/utils/format'
    import { NOTIFY } from '@/constants'

    const store = useStore()
    const notify = inject('notify')

    const items = computed(() => store.getters['cart/items'])
    const total = computed(() => store.getters['cart/total'])
    const isEmpty = computed(() => store.getters['cart/isEmpty'])

    function decrement(id) { store.dispatch('cart/decrement', id) }
    function remove(id, name) {
        store.dispatch('cart/removeFromCart', id)
        notify(`"${name}" removido dos pedidos`, NOTIFY.INFO)
    }
    function checkout() {
        notify(`Pedido finalizado: ${formatBRL(total.value)}`, NOTIFY.SUCCESS)
        store.dispatch('cart/clearCart')
    }
</script>
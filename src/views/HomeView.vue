<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { formatBRL } from '@/utils/format'

const store = useStore()
const router = useRouter()
const cartCount = computed(() => store.getters['cart/count'])

function goMenu() {
    router.push({ name: 'menu' })
}
</script>
<script setup>
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'

    const store = useStore()
    const router = useRouter()
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    const username = computed(() => store.getters['auth/username'])
    const cartCount = computed(() => store.getters['cart/count'])

    function logout() {
        store.dispatch('auth/logout')
        router.push({ name: 'home' })
    }

    import { computed } from 'vue'
    import { useStore } from 'vuex'

    const store = useStore()

    const cartCount       = computed(() => store.getters['cart/count'])
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    const username        = computed(() => store.getters['auth/username'])

    function logout() {
        store.dispatch('auth/logout')
}
</script>

<template>
    <aside class="pn-sidebar">
        <div class="pn-brand">🍕 PizzaNow</div>

        <router-link class="pn-nav-link" :to="{ name: 'home' }">
            ▦ Dashboard
        </router-link>
        <router-link class="pn-nav-link" :to="{ name: 'menu' }">
            🍕 Cardápio
        </router-link>
        <router-link class="pn-nav-link" :to="{ name: 'cart' }">
            📋 Pedidos
            <span v-if="cartCount > 0" class="pn-nav-badge">
                {{ cartCount }}
            </span>
        </router-link>

        <router-link class="pn-nav-link" :to="{ name: 'about' }">ⓘ Sobre</router-link>

        <button v-if="isAuthenticated" class="pn-nav-link" @click="logout">
            ⎋ Sair
        </button>
        <router-link v-else class="pn-nav-link" :to="{ name: 'login' }">
            ⇲ Entrar
        </router-link>

        <div class="pn-user-card">
            {{ isAuthenticated ? username : 'Visitante' }}
        </div>
    </aside>
</template>
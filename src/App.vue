<script setup>
    import { ref, provide, computed } from 'vue'
    import { useRoute } from 'vue-router'
    import { useStore } from 'vuex'
    import NavBar from './components/NavBar.vue'
    import NotificationToast from './components/NotificationToast.vue'

    const route = useRoute()
    const notifications = ref([])

    function notify(message, type = 'info') {
        notifications.value.push({ id: crypto.randomUUID(), message, type })
    }
    function removeNotification(id) {
        notifications.value = notifications.value.filter((n) => n.id !== id)
    }
    provide('notify', notify)

    const pageTitle = computed(() => route.meta?.title || 'PizzaNow')
    const pageSubtitle = computed(() => route.meta?.subtitle || '')
    const isPlain = computed(() => !!route.meta?.plain)

    const today = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'short', year: 'numeric',
    })

    const store = useStore()

    const items = computed(() =>
        store.getters['cart/items'])

    function addItem(item) {
        store.dispatch('cart/addToCart', item)
    }

</script>

<template>
    <div id="app">
        <!-- Layout limpo para /login (sem sidebar/topbar) -->
        <div v-if="isPlain" class="pn-plain">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>

        <!-- Layout principal -->
        <div v-else class="pn-shell">
            <NavBar />
            <div class="pn-main">
                <header class="pn-topbar">
                    <h1>{{ pageTitle }}</h1>
                    <p>{{ pageSubtitle }} · <span class="pn-accent">Hoje, {{ today }}</span></p>
                </header>
                <main class="pn-content">
                    <router-view v-slot="{ Component }">
                        <transition name="fade" mode="out-in">
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </main>
            </div>
        </div>

        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1080">
            <NotificationToast
                v-for="t in notifications"
                :key="t.id"
                :message="t.message"
                :type="t.type"
                @dismiss="removeNotification(t.id)" />
        </div>
    </div>
</template>
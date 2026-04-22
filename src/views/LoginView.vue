<script setup>
    import { ref, inject } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter, useRoute } from 'vue-router'
    import { NOTIFY } from '@/constants'

    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const notify = inject('notify')
    const username = ref('')
    const error = ref('')

    function submit() {
        const name = username.value.trim()
        if (!name) { error.value = 'Informe um nome de usuário'; return }

        store.dispatch('auth/login', { username: name })
        notify(`Bem-vindo, ${name}!`, NOTIFY.SUCCESS)

        // Só aceita path interno ("/algo") — bloqueia "//evil.com"
        const raw = route.query.redirect
        const isSafeInternal = typeof raw === 'string' && /^\/(?!\/)/.test(raw)
        router.push(isSafeInternal ? raw : { name: 'home' })
    }
</script>
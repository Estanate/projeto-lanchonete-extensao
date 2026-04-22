<script setup>
    import { ref, computed, onMounted, onUnmounted } from 'vue'

    const props = defineProps({
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'success',
            validator: (val) => ['success', 'info', 'error'].includes(val),
        },
        duration: {
            type: Number,
            default: 3000,
        },
    })

    const emit = defineEmits(['dismiss'])

    const timerId = ref(null)

    import { NOTIFY } from '@/constants'
    defineProps({
    type: {
        type: String,
        default: NOTIFY.SUCCESS,
        validator: (v) => Object.values(NOTIFY).includes(v),
    },
})

    onMounted(() => {
        timerId.value = setTimeout(() => {
            emit('dismiss')
        }, props.duration)
    })

    onUnmounted(() => {
        clearTimeout(timerId.value)
    })
</script>

<template>
    <div :class="['pn-toast', type]">
        <span class="pn-toast-icon">{{ icon }}</span>
        <span>{{ message }}</span>
        <button class="pn-toast-close">×</button>
    </div>
</template>

<style scoped>
    .alert {
        min-width: 300px;
        animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(30px);
        }

        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
</style>

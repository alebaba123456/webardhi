<template>
    <button>
        <div class="flex gap-2 hover:text-white hover:bg-shade p-1 border-gr border-2 text-gr group">
            <CancelIcon />
            <div>Batalkan</div>
        </div>
    </button>
</template>

<script setup>
import CancelIcon from '@/assets/button-icons/cancel-icon.vue';
</script>
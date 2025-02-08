<template>
    <button>
        <div class="flex gap-2 hover:bg-tosca p-1 bg-gr border-gr border-2 hover:text-gr hover:font-bold text-tosca group transition-all ease-out duration-200">
            <CancelIcon />
            <div>Tutup</div>
        </div>
    </button>
</template>

<script setup>
import CancelIcon from '@/assets/button-icons/cancel-icon.vue';
</script>
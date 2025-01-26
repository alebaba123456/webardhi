<template>
    <div class="w-full shadow-md shadow-gr">
        <div class="px-8 py-1 w-full bg-shade-gr flex justify-between items-center">
            <PrevButton />
            <PageButton />
            <NextButton />
        </div>
    </div>
</template>

<script setup>
import PrevButton from '@/components/buttons/navigation-prev.vue';
import NextButton from '@/components/buttons/navigation-next.vue';
import PageButton from '@/components/buttons/navigation-page-number.vue';
</script>
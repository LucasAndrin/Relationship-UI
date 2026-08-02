<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useComponentStackStore } from '../store'
import ComponentWrapper from './ComponentWrapper.vue'

const store = useComponentStackStore()

const { stack } = storeToRefs(store)
</script>

<template>
    <Teleport to="body">
        <ComponentWrapper
            v-for="item in stack"
            :key="item.id"
            :item="item"
        />
    </Teleport>
</template>

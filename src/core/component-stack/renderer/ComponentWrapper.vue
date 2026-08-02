<script setup lang="ts">
import { computed } from 'vue';
import type { ComponentStackItem } from '../types';

interface Props {
    item: ComponentStackItem
}

const props = defineProps<Props>();

const zIndex = computed(() => {
    return props.item.options?.zIndex
});
</script>

<template>

    <div
        class="component-stack__wrapper"
        :style="{ zIndex }"
    >
		<slot name="before" />
        <component
            :is="item.component"
            v-bind="item.props"
        />
		<slot name="after" />
    </div>

</template>

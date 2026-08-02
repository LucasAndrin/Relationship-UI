<script setup lang="ts">
import { computed } from 'vue'

import { surfaceVariants } from './surface.variants'
import type { SurfaceProps } from './types';

const props = withDefaults(
    defineProps<SurfaceProps>(),
    {
        as: 'div'
    }
)

const classes = computed(() =>
	surfaceVariants.compose(props),
)
</script>

<template>

    <component
        :is="as"
        :class="classes"
    >
        <slot />
    </component>

</template>

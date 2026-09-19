<script setup lang="ts">
import { computed } from 'vue';
import type { WindowProps } from './types';
import { cn } from '@/shared/utils';
import type { WindowPosition, WindowSize } from '@/src/core/window-manager';
import { useWindowDrag } from './useWindowDrag';
import { useWindowResize } from './useWindowResize';

const props = withDefaults(defineProps<WindowProps>(), {
	title: 'Window',
	minimized: false,
	maximized: false,
	draggable: true,
	resizable: true,
});

const emit = defineEmits<{
	focus: []
    close: []
    minimize: []
    maximize: []
    restore: []
	move: [position: WindowPosition]
	resize: [size: WindowSize, position: WindowPosition],
}>();

const { dragging, start } = useWindowDrag({
	position() {
		return props.position;
	},
	size() {
		return props.size;
	},
	bounds() {
		return props.bounds;
	},
	onMove(position) {
		emit('move', position);
	}
});

const { start: startResize } = useWindowResize({
    position() {
        return props.position;
    },

    size() {
        return props.size;
    },

    bounds() {
        return props.bounds;
    },

    onResize(size, position) {
        emit('resize', size, position);
    },
});

const style = computed(() => {
    if (props.maximized) {
        return {
            inset: '0',
            zIndex: props.zIndex,
        }
    }

    return {
        left: `${props.position.x}px`,
        top: `${props.position.y}px`,
        width: `${props.size.width}px`,
        height: `${props.size.height}px`,
        zIndex: props.zIndex,
    }
});
</script>

<template>
	<section
		:style="style"
		:class="cn(
			'absolute flex flex-col overflow-hidden',
			'rounded-lg border bg-white shadow-xl',
			props.class,
		)"
		@mousedown="emit('focus')"
	>
		<header
			class="flex h-10 shrink-0 items-center justify-between border-b px-3"
			:class="{
				'cursor-move': draggable && !maximized && !dragging,
				'cursor-default': !draggable || maximized,
				'cursor-grabbing': dragging,
			}"
			@mousedown="draggable && !maximized && start($event)"
		>
            <span class="truncate font-medium">
                {{ title }}
            </span>

            <div class="flex items-center gap-1">
                <button type="button" @mousedown.stop @click="emit('minimize')">
					-
				</button>

                <button type="button" @mousedown.stop @click="props.maximized ? emit('restore') : emit('maximize')">
                    □
                </button>

                <button type="button" @mousedown.stop @click="emit('close')">
                    x
                </button>
            </div>
        </header>

		<main v-show="!minimized" class="min-h-0 flex-1 overflow-auto">
            <slot />
        </main>

		<div v-if="resizable && !maximized" class="absolute inset-0 pointer-events-none">
			 <!-- North -->
			<div class="pointer-events-auto absolute left-2 right-2 top-0 h-1 cursor-n-resize" @mousedown.stop="startResize($event, 'n')"></div>

			<!-- South -->
			<div class="pointer-events-auto absolute bottom-0 left-2 right-2 h-1 cursor-s-resize" @mousedown.stop="startResize($event, 's')"></div>

			<!-- East -->
			<div class="pointer-events-auto absolute bottom-2 right-0 top-2 w-1 cursor-e-resize" @mousedown.stop="startResize($event, 'e')"></div>

			<!-- West -->
			<div class="pointer-events-auto absolute bottom-2 left-0 top-2 w-1 cursor-w-resize" @mousedown.stop="startResize($event, 'w')"></div>

			<!-- North-East -->
			<div class="pointer-events-auto absolute right-0 top-0 h-2 w-2 cursor-ne-resize" @mousedown.stop="startResize($event, 'ne')"></div>

			<!-- North-West -->
			<div class="pointer-events-auto absolute left-0 top-0 h-2 w-2 cursor-nw-resize" @mousedown.stop="startResize($event, 'nw')"></div>

			<!-- South-East -->
			<div class="pointer-events-auto absolute bottom-0 right-0 h-2 w-2 cursor-se-resize" @mousedown.stop="startResize($event, 'se')"></div>

			<!-- South-West -->
			<div class="pointer-events-auto absolute bottom-0 left-0 h-2 w-2 cursor-sw-resize" @mousedown.stop="startResize($event, 'sw')"></div>
		</div>
	</section>
</template>

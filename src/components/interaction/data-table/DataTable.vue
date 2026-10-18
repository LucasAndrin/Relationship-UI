<script setup lang="ts" generic="T extends object">
import { computed, useSlots } from 'vue';

import { cn } from '@/shared/utils';

import { dataTableVariants } from './data-table.variants';

import type {
	DataTableColumn,
	DataTableHeaderContext,
	DataTableProps,
	DataTableRowKey,
	DataTableSort,
	DataTableSortDirection,
} from './types';

defineOptions({
	inheritAttrs: false,
});

const props = withDefaults(defineProps<DataTableProps<T>>(), {
	loading: false,
	selectionMode: 'none',
	selectedKeys: () => [],
	sort: null,
});

const emit = defineEmits<{
	'sort-change': [sort: DataTableSort | null];
	'selection-change': [keys: DataTableRowKey[]];
	'update:selectedKeys': [keys: DataTableRowKey[]]
}>();

const slots = useSlots();

const classes = computed(() =>
	cn(dataTableVariants.compose(props), props.class),
);

const selectionEnabled = computed(() => props.selectionMode !== 'none')

const allRowsSelected = computed(() => {
	if (props.data.length === 0 || !selectionEnabled.value) {
		return false;
	}

	return props.data.every(row =>
		props.selectedKeys.includes(getRowKey(row))
	);
})

const someRowsSelected = computed(() => {
	if (!selectionEnabled.value) {
		return false;
	}
	return props.data.some(row =>
		props.selectedKeys.includes(getRowKey(row))
	)
});

const normalizedColumns = computed(() => props.columns);

const emptyColspan = computed(() => {
	return Math.max(props.columns.length + (selectionEnabled.value ? 1 : 0), 1);
})

function isRowSelected(row: T): boolean {
  return props.selectedKeys.includes(getRowKey(row))
}

function getRowKey(row: T): string | number {
	const key = row[props.rowKey];

	if (typeof key !== 'string' && typeof key !== 'number') {
		throw new Error(
			`DataTable: row key "${String(props.rowKey)}" must be a string or number.`,
		);
	}

	return key;
}

function getCellValue(row: T, key: string): unknown {
	return (row as Record<string, unknown>)[key];
}

function requestSort(column: DataTableColumn<T>) {
	if (!column.sortable) return;

	let nextSort: DataTableSort | null;

	if (props.sort?.key !== column.key) {
		nextSort = {
			key: column.key,
			direction: 'asc',
		};
	} else if (props.sort.direction === 'asc') {
		nextSort = {
			key: column.key,
			direction: 'desc',
		};
	} else {
		nextSort = null;
	}

	emit('sort-change', nextSort);
}

function getSortIndicator(column: DataTableColumn<T>): string {
	if (props.sort?.key !== column.key) {
		return '↕';
	}

	return props.sort.direction === 'asc' ? '↑' : '↓';
}

function getHeaderContext(
	column: DataTableColumn<T>,
): DataTableHeaderContext<T> {
	const sorted = props.sort?.key === column.key;

	const direction: DataTableSortDirection | null = sorted
		? props.sort.direction
		: null;

	return {
		column,
		sorted,
		direction,
		toggleSort: () => requestSort(column),
	};
}

function updateSelection(keys: DataTableRowKey[]) {
  emit('selection-change', keys)
  emit('update:selectedKeys', keys)
}

function toggleRowSelection(row: T) {
  if (!selectionEnabled.value) return

  const key = getRowKey(row)

  if (props.selectionMode === 'single') {
	updateSelection(props.selectedKeys.includes(key) ? [] : [key]);
    return
  }

  const nextKeys = props.selectedKeys.includes(key)
    ? props.selectedKeys.filter((selectedKey) => selectedKey !== key)
    : [...props.selectedKeys, key]

  updateSelection(nextKeys)
}

function togglePageSelection() {
  if (props.selectionMode !== 'multiple') return

  const pageKeys = props.data.map((row) => getRowKey(row))

  const nextKeys = allRowsSelected.value ? props.selectedKeys.filter((key) => !pageKeys.includes(key)) : [
	...props.selectedKeys,
	...pageKeys.filter((key) => !props.selectedKeys.includes(key)),
	]

  updateSelection(nextKeys)
}
</script>

<template>
	<div :class="classes" v-bind="$attrs" :aria-busy="loading">
		<table class="w-full border-collapse">
			<thead>
				<tr
					:class="[
						'text-left text-slate-700 dark:text-slate-200',
						{
							'bg-slate-50 dark:bg-slate-900': variant !== 'minimal',
							'bg-white dark:bg-slate-950': variant === 'minimal',
						},
					]"
				>
					<th
						v-if="selectionMode === 'multiple'"
						scope="col"
						class="w-10 px-3 py-3 text-center"
					>
						<input
							type="checkbox"
							:checked="allRowsSelected"
							:indeterminate="someRowsSelected && !allRowsSelected"
							aria-label="Select all rows on this page"
							class="size-4 rounded border-slate-300 accent-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-slate-600"
							@change="togglePageSelection"
						>
					</th>

					<th
						v-for="column in normalizedColumns"
						:key="column.key"
						scope="col"
						:style="{ width: column.width }"
						:class="[
							'font-medium text-slate-700 dark:text-slate-200',
							{
								'text-left': !column.align || column.align === 'left',
								'text-center': column.align === 'center',
								'text-right': column.align === 'right',
								'border-b border-slate-200 dark:border-slate-800': variant !== 'minimal',
								'border-r border-slate-200 last:border-r-0 dark:border-slate-800': variant === 'bordered',
							},
						]"
					>
						<slot
							v-if="slots[`header-${column.key}`]"
							:name="`header-${column.key}`"
							v-bind="getHeaderContext(column)"
						/>

						<slot
							v-else-if="slots.header"
							name="header"
							v-bind="getHeaderContext(column)"
						/>

						<button
							v-else-if="column.sortable"
							type="button"
							class="inline-flex items-center gap-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
							:aria-label="`Sort by ${column.label}`"
							@click="requestSort(column)"
						>
							<span>{{ column.label }}</span>

							<slot
								name="sort-icon"
								:column="column"
								:sorted="props.sort?.key === column.key"
								:direction="
									props.sort?.key === column.key
										? props.sort.direction
										: null
								"
							>
								<span aria-hidden="true" class="text-slate-500 dark:text-slate-400">
									{{ getSortIndicator(column) }}
								</span>
							</slot>
						</button>

						<template v-else>
							{{ column.label }}
						</template>
					</th>
				</tr>
			</thead>

			<tbody>
				<tr v-if="loading">
					<td
						:colspan="emptyColspan"
						class="text-center text-slate-500 dark:text-slate-400"
					>
						<slot name="loading">
							Loading...
						</slot>
					</td>
				</tr>

				<tr v-else-if="data.length === 0">
					<td
						:colspan="emptyColspan"
						class="text-center text-slate-500 dark:text-slate-400"
					>
						<slot name="empty">
							No records found.
						</slot>
					</td>
				</tr>

				<template v-else>
					<tr
						v-for="row in data"
						:key="getRowKey(row)"
						:class="[
							'transition-colors',
							{
								'border-b border-slate-200 last:border-b-0 dark:border-slate-800':
									variant !== 'minimal',
								'even:bg-slate-50 dark:even:bg-slate-900/50':
									variant === 'striped',
								'hover:bg-slate-50 dark:hover:bg-slate-900/70':
									variant !== 'minimal',
							},
						]"
					>
						<td v-if="selectionEnabled" class="p-3 text-center">
							<input
								type="checkbox"
								:checked="isRowSelected(row)"
								:aria-label="`Select row ${String(getRowKey(row))}`"
								class="size-4 rounded border-slate-300 accent-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-slate-600"
								@change="toggleRowSelection(row)"
							>
						</td>

						<td
							v-for="column in normalizedColumns"
							:key="column.key"
							:class="[
								'text-slate-900 dark:text-slate-100',
								{
									'text-left': !column.align || column.align === 'left',
									'text-center': column.align === 'center',
									'text-right': column.align === 'right',
									'border-r border-slate-200 last:border-r-0 dark:border-slate-800': variant === 'bordered',
								},
							]"
						>
							<slot
								v-if="slots[column.key]"
								:name="column.key"
								:value="getCellValue(row, column.key)"
								:row="row"
								:column="column"
							/>

							<template v-else>
								{{ getCellValue(row, column.key) }}
							</template>
						</td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>
</template>

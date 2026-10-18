/** Functional Types */

/**
 * Unique identifier for a DataTable row.
 */
export type DataTableRowKey = string | number

/**
 * Sorting direction requested by the user.
 */
export type DataTableSortDirection = 'asc' | 'desc'

/**
 * Represents the sorting state applied to the data.
 *
 * The DataTable does not sort data locally.
 * It emits events requesting sorting changes.
 */
export type DataTableSort = {
  key: string
  direction: DataTableSortDirection
}

/**
 * Defines a DataTable column.
 */
export type DataTableColumn<
  T extends object = Record<string, unknown>,
> = {
  /**
   * Column identifier.
   * Also used to identify custom cell slots.
   */
  key: keyof T & string

  /**
   * Text displayed in the column header.
   */
  label: string

  /**
   * Indicates whether sorting can be requested for this column.
   */
  sortable?: boolean

  /**
   * CSS width of the column.
   */
  width?: string

  /**
   * Horizontal alignment of the column content.
   */
  align?: 'left' | 'center' | 'right'
}

/**
 * Represents the externally controlled pagination state.
 */
export type DataTablePagination = {
  /**
   * Current page number, starting at 1.
   */
  page: number

  /**
   * Number of records displayed per page.
   */
  pageSize: number

  /**
   * Total number of available records.
   */
  total: number
}

/**
 * Context provided to custom cell slots.
 */
export type DataTableCellContext<
  T extends object = Record<string, unknown>,
> = {
  /**
   * Value associated with the current column and row.
   */
  value: unknown

  /**
   * Complete data record for the current row.
   */
  row: T

  /**
   * Definition of the current column.
   */
  column: DataTableColumn<T>
}

/**
 * Defines the row selection mode.
 */
export type DataTableSelectionMode =
  | 'none'
  | 'single'
  | 'multiple'

/**
 * Represents the current DataTable selection state.
 *
 * Row keys identify selected records independently
 * of the currently visible page.
 */
export type DataTableSelection = {
  keys: DataTableRowKey[]
}

/**
 * Public properties accepted by the DataTable component.
 */
export type DataTableProps<
  T extends object = Record<string, unknown>,
> = {
  columns: DataTableColumn<T>[]
  data: T[]
  loading?: boolean

  /**
   * Property used to identify each row uniquely.
   * Example: "id".
   */
  rowKey: Extract<keyof T, string>

  /**
   * Sorting state currently applied to the data.
   */
  sort?: DataTableSort | null

  /**
   * Externally controlled pagination state.
   */
  pagination?: DataTablePagination

  /**
   * Enables or disables row selection.
   */
  selectionMode?: DataTableSelectionMode

  /**
   * Keys of the currently selected records.
   */
  selectedKeys?: DataTableRowKey[]

  /**
   * Variant style
   */
  variant?: DataTableVariant

  /**
   * Rounded style
   */
  rounded?: DataTableRounded

  /**
   * Size of the table
   */
  size?: DataTableSize

  class?: string
}

/** Style Types */

/**
 * Visual variant of the DataTable.
 */
export type DataTableVariant =
  | 'default'
  | 'striped'
  | 'bordered'
  | 'minimal'

/**
 * Controls the density of table cells.
 */
export type DataTableSize = 'sm' | 'md' | 'lg'

/**
 * Controls the border radius of the DataTable.
 */
export type DataTableRounded = 'none' | 'sm' | 'md' | 'lg'


/**
 * Context provided to table header slots.
 */
export type DataTableHeaderContext<
  T extends object = Record<string, unknown>,
> = {
  column: DataTableColumn<T>
  sorted: boolean
  direction: DataTableSortDirection | null
  toggleSort: () => void
}

/**
 * Context provided to the sorting icon slot.
 */
export type DataTableSortIconContext<
  T extends object = Record<string, unknown>,
> = {
  column: DataTableColumn<T>
  sorted: boolean
  direction: DataTableSortDirection | null
}

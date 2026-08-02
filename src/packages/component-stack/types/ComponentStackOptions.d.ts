export interface ComponentStackOptions {
  persistent?: boolean

  closeOnEscape?: boolean

  closeOnBackdrop?: boolean

  lockScroll?: boolean

  trapFocus?: boolean

  teleport?: string | HTMLElement

  zIndex?: number
}

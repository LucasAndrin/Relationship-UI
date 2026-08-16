import { cn, type ClassValue } from './cn'

type VariantValue = string | number | boolean

export type VariantSchema = Record<
	string,
	Record<string, ClassValue|ClassValue[]>
>

export interface CompoundVariant<
	TVariants extends VariantSchema
> {
	class: ClassValue

	variants: Partial<{
		[K in keyof TVariants]:
			| keyof TVariants[K]
			| VariantValue
	}>
}

export interface VariantDefinition<
	TVariants extends VariantSchema = VariantSchema
> {
	base?: ClassValue|ClassValue[]

	variants: TVariants

	defaultVariants?: Partial<{
		[K in keyof TVariants]: keyof TVariants[K]
	}>

	compoundVariants?: CompoundVariant<TVariants>[]
}

export interface VariantComposer<
	TVariants extends VariantSchema
> {
	compose(
		props?: Record<string, VariantValue | undefined> & {
			class?: ClassValue
		},
	): string

	definition: VariantDefinition<TVariants>

	variants: TVariants

	defaultVariants: VariantDefinition<TVariants>['defaultVariants']
}

export function createVariants<
	TVariants extends VariantSchema
>(
	definition: VariantDefinition<TVariants>,
): VariantComposer<TVariants> {
	function compose(
		props: Record<string, VariantValue | undefined> & {
			class?: ClassValue
		} = {},
	): string {
		const classes: ClassValue[] = []
		if (definition.base) {
			if (Array.isArray(definition.base)) {
				classes.push(...definition.base);
			} else {
				classes.push(definition.base)
			}
		}

		for (const variantName in definition.variants) {
			const variantGroup =
				definition.variants[variantName]

			const value =
				props[variantName] ??
				definition.defaultVariants?.[
					variantName as keyof TVariants
				]

			if (value === undefined) {
				continue
			}

			const variantClass =
				variantGroup[String(value)]

			if (variantClass) {
				if (Array.isArray(variantClass)) {
					classes.push(...variantClass);
				} else {
					classes.push(variantClass)
				}
			}
		}

		for (const compound of definition.compoundVariants ?? []) {
			const matches = Object.entries(
				compound.variants,
			).every(([key, value]) => {
				return (
					(props[key] ??
						definition.defaultVariants?.[
							key as keyof TVariants
						]) === value
				)
			})

			if (matches) {
				classes.push(compound.class)
			}
		}

		if (props.class) {
			classes.push(props.class)
		}

		return cn(...classes)
	}

	return {
		compose,

		definition,

		variants: definition.variants,

		defaultVariants: definition.defaultVariants,
	}
}

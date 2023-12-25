import type { WithChildren } from './global-type-helpers.ts';

type AsProp<TElement extends React.ElementType> = { as?: TElement };

export type PolymorphicPropsWithInfer<TPropObject> = TPropObject extends AsProp<infer TElement>
	? WithChildren<TPropObject> & Omit<React.ComponentPropsWithoutRef<TElement>, keyof TPropObject>
	: never;

type MergeProps<TElement extends React.ElementType, TProps> = WithChildren<AsProp<TElement> & TProps>;

export type PolymorphicProps<
	TElement extends React.ElementType,
	TProps extends Record<string, unknown> = AsProp<TElement>,
> = MergeProps<TElement, TProps> &
	Omit<React.ComponentPropsWithoutRef<TElement>, keyof MergeProps<TElement, TProps>>;

export type PolymorphicPropsWithRef<
	TElement extends React.ElementType,
	TProps extends Record<string, unknown> = AsProp<TElement>,
> = PolymorphicProps<TElement, TProps> & { ref?: React.ComponentPropsWithRef<TElement>['ref'] };

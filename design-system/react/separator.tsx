import { separator, SeparatorVariants } from '@design-system/styles/separator'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { styled } from 'stitches.config'

const DEFAULT_TAG = SeparatorPrimitive.Root

const Separator = styled(DEFAULT_TAG, separator)
Separator.toString = () => `.${Separator.className}`

export type { SeparatorVariants }
export { separator, Separator, DEFAULT_TAG }

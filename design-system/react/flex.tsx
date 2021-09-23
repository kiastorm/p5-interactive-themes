import { flex, FlexVariants } from '@design-system/styles/flex'
import { styled } from 'stitches.config'

const DEFAULT_TAG = 'div'
const Flex = styled(DEFAULT_TAG, flex)

export type { FlexVariants }
export { flex, Flex, DEFAULT_TAG }

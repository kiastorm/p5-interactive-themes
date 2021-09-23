import { box, BoxVariants } from '@design-system/styles/box'
import { styled } from 'stitches.config'

const DEFAULT_TAG = 'div'
const Box = styled(DEFAULT_TAG, box)

export type { BoxVariants }
export { box, Box, DEFAULT_TAG }

import { sub, SubVariants } from '@design-system/styles/sub'
import { styled } from 'stitches.config'

const DEFAULT_TAG = 'sub'

const Sub = styled(DEFAULT_TAG, sub)
Sub.toString = () => `.${Sub.className}`

export type { SubVariants }
export { sub, Sub, DEFAULT_TAG }

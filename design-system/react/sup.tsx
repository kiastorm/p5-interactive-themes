import { sup, SupVariants } from '@design-system/styles/sup'
import { styled } from 'stitches.config'

const DEFAULT_TAG = 'sup'

const Sup = styled(DEFAULT_TAG, sup)
Sup.toString = () => `.${Sup.className}`

export type { SupVariants }
export { sup, Sup, DEFAULT_TAG }

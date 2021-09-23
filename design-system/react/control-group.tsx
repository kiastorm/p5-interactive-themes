import {
  controlGroup,
  ControlGroupVariants,
} from '@design-system/styles/control-group'
import { styled } from 'stitches.config'

const DEFAULT_TAG = 'div'
const ControlGroup = styled(DEFAULT_TAG, controlGroup)
ControlGroup.toString = () => `.${ControlGroup.className}`

export type { ControlGroupVariants }
export { controlGroup, ControlGroup, DEFAULT_TAG }

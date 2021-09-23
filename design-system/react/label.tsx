import { label, LabelVariants } from '@design-system/styles/label'
import { styled } from 'stitches.config'
import * as LabelPrimitive from '@radix-ui/react-label'

const DEFAULT_TAG = LabelPrimitive.Root
const Label = styled(DEFAULT_TAG, label)

export type { LabelVariants }
export { label, Label, DEFAULT_TAG }

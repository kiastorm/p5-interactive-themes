import { button, ButtonVariants } from '@design-system/styles/button'
import { styled } from 'stitches.config'

const DEFAULT_TAG = 'button'
const Button = styled(DEFAULT_TAG, button)

export type { ButtonVariants }
export { button, Button, DEFAULT_TAG }

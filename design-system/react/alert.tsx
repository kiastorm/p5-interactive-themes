import { alert, AlertVariants } from '@design-system/styles/alert'
import { styled } from 'stitches.config'

const DEFAULT_TAG = 'div'
const Alert = styled(DEFAULT_TAG, alert)

Alert.toString = () => `.${Alert.className}`

export type { AlertVariants }
export { alert, Alert, DEFAULT_TAG }

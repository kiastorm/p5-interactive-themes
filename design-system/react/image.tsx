import { image, ImageVariants } from '@design-system/styles/image'
import { styled } from 'stitches.config'

const DEFAULT_TAG = 'img'
const Image = styled(DEFAULT_TAG, image)

export type { ImageVariants }
export { image, Image, DEFAULT_TAG }

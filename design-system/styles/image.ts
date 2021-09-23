import { css, VariantProps } from 'stitches.config'

export type ImageVariants = VariantProps<typeof image>

export const image = css({
  // Reset
  verticalAlign: 'middle',
  maxWidth: '100%',
})

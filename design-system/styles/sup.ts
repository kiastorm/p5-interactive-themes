import { css, VariantProps } from 'stitches.config'

export type SupVariants = VariantProps<typeof sup>

export const sup = css({
  fontFeatureSettings: '"sups"',
  fontSize: '100%',
  lineHeight: '1',
  verticalAlign: 'baseline',
})

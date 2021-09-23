import { css, VariantProps } from 'stitches.config'

export type SubVariants = VariantProps<typeof sub>

export const sub = css({
  fontFeatureSettings: '"subs"',
  fontSize: '100%',
  lineHeight: '1',
  verticalAlign: 'baseline',
})

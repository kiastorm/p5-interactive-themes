import { text } from '@design-system/styles/text'
import { CSS, VariantProps } from 'stitches.config'
import merge from 'lodash.merge'

type TextSizeVariants = Pick<VariantProps<typeof text>, 'size'>
type ParagraphSizeVariants = '1' | '2'

export type ParagraphVariants = { size?: ParagraphSizeVariants } & Omit<
  VariantProps<typeof text>,
  'size'
>

// This is the mapping of Paragraph Variants to Text variants
const textSize: Record<ParagraphSizeVariants, TextSizeVariants['size']> = {
  1: { '@initial': '3', '@bp2': '4' },
  2: { '@initial': '5', '@bp2': '6' },
}

// This is the mapping of Paragraph Variants to Text css
const textCss: Record<ParagraphSizeVariants, CSS> = {
  1: { lineHeight: '25px', '@bp2': { lineHeight: '27px' } },
  2: {
    color: '$slate11',
    lineHeight: '27px',
    '@bp2': { lineHeight: '30px' },
  },
}

/**
 *  Limits `text` to 4 responsive `size` variants.
 */
export const paragraph = (props: ParagraphVariants & { css?: CSS } = {}) => {
  const { size: sizeProp, css, ...textProps } = props
  const size = sizeProp || '1'

  return text({
    ...textProps,
    size: textSize[size],
    css: {
      fontVariantNumeric: 'proportional-nums',
      ...merge(textCss[size], css),
    },
  })
}

import { text } from '@design-system/styles/text'
import { CSS, VariantProps } from 'stitches.config'
import merge from 'lodash.merge'

type TextSizeVariants = Pick<VariantProps<typeof text>, 'size'>
type HeadingSizeVariants = '1' | '2' | '3' | '4'

export type HeadingVariants = { size?: HeadingSizeVariants } & Omit<
  VariantProps<typeof text>,
  'size'
>

/**
 *  Limits `text` to 4 responsive `size` variants.
 */
export const heading = (props: HeadingVariants & { css?: CSS } = {}) => {
  const { size: sizeProp, ...textProps } = props
  const size = sizeProp || '1'

  // This is the mapping of Heading Variants to Text variants
  const textSize: Record<HeadingSizeVariants, TextSizeVariants['size']> = {
    1: { '@initial': '4', '@bp2': '5' },
    2: { '@initial': '6', '@bp2': '7' },
    3: { '@initial': '7', '@bp2': '8' },
    4: { '@initial': '8', '@bp2': '9' },
  }

  // This is the mapping of Heading Variants to Text css
  const textCss: Record<HeadingSizeVariants, CSS> = {
    1: {
      fontWeight: 500,
      lineHeight: '20px',
      '@bp2': { lineHeight: '23px' },
    },
    2: {
      fontWeight: 500,
      lineHeight: '25px',
      '@bp2': { lineHeight: '30px' },
    },
    3: {
      fontWeight: 500,
      lineHeight: '33px',
      '@bp2': { lineHeight: '41px' },
    },
    4: {
      fontWeight: 500,
      lineHeight: '35px',
      '@bp2': { lineHeight: '55px' },
    },
  }

  return text({
    ...textProps,
    size: textSize[size],
    css: {
      fontVariantNumeric: 'proportional-nums',
      ...merge(textCss[size], props.css),
    },
  })
}

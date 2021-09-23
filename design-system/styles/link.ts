import { text } from '@design-system/styles/text'
import { Colors, CSS, css, VariantProps } from 'stitches.config'

export type LinkVariants = VariantProps<typeof link>

const colorVariants = Object.keys(Colors).reduce(
  (acc, color) => ({
    ...acc,
    [color]: {
      color: `$${color}11`,
      textDecoration: `underline`,
      textDecorationColor: `$${color}6`,
      transition: 'all .15s',
      '@hover': {
        '&:hover': {
          textDecorationColor: `$${color}9`,
        },
      },
      '&:focus': {
        outlineColor: `$${color}8`,
      },
    },
  }),
  {}
) as { [key in `${Colors}`]: CSS }

export const link = css({
  alignItems: 'center',
  gap: '$1',
  flexShrink: 0,
  outline: 'none',
  textDecorationLine: 'none',
  textUnderlineOffset: '3px',
  textDecorationColor: '$slate4',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  fontWeight: '500',
  lineHeight: 'inherit',
  '@hover': {
    '&:hover': {
      textDecorationLine: 'underline',
    },
  },
  '&:focus': {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineOffset: '2px',
    textDecorationLine: 'none',
  },
  [`& ${text}`]: {
    color: 'inherit',
  },
  variants: {
    variant: {
      ...colorVariants,
      subtle: {
        color: '$slate11',
        textDecorationColor: '$slate4',
        '&:focus': {
          outlineColor: '$slate8',
        },
      },
      contrast: {
        color: '$hiContrast',
        textDecoration: 'underline',
        textDecorationColor: '$slate4',
        '@hover': {
          '&:hover': {
            textDecorationColor: '$slate7',
          },
        },
        '&:focus': {
          outlineColor: '$slate8',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'contrast',
  },
})

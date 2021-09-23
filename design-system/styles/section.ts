import { css, VariantProps } from 'stitches.config'

export type SectionVariants = VariantProps<typeof section>

export const section = css({
  // Reset
  include: ['box'],
  flexShrink: 0,

  variants: {
    size: {
      '1': {
        py: '$3',
      },
      '2': {
        py: '$5',
      },
      '3': {
        py: '$9',
      },
    },
  },
  defaultVariants: {
    size: '3',
  },
})

import { CaretSortIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Colors, CSS, styled, VariantProps } from 'stitches.config'

const colorVariants = Object.keys(Colors).reduce(
  (acc, color) => ({
    ...acc,
    [color]: {
      backgroundColor: `$${color}2`,
      boxShadow: `inset 0 0 0 1px $colors$${color}7`,
      color: `$${color}11`,
      '@hover': {
        '&:hover': {
          boxShadow: `inset 0 0 0 1px $colors$${color}9`,
        },
      },
      '&:active': {
        backgroundColor: `$${color}3`,
        boxShadow: `inset 0 0 0 1px $colors$${color}9`,
      },
      '&:focus-within': {
        boxShadow: `inset 0 0 0 1px $colors$${color}8, 0 0 0 1px $colors$${color}8`,
      },
    },
  }),
  {}
) as { [key in `${Colors}`]: CSS }

const SelectWrapper = styled('div', {
  // backgroundColor: '$loContrast',
  borderRadius: '$2',
  // color: '$hiContrast',
  fontFamily: '$untitled',
  fontSize: '$1',
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 400,
  height: '$5',
  flexShrink: 0,
  transition: 'all .15s',

  '&:focus-within': {
    zIndex: 1,
  },

  variants: {
    variant: {
      ...colorVariants,
    },
  },
})

const StyledSelect = styled('select', {
  appearance: 'none',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: 'inherit',
  color: 'inherit',
  font: 'inherit',
  outline: 'none',
  width: '100%',
  height: '100%',
  pl: '$1',
  pr: '$3',
  lineHeight: '25px',
})

const StyledCaretSortIcon = styled(CaretSortIcon, {
  position: 'absolute',
  pointerEvents: 'none',
  display: 'inline',

  // Use margins instead of top/left to avoid setting "position: relative" on parent,
  // which would make stacking context tricky with Select used in a control group.
  marginTop: 5,
  marginLeft: -16,
})

type SelectProps = React.ComponentProps<typeof StyledSelect> &
  VariantProps<typeof SelectWrapper> & { css?: CSS }

export const Select = React.forwardRef<
  React.ElementRef<typeof StyledSelect>,
  SelectProps
>((props, forwardedRef) => {
  const { css, variant, ...rest } = props
  return (
    <SelectWrapper css={css} variant={variant}>
      <StyledSelect ref={forwardedRef} {...rest} />
      <StyledCaretSortIcon />
    </SelectWrapper>
  )
})

Select.toString = () => `.${SelectWrapper.className}`

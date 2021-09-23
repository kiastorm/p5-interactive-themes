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
          zIndex: 1,
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

const StyledCaretSortIcon = styled(CaretSortIcon, {
  position: 'absolute',
  pointerEvents: 'none',
  display: 'inline',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
})

const SelectWrapper = styled('div', {
  // backgroundColor: '$loContrast',
  position: 'relative',
  borderRadius: '$2',
  // color: '$hiContrast',
  fontFamily: '$untitled',
  fontSize: '$1',
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 400,
  flexShrink: 0,
  transition: 'all .15s',

  '&:focus-within': {
    zIndex: 1,
  },

  variants: {
    size: {
      '1': {
        borderRadius: '$2',
        height: '$5',
        fontSize: '$1',
        lineHeight: '$sizes$5',
      },
      '2': {
        borderRadius: '$2',
        height: '$6',
        fontSize: '$3',
        lineHeight: '$sizes$6',
      },
      '3': {
        borderRadius: '$2',
        height: '$7',
        fontSize: '$4',
        lineHeight: '$sizes$7',
      },
    },

    variant: {
      ...colorVariants,
    },
  },
  defaultVariants: {
    size: 1,
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

type SelectProps = React.ComponentProps<typeof StyledSelect> &
  VariantProps<typeof SelectWrapper> & { css?: CSS }

export const Select = React.forwardRef<
  React.ElementRef<typeof StyledSelect>,
  SelectProps
>((props, forwardedRef) => {
  const { css, variant, size, ...rest } = props
  return (
    <SelectWrapper css={css} variant={variant} size={size}>
      <StyledSelect ref={forwardedRef} {...rest} />
      <StyledCaretSortIcon />
    </SelectWrapper>
  )
})

Select.toString = () => `.${SelectWrapper.className}`

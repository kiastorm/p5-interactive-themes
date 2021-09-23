import { Colors, CSS, css, VariantProps } from 'stitches.config'

export type ButtonVariants = VariantProps<typeof button>

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
      '&:focus': {
        boxShadow: `inset 0 0 0 1px $colors$${color}8, 0 0 0 1px $colors$${color}8`,
      },
      '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
        {
          backgroundColor: `$${color}4`,
          boxShadow: `inset 0 0 0 1px $colors$${color}9`,
        },
    },
  }),
  {}
) as { [key in `${Colors}`]: CSS }

export const button = css({
  // Reset
  include: ['box'],
  all: 'unset',
  alignItems: 'center',
  userSelect: 'none',

  // Custom reset?
  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'center',
  lineHeight: '1',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  // Custom
  height: '$5',
  px: '$2',
  fontFamily: '$untitled',
  fontSize: '$2',
  fontWeight: 500,
  fontVariantNumeric: 'tabular-nums',
  transition: 'all .15s',

  '&:disabled': {
    backgroundColor: '$slate2',
    boxShadow: 'inset 0 0 0 1px $colors$slate7',
    color: '$slate8',
    pointerEvents: 'none',
  },

  variants: {
    size: {
      '1': {
        borderRadius: '$1',
        height: '$5',
        px: '$2',
        fontSize: '$1',
        lineHeight: '$sizes$5',
      },
      '2': {
        borderRadius: '$2',
        height: '$6',
        px: '$3',
        fontSize: '$3',
        lineHeight: '$sizes$6',
      },
      '3': {
        borderRadius: '$2',
        height: '$7',
        px: '$4',
        fontSize: '$4',
        lineHeight: '$sizes$7',
      },
    },
    variant: {
      ...colorVariants,
      transparentWhite: {
        backgroundColor: 'hsla(0,100%,100%,.2)',
        color: 'white',
        '@hover': {
          '&:hover': {
            backgroundColor: 'hsla(0,100%,100%,.25)',
          },
        },
        '&:active': {
          backgroundColor: 'hsla(0,100%,100%,.3)',
        },
        '&:focus': {
          boxShadow:
            'inset 0 0 0 1px hsla(0,100%,100%,.35), 0 0 0 1px hsla(0,100%,100%,.35)',
        },
      },
      transparentBlack: {
        backgroundColor: 'hsla(0,0%,0%,.2)',
        color: 'black',
        '@hover': {
          '&:hover': {
            backgroundColor: 'hsla(0,0%,0%,.25)',
          },
        },
        '&:active': {
          backgroundColor: 'hsla(0,0%,0%,.3)',
        },
        '&:focus': {
          boxShadow:
            'inset 0 0 0 1px hsla(0,0%,0%,.35), 0 0 0 1px hsla(0,0%,0%,.35)',
        },
      },
      hiContrast: {
        backgroundColor: '$hiContrast',
        color: '$loContrast',
        '@hover': {
          '&:hover': {
            backgroundColor: 'hsla(0,0%,0%,.25)',
          },
        },
        '&:active': {
          backgroundColor: 'hsla(0,0%,0%,.3)',
        },
        '&:focus': {
          boxShadow:
            'inset 0 0 0 1px hsla(0,0%,0%,.35), 0 0 0 1px hsla(0,0%,0%,.35)',
        },
      },
    },
    state: {
      active: {
        backgroundColor: '$slate4',
        boxShadow: 'inset 0 0 0 1px $colors$slate8',
        color: '$slate11',
        '@hover': {
          '&:hover': {
            backgroundColor: '$slate5',
            boxShadow: 'inset 0 0 0 1px $colors$slate8',
          },
        },
        '&:active': {
          backgroundColor: '$slate5',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$slate8, 0 0 0 1px $colors$slate8',
        },
      },
      waiting: {
        backgroundColor: '$slate4',
        boxShadow: 'inset 0 0 0 1px $colors$slate8',
        color: 'transparent',
        pointerEvents: 'none',
        '@hover': {
          '&:hover': {
            backgroundColor: '$slate5',
            boxShadow: 'inset 0 0 0 1px $colors$slate8',
          },
        },
        '&:active': {
          backgroundColor: '$slate5',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$slate8',
        },
      },
    },
    ghost: {
      true: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'gray',
      ghost: 'true',
      css: {
        backgroundColor: 'transparent',
        color: '$hiContrast',
        '@hover': {
          '&:hover': {
            backgroundColor: '$slateA3',
            boxShadow: 'none',
          },
        },
        '&:active': {
          backgroundColor: '$slateA4',
        },
        '&:focus': {
          boxShadow:
            'inset 0 0 0 1px $colors$slateA8, 0 0 0 1px $colors$slateA8',
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: '$slateA4',
            boxShadow: 'none',
          },
      },
    },
    {
      variant: 'blue',
      ghost: 'true',
      css: {
        backgroundColor: 'transparent',
        '@hover': {
          '&:hover': {
            backgroundColor: '$blueA3',
            boxShadow: 'none',
          },
        },
        '&:active': {
          backgroundColor: '$blueA4',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$blueA8, 0 0 0 1px $colors$blueA8',
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: '$blueA4',
            boxShadow: 'none',
          },
      },
    },
    {
      variant: 'green',
      ghost: 'true',
      css: {
        backgroundColor: 'transparent',
        '@hover': {
          '&:hover': {
            backgroundColor: '$greenA3',
            boxShadow: 'none',
          },
        },
        '&:active': {
          backgroundColor: '$greenA4',
        },
        '&:focus': {
          boxShadow:
            'inset 0 0 0 1px $colors$greenA8, 0 0 0 1px $colors$greenA8',
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: '$greenA4',
            boxShadow: 'none',
          },
      },
    },
    {
      variant: 'red',
      ghost: 'true',
      css: {
        backgroundColor: 'transparent',
        '@hover': {
          '&:hover': {
            backgroundColor: '$redA3',
            boxShadow: 'none',
          },
        },
        '&:active': {
          backgroundColor: '$redA4',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$redA8, 0 0 0 1px $colors$redA8',
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: '$redA4',
            boxShadow: 'none',
          },
      },
    },
  ],
  defaultVariants: {
    size: '1',
    variant: 'gray',
  },
})

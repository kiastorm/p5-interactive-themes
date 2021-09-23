import { Select } from '@design-system/react/select'
import { textField } from '@design-system/react/text-field'
import { button } from '@design-system/styles/button'
import { css, VariantProps } from 'stitches.config'

export type ControlGroupVariants = VariantProps<typeof controlGroup>

export const controlGroup = css({
  display: 'flex',

  // Make sure ControlGroup and its children don't affect normal stacking order
  position: 'relative',
  zIndex: 0,

  [`& ${button.selector}, & ${textField.selector}, & ${Select}`]: {
    borderRadius: '0',
    '&:focus': {
      zIndex: 1,
    },
    '&:first-child': {
      borderTopLeftRadius: '$1',
      borderBottomLeftRadius: '$1',
      marginRight: -1,
    },
    '&:last-child': {
      borderTopRightRadius: '$1',
      borderBottomRightRadius: '$1',
      marginLeft: -1,
    },
  },
})

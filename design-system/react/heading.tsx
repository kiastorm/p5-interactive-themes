import { heading, HeadingVariants } from '@design-system/styles/heading'
import { cx } from '@utils/dom'
import React from 'react'
import { CSS } from 'stitches.config'

const DEFAULT_TAG = 'h1'

type HeadingProps = React.ComponentProps<typeof DEFAULT_TAG> &
  HeadingVariants & { css?: CSS; as?: any }

/**
 *  Renders `h1.heading` by default and limits `Text` to 4 responsive `size` variants.
 */
const Heading = React.forwardRef<
  React.ElementRef<typeof DEFAULT_TAG>,
  HeadingProps
>((props, forwardedRef) => {
  const { className, size, variant, css, ...elementProps } = props
  return (
    <DEFAULT_TAG
      {...elementProps}
      ref={forwardedRef}
      className={cx('heading', className, heading({ size, variant, css }))}
    />
  )
})

export type { HeadingVariants }
export { heading, Heading, DEFAULT_TAG }

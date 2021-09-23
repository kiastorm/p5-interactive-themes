import { paragraph, ParagraphVariants } from '@design-system/styles/paragraph'
import { cx } from '@utils/dom'
import React from 'react'
import { CSS } from 'stitches.config'
import { text } from './text'

const DEFAULT_TAG = 'p'

type ParagraphProps = React.ComponentProps<typeof DEFAULT_TAG> &
  ParagraphVariants & { css?: CSS; as?: any }

const Paragraph = React.forwardRef<
  React.ElementRef<typeof DEFAULT_TAG>,
  ParagraphProps
>((props, forwardedRef) => {
  // '2' here is the default Paragraph size variant
  const { className, size, variant, css, ...elementProps } = props

  return (
    <DEFAULT_TAG
      {...elementProps}
      ref={forwardedRef}
      className={cx('paragraph', className, text({ size, variant, css }))}
    />
  )
})

export type { ParagraphVariants }
export { paragraph, Paragraph, DEFAULT_TAG }

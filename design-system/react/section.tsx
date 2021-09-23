import { section, SectionVariants } from '@design-system/styles/section'
import { styled } from 'stitches.config'

const DEFAULT_TAG = 'section'

const Section = styled(DEFAULT_TAG, section)
Section.toString = () => `.${Section.className}`

export type { SectionVariants }
export { section, Section, DEFAULT_TAG }

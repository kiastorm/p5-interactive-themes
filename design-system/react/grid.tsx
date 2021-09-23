import { grid, GridVariants } from '@design-system/styles/grid'
import { styled } from 'stitches.config'

const DEFAULT_TAG = 'div'
const Grid = styled(DEFAULT_TAG, grid)
Grid.toString = () => `.${Grid.className}`

export type { GridVariants }
export { grid, Grid, DEFAULT_TAG }

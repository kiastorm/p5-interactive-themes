import { Box } from '@design-system/react/box'
import { Button } from '@design-system/react/button'
import { ControlGroup } from '@design-system/react/control-group'
import { Flex } from '@design-system/react/flex'
import { useBoolean } from '@design-system/react/hooks/use-boolean'
import { useLatestRef } from '@design-system/react/hooks/use-latest-ref'
import {
  useStickyBoolean,
  useStickyState,
} from '@design-system/react/hooks/use-sticky-state'
import { Select } from '@design-system/react/select'
import { container } from '@design-system/styles/container'
import {
  MoonIcon,
  PauseIcon,
  PlayIcon,
  SunIcon,
  TrashIcon,
  UpdateIcon,
} from '@radix-ui/react-icons'
import { Layout } from 'custom/layout'
import { P5Image2 } from 'custom/p5-image-2'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Colors,
  colors,
  darkTheme,
  getRandomColor,
  getRandomTheme,
} from 'stitches.config'

const CONTAINER_SIZE = '3'

const randomColor = getRandomColor()
const randomTheme = getRandomTheme()

const Home = () => {
  const [activeColor, setActiveColor] = useState(undefined)
  const [theme, setTheme] = useStickyState(
    'kormsen--active-theme',
    'theme-default'
  )

  useEffect(() => {
    setActiveColor(randomColor)
    setTheme(randomTheme)
  }, [])

  const [isFrozen, setIsFrozen] = useStickyBoolean('kormsen--isDrawingFrozen')
  const [isFilled] = useBoolean()
  const [shouldShowDeleteDrawingButton, setShouldShowDeleteDrawingButton] =
    useBoolean(!isFrozen)
  const isFrozenRef = useLatestRef(isFrozen)
  const hasScrolled = useRef(false)
  const pRef = useRef(null)
  const isLightTheme = theme === 'theme-default'

  const handleScroll = () => {
    if (!hasScrolled.current) {
      hasScrolled.current = true
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)

    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.classList.remove('theme-default', darkTheme)
    document.body.classList.add(theme)
  }, [theme])

  const unfreeze = useCallback(() => {
    setIsFrozen.off()
    pRef.current.loop()
  }, [])

  const freeze = useCallback(() => {
    setIsFrozen.on()
    pRef.current.noLoop()
  }, [])

  const toggleFreeze = useCallback(() => {
    if (isFrozenRef.current) {
      setShouldShowDeleteDrawingButton.on()
      unfreeze()
    } else {
      freeze()
    }
  }, [isFrozenRef.current, freeze, unfreeze])

  const deleteDrawing = useCallback(() => {
    if (isFrozenRef.current) {
      setShouldShowDeleteDrawingButton.off()
    }
    pRef.current.clear()
  }, [])

  return (
    <Layout>
      <Box
        css={{
          position: 'fixed',
          top: 0,
          left: 0,

          right: 0,
          zIndex: '$3',
          backgroundColor: `transparent`,
        }}
      >
        <Flex
          className={container({
            size: CONTAINER_SIZE,
            css: {
              jc: 'flex-end',
              py: '$2',
            },
          })}
        >
          {/* <Flex as="nav">
              <Button tabIndex={0} variant={activeColor}>
                <ReaderIcon />
              </Button>
            </Flex> */}
          <Flex gap="1">
            <ControlGroup
            // ref={setThemeControlsRefs}
            // css={{ transform: 'translate(20px, -20px)', opacity: 0 }}
            >
              <Select
                title="Choose colour scheme"
                value={activeColor}
                onChange={(e) =>
                  setActiveColor(e.currentTarget.value as `${Colors}`)
                }
                variant={activeColor}
              >
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </Select>
              <Button
                title="Randomize colour scheme"
                variant={activeColor}
                onClick={() => {
                  setActiveColor(getRandomColor())
                }}
              >
                <UpdateIcon />
              </Button>
              {/* <Select>
            <option>modulz</option>
          </Select> */}
            </ControlGroup>
            <ControlGroup>
              <Button
                title={isFrozen ? 'Start drawing' : 'Stop drawing'}
                variant={activeColor}
                onClick={toggleFreeze}
              >
                {isFrozen ? <PlayIcon /> : <PauseIcon />}
              </Button>
              {shouldShowDeleteDrawingButton && (
                <>
                  <Button
                    title="Delete drawing"
                    variant={activeColor}
                    onClick={deleteDrawing}
                  >
                    <TrashIcon />
                  </Button>
                </>
              )}
            </ControlGroup>
            <Button
              title={
                isLightTheme
                  ? 'Switch to dark appearance'
                  : 'Switch to light appearance'
              }
              variant={activeColor}
              onClick={() =>
                setTheme(
                  isLightTheme
                    ? (darkTheme.selector.replace('.', '') as 'dark-theme')
                    : 'theme-default'
                )
              }
            >
              {isLightTheme ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Flex>
        </Flex>
      </Box>
      <div style={{ position: 'relative' }}>
        {/* <P5Image activeColor={activeColor} isLightTheme={isLightTheme} /> */}
        <P5Image2
          pRef={pRef}
          activeColor={activeColor}
          isLightTheme={isLightTheme}
          isFrozen={isFrozen}
          isFilled={isFilled}
          toggleFreeze={toggleFreeze}
          // setIsFilled={setIsFilled}
        />
      </div>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
})

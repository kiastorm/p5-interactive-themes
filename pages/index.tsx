import { Box } from '@design-system/react/box'
import { Button } from '@design-system/react/button'
import { Container } from '@design-system/react/container'
import { ControlGroup } from '@design-system/react/control-group'
import { Flex } from '@design-system/react/flex'
import { Heading } from '@design-system/react/heading'
import { Paragraph } from '@design-system/react/paragraph'
import { Select } from '@design-system/react/select'
import { box } from '@design-system/styles/box'
import { button } from '@design-system/styles/button'
import { container } from '@design-system/styles/container'
import { controlGroup } from '@design-system/styles/control-group'
import { flex } from '@design-system/styles/flex'
import { label } from '@design-system/styles/label'
import { link } from '@design-system/styles/link'
import { paragraph } from '@design-system/styles/paragraph'
import { textField } from '@design-system/styles/text-field'
import { MoonIcon, SunIcon, UpdateIcon } from '@radix-ui/react-icons'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { Layout } from 'custom/layout'
import { P5Image2 } from 'custom/p5-image-2'
import * as Motion from 'motion'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  Colors,
  colors,
  css,
  darkTheme,
  getRandomColor,
  getRandomTheme,
} from 'stitches.config'

const CONTAINER_SIZE = '3'
const POSTS_LENGTH = 40
const DELAY = 12
const randomColor = getRandomColor()
const randomTheme = getRandomTheme()

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
}

const intro = css({
  display: 'flex',
  gap: '$4',
  '> *': { flex: '1' },

  variants: {
    variant: {
      column: {
        flexDirection: 'column',
      },
      rowReverse: {
        flexDirection: 'row-reverse',
      },
    },
  },
})

const useStickyState = <T extends any>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const stickyValue = window.localStorage.getItem(key)

    return stickyValue ? JSON.parse(stickyValue) : defaultValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

const Article = (props) => {
  const { name, activeColor, inViewIndex, hasScrolled, css, ...rest } = props
  const [inViewRef, inView, entry] = useInView(options)
  const ref = useRef<HTMLElement>(null)
  const wasInView = useRef(false)

  const setRefs = useCallback(
    (node) => {
      ref.current = node
      inViewRef(node)
    },
    [inViewRef]
  )

  if (!wasInView.current) {
    if (inView) {
      inViewIndex.current++
      wasInView.current = true
    }
  }

  if (inView) {
    Motion.animate(
      entry.target,
      {
        opacity: 1,
        transform: 'translateY(0px)',
      },
      {
        easing: 'ease-out',
        delay: !hasScrolled.current && inViewIndex.current / DELAY,
      }
    )
  }

  return (
    <Box
      as="article"
      ref={setRefs}
      css={{
        transform: 'translateY(20px)',
        opacity: 0,
        backgroundColor: `$${activeColor}4`,
        p: '$2',
        minHeight: '$8',
        textAlign: 'left',
        border: `1px solid $colors$${activeColor}8`,
        // border: isLightTheme
        //   ? `1px solid $colors$${activeColor}6`
        //   : `1px solid $colors$${activeColor}9`,
        ...css,
      }}
      {...rest}
    >
      <Heading variant={activeColor} size="1" css={{ mb: '$1' }}>
        {name}
      </Heading>
      <Paragraph variant={activeColor}>
        With more useful text too. Here we will discuss an important topic: me,
        myself, I - number one.
      </Paragraph>
    </Box>
  )
}

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

  const headerRef = useRef<HTMLElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const postsHeadingRef = useRef<HTMLElement>(null)
  const themeControlsRef = useRef<HTMLElement>(null)
  const [themeControlsInViewRef, themeControlsIsInView, themeControlsEntry] =
    useInView(options)
  const themeControlsWasInView = useRef(false)

  const [headerInViewRef, headerIsInView, headerEntry] = useInView(options)
  const headerWasInView = useRef(false)

  const [mainInViewRef, mainIsInView, mainEntry] = useInView(options)
  const mainWasInView = useRef(false)
  const [postsHeadingInViewRef, postsHeadingIsInView, postsHeadingEntry] =
    useInView(options)
  const postsHeadingWasInView = useRef(false)
  const hasScrolled = useRef(false)
  const inViewIndex = useRef(0)
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

  const setHeaderRefs = useCallback(
    (node) => {
      headerRef.current = node
      headerInViewRef(node)
    },
    [headerInViewRef]
  )

  const setMainRefs = useCallback(
    (node) => {
      mainRef.current = node
      mainInViewRef(node)
    },
    [mainInViewRef]
  )

  const setPostsHeadingRefs = useCallback(
    (node) => {
      postsHeadingRef.current = node
      postsHeadingInViewRef(node)
    },
    [postsHeadingInViewRef]
  )

  const setThemeControlsRefs = useCallback(
    (node) => {
      themeControlsRef.current = node
      themeControlsInViewRef(node)
    },
    [themeControlsInViewRef]
  )

  if (headerIsInView) {
    if (!headerWasInView.current) {
      Motion.animate(
        headerEntry.target,
        {
          opacity: 1,
          transform: 'translateX(0px)',
        },
        {
          easing: 'ease-out',
          delay: !hasScrolled.current && inViewIndex.current / DELAY,
        }
      )
      inViewIndex.current++
    }
  }

  if (themeControlsIsInView) {
    if (!themeControlsWasInView.current) {
      Motion.animate(
        themeControlsEntry.target,
        {
          opacity: 1,
          transform: 'translate(0px, 0px)',
        },
        {
          easing: 'ease-out',
          delay: inViewIndex.current / DELAY,
        }
      )
      inViewIndex.current++
    }
  }

  if (mainIsInView) {
    if (!mainWasInView.current) {
      Motion.animate(
        mainEntry.target,
        {
          opacity: 1,
          transform: 'translateX(0px)',
        },
        {
          easing: 'ease-out',
          delay: !hasScrolled.current && inViewIndex.current / DELAY,
        }
      )
      inViewIndex.current++
    }
  }
  if (postsHeadingIsInView) {
    if (!postsHeadingWasInView.current) {
      Motion.animate(
        postsHeadingEntry.target,
        {
          opacity: 1,
          transform: 'translateY(0px)',
        },
        {
          easing: 'ease-out',
          delay: !hasScrolled.current && inViewIndex.current / DELAY,
        }
      )
      inViewIndex.current++
    }
  }

  return (
    <Layout>
      <div>
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
            <Flex>
              <ControlGroup
                ref={setThemeControlsRefs}
                css={{ transform: 'translate(20px, -20px)', opacity: 0 }}
              >
                <Button
                  variant={activeColor}
                  onClick={() =>
                    setTheme(
                      theme === 'theme-default'
                        ? (darkTheme.selector.replace('.', '') as 'dark-theme')
                        : 'theme-default'
                    )
                  }
                  // css={{
                  //   backgroundColor: '$hiContrast',
                  //   color: '$loContrast',
                  // }}
                >
                  {isLightTheme ? <MoonIcon /> : <SunIcon />}
                </Button>
                <Select
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
            </Flex>
          </Flex>
        </Box>
        <div style={{ position: 'relative' }}>
          {/* <P5Image activeColor={activeColor} isLightTheme={isLightTheme} /> */}
          <P5Image2 activeColor={activeColor} isLightTheme={isLightTheme} />
          <header
            className={box({
              css: {
                // position: 'relative',
                transition: 'all .3s',
                backgroundColor: `$${activeColor}4`,
                py: '$8',
              },
            })}
          >
            <Container
              size={CONTAINER_SIZE}
              className={intro({
                variant: {
                  '@initial': 'column',
                  '@bp2': 'rowReverse',
                },
              })}
            >
              <div />
              <div>
                <hgroup
                  ref={setHeaderRefs}
                  className={box({
                    css: {
                      transform: 'translateY(20px)',
                      opacity: 0,
                      mb: '$3',
                    },
                  })}
                >
                  <Heading
                    size="4"
                    gradient
                    variant={activeColor}
                    css={{ mb: '$2', WebkitBackgroundClip: 'text' }}
                  >
                    kia storm
                  </Heading>
                  <Heading
                    as="h2"
                    size="3"
                    gradient={true}
                    variant={activeColor}
                    css={{ WebkitBackgroundClip: 'text' }}
                  >
                    web developer &amp; designer
                  </Heading>
                </hgroup>
                <p
                  ref={setMainRefs}
                  className={paragraph({
                    gradient: true,
                    variant: activeColor,
                    css: {
                      mb: '$4',
                      WebkitBackgroundClip: 'text',
                      transform: 'translateY(20px)',
                      opacity: 0,
                    },
                  })}
                >
                  Previously @{' '}
                  <a
                    target="_blank"
                    href="https://terraquest.co.uk"
                    className={link({
                      variant: activeColor,
                    })}
                    rel="noreferrer"
                  >
                    TerraQuest
                  </a>
                  ,{' '}
                  <a
                    target="_blank"
                    href="https://autopilotapp.com"
                    className={link({
                      variant: activeColor,
                    })}
                    rel="noreferrer"
                  >
                    Autopilot
                  </a>
                  ,{' '}
                  <a
                    target="_blank"
                    href="https://expressandstar.com"
                    className={link({
                      variant: activeColor,
                    })}
                    rel="noreferrer"
                  >
                    Express &amp; Star
                  </a>{' '}
                  &amp;{' '}
                  <a
                    target="_blank"
                    href="https://potential.co"
                    className={link({
                      variant: activeColor,
                    })}
                    rel="noreferrer"
                  >
                    Potential
                  </a>
                  <br />
                  <br />
                  Currently figuring out what&apos;s next...
                  <br />
                  <br />
                  My role in teams tends to be as a middleman between design and
                  frontend development, contributing towards the development of
                  flexible, accessible, delightful TypeScript libraries that
                  support one or more design systems.
                </p>
              </div>
            </Container>
          </header>
          <main
            className={box({
              css: {
                transition: 'all .3s',
                backgroundColor: `$${activeColor}5`,
              },
            })}
          >
            <div
              className={container({
                size: CONTAINER_SIZE,
              })}
            >
              <div className={box({ css: { py: '$8', ta: 'center' } })}>
                <Heading
                  ref={setPostsHeadingRefs}
                  size="3"
                  variant={activeColor}
                  gradient={true}
                  css={{
                    mb: '$6',
                    mr: '$2',
                    WebkitBackgroundClip: 'text',
                    transform: 'translateY(20px)',
                    opacity: 0,
                  }}
                >
                  things i done did
                </Heading>

                <Flex direction="column" gap="4" css={{ flex: '0 0 auto' }}>
                  {Array(POSTS_LENGTH)
                    .fill(undefined)
                    .map((item, index) => {
                      const id = String(index)
                      const name = `Some useful article ${index}`
                      return (
                        <Article
                          key={id}
                          inViewIndex={inViewIndex}
                          hasScrolled={hasScrolled}
                          id={id}
                          index={index}
                          name={name}
                          activeColor={activeColor}
                        />
                      )
                    })}
                </Flex>
              </div>
            </div>
          </main>
        </div>
        <footer
          className={box({
            css: {
              position: 'relative',
              transition: 'all .3s',
              backgroundColor: `$${activeColor}6`,
              py: '$4',
              zIndex: '$3',
            },
          })}
        >
          <form
            className={flex()}
            onSubmit={(e) => {
              e.preventDefault()
              alert(e.currentTarget.recipientEmail.value)
            }}
          >
            <div
              className={container({
                size: CONTAINER_SIZE,
                css: {
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  jc: 'space-between',
                },
              })}
            >
              <Heading
                size="1"
                variant={activeColor}
                css={{ mr: '$2', mb: '$2' }}
              >
                Get my resume by email
              </Heading>
              <VisuallyHidden.Root>
                <label className={label({ size: '2', css: { mb: '$1' } })}>
                  Your email address
                </label>
              </VisuallyHidden.Root>
              <div className={controlGroup({ css: { flexGrow: 1 } })}>
                <input
                  className={textField({
                    variant: activeColor,
                  })}
                  placeholder="Your email address"
                  id="recipientEmail"
                  name="recipientEmail"
                  type="email"
                />
                <button
                  className={button({ variant: activeColor })}
                  type="submit"
                >
                  Send email
                </button>
              </div>
            </div>
          </form>
        </footer>
      </div>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
})

import { Button } from '@design-system/react/button'
import { ControlGroup } from '@design-system/react/control-group'
import { Flex } from '@design-system/react/flex'
import { Heading } from '@design-system/react/heading'
import { Select } from '@design-system/react/select'
import { box } from '@design-system/styles/box'
import { button } from '@design-system/styles/button'
import { container } from '@design-system/styles/container'
import { controlGroup } from '@design-system/styles/control-group'
import { flex } from '@design-system/styles/flex'
import { heading } from '@design-system/styles/heading'
import { label } from '@design-system/styles/label'
import { link } from '@design-system/styles/link'
import { paragraph } from '@design-system/styles/paragraph'
import { textField } from '@design-system/styles/text-field'
import {
  MoonIcon,
  ReaderIcon,
  SunIcon,
  UpdateIcon,
} from '@radix-ui/react-icons'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { Layout } from 'custom/layout'
import * as Motion from 'motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  Colors,
  colors,
  darkTheme,
  getRandomColor,
  getRandomTheme,
  Themes,
} from 'stitches.config'

const CONTAINER_SIZE = '3'
const POSTS_LENGTH = 12
const DELAY = 18
const randomColor = getRandomColor()
const randomTheme = getRandomTheme()

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
}

const Article = (props) => {
  const { name, activeColor, inViewIndex, hasScrolled, css, ...rest } = props
  const [inViewRef, inView, entry] = useInView(options)
  const ref = useRef<HTMLElement>(null)
  const wasInView = useRef(false)
  const [hasRendered, setHasRendered] = useState(false)

  useEffect(() => {
    setHasRendered(true)
  }, [])

  // Use `useCallback` so we don't recreate the function on each render - Could result in infinite loop
  const setRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
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
      entry.target, //the element we're animating
      {
        //the CSS styles we're changing
        opacity: 1,
        transform: 'translateY(0px)',
      },
      {
        // //Motion's animation parameters
        easing: 'ease-out',
        delay: !hasScrolled.current && inViewIndex.current / DELAY,
      }
    )
  }

  return (
    <article
      ref={setRefs}
      className={box({
        css: {
          gridRowEnd: ['span 26', 'span 33', 'span 46'][
            Math.floor(Math.random() * 3)
          ],
          transform:
            hasRendered &&
            window &&
            ref.current.getBoundingClientRect().top <= window.screenTop
              ? 'translateY(-20px)'
              : 'translateY(20px)',
          opacity: 0,
          backgroundColor: 'white',
          p: '$6',
          border: `1px solid $colors$${activeColor}8`,
          // border: isLightTheme
          //   ? `1px solid $colors$${activeColor}6`
          //   : `1px solid $colors$${activeColor}9`,
          ...css,
        },
      })}
      {...rest}
    >
      {name}
    </article>
  )
}

const Home = () => {
  const [activeColor, setActiveColor] = useState(randomColor as `${Colors}`)
  const [theme, setTheme] = useState<'theme-default' | 'dark-theme'>(
    randomTheme as `${Themes}`
  )

  const [hasRendered, setHasRendered] = useState(false)

  useEffect(() => {
    setHasRendered(true)
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

  // Use `useCallback` so we don't recreate the function on each render - Could result in infinite loop
  const setHeaderRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      headerRef.current = node
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      headerInViewRef(node)
    },
    [headerInViewRef]
  )

  const setMainRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      mainRef.current = node
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      mainInViewRef(node)
    },
    [mainInViewRef]
  )

  const setPostsHeadingRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      postsHeadingRef.current = node
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      postsHeadingInViewRef(node)
    },
    [postsHeadingInViewRef]
  )

  const setThemeControls = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      themeControlsRef.current = node
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      themeControlsInViewRef(node)
    },
    [themeControlsInViewRef]
  )

  if (headerIsInView) {
    if (!headerWasInView.current) {
      Motion.animate(
        headerEntry.target, //the element we're animating
        {
          //the CSS styles we're changing
          opacity: 1,
          transform: 'translateX(0px)',
        },
        {
          // //Motion's animation parameters
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
        themeControlsEntry.target, //the element we're animating
        {
          //the CSS styles we're changing
          opacity: 1,
          transform: 'translate(0px, 0px)',
        },
        {
          // //Motion's animation parameters
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
        mainEntry.target, //the element we're animating
        {
          //the CSS styles we're changing
          opacity: 1,
          transform: 'translateX(0px)',
        },
        {
          // //Motion's animation parameters
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
        postsHeadingEntry.target, //the element we're animating
        {
          //the CSS styles we're changing
          opacity: 1,
          transform: 'translateY(0px)',
        },
        {
          // //Motion's animation parameters
          easing: 'ease-out',
          delay: !hasScrolled.current && inViewIndex.current / DELAY,
        }
      )
      inViewIndex.current++
    }
  }

  return (
    <Layout>
      <Flex css={{ position: 'fixed', top: '$4', left: '$4', zIndex: '$max' }}>
        <Button tabIndex={0} variant={activeColor}>
          <ReaderIcon />
        </Button>
      </Flex>
      <Flex css={{ position: 'fixed', top: '$4', right: '$4', zIndex: '$max' }}>
        <ControlGroup
          ref={setThemeControls}
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
              setTheme(getRandomTheme())
            }}
          >
            <UpdateIcon />
          </Button>
          {/* <Select>
            <option>modulz</option>
          </Select> */}
        </ControlGroup>
      </Flex>
      <header
        className={box({
          css: { backgroundColor: `$${activeColor}3`, pt: '$8', pb: '$4' },
        })}
      >
        <hgroup
          ref={setHeaderRefs}
          className={container({
            size: CONTAINER_SIZE,
            css: {
              transform:
                hasRendered &&
                window &&
                headerRef.current.getBoundingClientRect().top <=
                  window.screenTop
                  ? // ? 'translateX(20px)'
                    // : 'translateX(-20px)',
                    'translateY(20px)'
                  : 'translateY(-20px)',
              opacity: 0,
            },
          })}
        >
          <Heading
            size="4"
            gradient={true}
            variant={activeColor}
            css={{ mb: '$2', WebkitBackgroundClip: 'text' }}
          >
            kia storm
          </Heading>
          <h2
            className={heading({
              size: '3',
              gradient: true,
              variant: activeColor,
              css: { WebkitBackgroundClip: 'text' },
            })}
          >
            web developer &amp; designer
          </h2>
        </hgroup>
      </header>
      <main className={box({ css: { backgroundColor: `$${activeColor}3` } })}>
        <div
          ref={setMainRefs}
          className={box({
            css: {
              pb: '$6',
              transform:
                hasRendered &&
                window &&
                mainRef.current.getBoundingClientRect().top <= window.screenTop
                  ? // ? 'translateX(20px)'
                    // : 'translateX(-20px)',
                    'translateY(20px)'
                  : 'translateY(-20px)',
              opacity: 0,
            },
          })}
        >
          <div className={container({ size: CONTAINER_SIZE })}>
            <p
              className={paragraph({
                css: {
                  color: `$${activeColor}11`,
                  mb: '$4',
                  WebkitBackgroundClip: 'text',
                  width: '50%',
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
            </p>
            <p className={paragraph({ gradient: true, variant: activeColor })}>
              Currently figuring out what&apos;s next...
            </p>
            <p className={paragraph({ gradient: true, variant: activeColor })}>
              My role in teams tends to be as a middleman between design and
              frontend development, contributing towards the development of
              flexible, accessible, delightful TypeScript libraries that support
              one or more design systems.
            </p>
          </div>
        </div>

        <div className={box({ css: { backgroundColor: `$${activeColor}5` } })}>
          <div
            className={container({
              size: CONTAINER_SIZE,
            })}
          >
            <div className={box({ css: { py: '$8', ta: 'center' } })}>
              <h1
                ref={setPostsHeadingRefs}
                className={heading({
                  size: '3',
                  variant: activeColor,
                  gradient: true,
                  css: {
                    mb: '$6',
                    mr: '$2',
                    WebkitBackgroundClip: 'text',
                    transform:
                      hasRendered &&
                      window &&
                      postsHeadingRef.current.getBoundingClientRect().top <=
                        window.screenTop
                        ? 'translateY(-20px)'
                        : 'translateY(20px)',
                    opacity: 0,
                  },
                })}
              >
                things i done did
              </h1>

              <Flex direction="column" gap="4" css={{ flex: '0 0 auto' }}>
                {Array(POSTS_LENGTH)
                  .fill(undefined)
                  .map((item, index) => {
                    const id = String(index)
                    const name = `item-${index}`
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
        </div>
        <form
          className={flex({
            css: { backgroundColor: `$${activeColor}6`, py: '$4' },
          })}
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
                jc: 'space-between',
              },
            })}
          >
            <h1
              className={heading({
                size: '1',
                variant: activeColor,
                css: { mr: '$2' },
              })}
            >
              Get my resume by email
            </h1>
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
      </main>
    </Layout>
  )
}

export default Home

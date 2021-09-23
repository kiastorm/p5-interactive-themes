import { box } from '@design-system/styles/box'
import chroma from 'chroma-js'
import gd from 'generative-design-library.js'
import { useEffect, useRef } from 'react'
import { Colors, darkTheme, theme as lightTheme } from 'stitches.config'

const HUE_MODIFIER = 20

const hslStringToArray = (value: string) => {
  const regExp = /\(([^)]+)\)/
  const hslPure = regExp.exec(value.replaceAll('%', ''))
  const hsl = hslPure[1].split(' ').map(Number)

  const h = hsl[0]
  const s = hsl[1] / 100
  const l = hsl[2] / 100

  return [h, s, l]
}

const randomSaturation = (chromaColor: any) =>
  chromaColor.saturate(Math.random() * 0.8)

export const P5Image2 = ({
  activeColor,
  isLightTheme,
}: {
  activeColor: `${Colors}`
  isLightTheme: boolean
}) => {
  const parentRef = useRef<HTMLDivElement>(null)
  const sketch = useRef()
  const activeColorRef = useRef(activeColor)
  const isLightThemeRef = useRef(isLightTheme)

  useEffect(() => {
    if (activeColorRef.current !== activeColor) {
      activeColorRef.current = activeColor
    }

    if (isLightThemeRef.current !== isLightTheme) {
      isLightThemeRef.current = isLightTheme
    }
  }, [activeColor, isLightTheme])

  useEffect(() => {
    const p5 = require('p5')

    sketch.current = new p5((p) => {
      const formResolution = 50
      let stepSize = 10

      const initRadius = 80
      let centerX
      let centerY
      const x = []
      const y = []

      let filled = p.random([false, true])
      let freeze = false
      let drawMode = 1

      p.setup = () => {
        // const theme = isLightThemeRef.current ? lightTheme : darkTheme
        // const hslArray = hslStringToArray(
        //   theme['colors'][`${activeColorRef.current}6`].value
        // )
        // const color = colors[Math.floor(Math.random() * colors.length)]
        const { width, height } = parentRef.current.getBoundingClientRect()
        p.createCanvas(width, height).parent(parentRef.current)
        p.colorMode(p.RGB)

        // init shape
        centerX = p.random(p.width)

        centerY = p.random(p.height)
        const angle = p.radians(360 / formResolution)
        for (let i = 0; i < formResolution; i++) {
          x.push(p.cos(angle * i) * initRadius)
          y.push(p.sin(angle * i) * initRadius)
        }

        p.strokeWeight(p.random(0.1, 2))
      }

      p.draw = () => {
        // floating towards mouse position
        // const color = colors[Math.floor(Math.random() * colors.length)]
        const theme = isLightThemeRef.current ? lightTheme : darkTheme
        const hslArray = hslStringToArray(
          theme['colors'][`${activeColorRef.current}6`].value
        )
        // const color = chroma(...hslArray, 'hsl')
        const [h, s, l] = hslArray

        const hueRange = p.random(HUE_MODIFIER)

        const color = chroma(p.random(h - hueRange, h + hueRange), s, l, 'hsl')

        centerX += (p.mouseX - centerX) * p.random(0.003, 0.06)
        centerY += (p.mouseY - centerY) * p.random(0.003, 0.06)

        // calculate new points
        for (let i = 0; i < formResolution; i++) {
          x[i] += p.random(-stepSize, stepSize)
          y[i] += p.random(-stepSize, stepSize)
        }

        const randomLightness = (c) =>
          isLightThemeRef.current
            ? c.darken(p.random(0.5))
            : c.brighten(p.random(0.5))

        if (filled) {
          p.fill(randomSaturation(color).rgb())
          p.stroke(randomLightness(randomSaturation(color)).rgb())
        } else {
          p.stroke(randomLightness(randomSaturation(color)).rgb())
          p.noFill()
        }

        switch (drawMode) {
          case 1: // circle
            p.beginShape()
            // start controlpoint
            p.curveVertex(
              x[formResolution - 1] + centerX,
              y[formResolution - 1] + centerY
            )

            // only these points are drawn
            for (let i = 0; i < formResolution; i++) {
              p.curveVertex(x[i] + centerX, y[i] + centerY)
            }
            p.curveVertex(x[0] + centerX, y[0] + centerY)

            // end controlpoint
            p.curveVertex(x[1] + centerX, y[1] + centerY)
            p.endShape()
            break
          case 2: // line
            p.beginShape()
            // start controlpoint
            p.curveVertex(x[0] + centerX, y[0] + centerY)

            // only these points are drawn
            for (let i = 0; i < formResolution; i++) {
              p.curveVertex(x[i] + centerX, y[i] + centerY)
            }

            // end controlpoint
            p.curveVertex(
              x[formResolution - 1] + centerX,
              y[formResolution - 1] + centerY
            )
            p.endShape()
            break
        }
      }
      p.doubleClicked = () => {
        filled = !filled
      }

      p.mousePressed = () => {
        if (p.mouseButton === p.RIGHT) {
          filled = !filled
        }
        // init shape on mouse position
        centerX = p.mouseX
        centerY = p.mouseY

        switch (drawMode) {
          case 1: {
            // circle
            const angle = p.radians(360 / formResolution)
            const radius = initRadius * p.random(0.5, 1)
            for (let i = 0; i < formResolution; i++) {
              x[i] = p.cos(angle * i) * radius
              y[i] = p.sin(angle * i) * radius
            }
            break
          }
          case 2: {
            // line
            const radius = initRadius * p.random(0.5, 5)
            const angle = p.random(p.PI)

            const x1 = p.cos(angle) * radius
            const y1 = p.sin(angle) * radius
            const x2 = p.cos(angle - p.PI) * radius
            const y2 = p.sin(angle - p.PI) * radius
            for (let i = 0; i < formResolution; i++) {
              x[i] = p.lerp(x1, x2, i / formResolution)
              y[i] = p.lerp(y1, y2, i / formResolution)
            }
            break
          }
        }
      }

      p.keyReleased = () => {
        if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png')
        if (p.keyCode == p.DELETE || p.keyCode == p.BACKSPACE) p.background(255)
        if (p.key == '1') filled = false
        if (p.key == '2') filled = true
        if (p.key == '3') drawMode = 1
        if (p.key == '4') drawMode = 2

        if (p.keyCode == p.UP_ARROW) stepSize++
        if (p.keyCode == p.DOWN_ARROW) stepSize--
        stepSize = p.max(stepSize, 1)

        // pause/play draw loop
        if (p.key == 'f' || p.key == 'F') freeze = !freeze
        if (freeze) {
          p.noLoop()
        } else {
          p.loop()
        }
      }
    })
  }, [])

  return (
    <div
      ref={parentRef}
      className={box()}
      style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}
    />
  )
}

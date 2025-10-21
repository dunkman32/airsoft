'use client'

import { useEffect, useRef } from 'react'

export function SnakeBackground() {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const container = containerRef.current
    if (!svg || !container) return

    const gridSize = 200
    const width = window.innerWidth
    const height = Math.max(document.documentElement.scrollHeight, window.innerHeight)

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

    // Calculate number of grid lines
    const numCols = Math.ceil(width / gridSize)
    const numRows = Math.ceil(height / gridSize)

    function generateSnakePath(startX: number, startY: number, maxSteps: number): string {
      let path = `M ${startX},${startY}`
      let x = startX
      let y = startY
      let direction = 0 // 0: right, 1: down, 2: left, 3: up
      let steps = 0

      while (steps < maxSteps && y < height) {
        steps++
        
        const prevX = x
        const prevY = y
        
        if (direction === 0) {
          // Move right
          x += gridSize
          if (x >= width) {
            x = prevX
            direction = 1 // Change to down
          }
        } else if (direction === 1) {
          // Move down
          y += gridSize
          if (y >= height) {
            y = prevY
            direction = Math.random() > 0.5 ? 0 : 2 // Change to right or left
          }
        } else if (direction === 2) {
          // Move left
          x -= gridSize
          if (x < 0) {
            x = prevX
            direction = 1 // Change to down
          }
        } else {
          // Move up
          y -= gridSize
          if (y < 0) {
            y = prevY
            direction = Math.random() > 0.5 ? 0 : 2 // Change to right or left
          }
        }
        
        path += ` L ${x},${y}`
        
        // Randomly change direction at intersections (only 90 degree turns)
        if (Math.random() > 0.7) {
          if (direction === 0 || direction === 2) {
            // If moving horizontally, can turn up or down
            direction = Math.random() > 0.5 ? 1 : 3
          } else {
            // If moving vertically, can turn left or right
            direction = Math.random() > 0.5 ? 0 : 2
          }
        }
      }

      return path
    }

    const path1 = svg.querySelector('.snake-line-1') as SVGPathElement
    const path2 = svg.querySelector('.snake-line-2') as SVGPathElement
    const path3 = svg.querySelector('.snake-line-3') as SVGPathElement

    // Start snakes at grid intersections
    if (path1) path1.setAttribute('d', generateSnakePath(0, 0, 50))
    if (path2) path2.setAttribute('d', generateSnakePath(400, 0, 50))
    if (path3) path3.setAttribute('d', generateSnakePath(800, 0, 50))
  }, [])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="grid" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(229,231,235,0.3)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <style>
          {`
            @keyframes snakePath1 {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: -4000; }
            }
            @keyframes snakePath2 {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: -4500; }
            }
            @keyframes snakePath3 {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: -3800; }
            }
            .snake-line-1 {
              stroke-dasharray: 120 180;
              animation: snakePath1 25s ease-in-out infinite;
            }
            .snake-line-2 {
              stroke-dasharray: 150 150;
              animation: snakePath2 20s ease-in-out infinite;
              animation-delay: -5s;
            }
            .snake-line-3 {
              stroke-dasharray: 100 200;
              animation: snakePath3 30s ease-in-out infinite;
              animation-delay: -10s;
            }
          `}
        </style>
        {/* Snake 1 - Brand Orange */}
        <path
          className="snake-line-1"
          d=""
          fill="none"
          stroke="oklch(0.785 0.145 74.392 / 0.3)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Snake 2 - Brand Teal */}
        <path
          className="snake-line-2"
          d=""
          fill="none"
          stroke="oklch(0.635 0.048 191.765 / 0.2)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Snake 3 - Brand Red */}
        <path
          className="snake-line-3"
          d=""
          fill="none"
          stroke="oklch(0.604 0.222 22.216 / 0.1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

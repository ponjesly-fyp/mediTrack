"use client"

import { useEffect, useRef, useState } from "react"
import { Heart } from "lucide-react"

interface HeartbeatMonitorProps {
    heartRate: number
}

export default function HeartbeatMonitor({ heartRate }: HeartbeatMonitorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>(0)
    const [isBeating, setIsBeating] = useState(false)

    useEffect(() => {
        setIsBeating(true)
        const timeout = setTimeout(() => setIsBeating(false), 200)
        return () => clearTimeout(timeout)
    }, [heartRate])

    useEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio
            canvas.height = canvas.offsetHeight * window.devicePixelRatio
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
            canvas.style.width = `100%`
            canvas.style.height = `${canvas.offsetHeight}px`
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        const drawFlatline = () => {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
            ctx.beginPath()
            ctx.strokeStyle = "#ef4444"
            ctx.lineWidth = 1
            const centerY = canvas.offsetHeight / 2
            ctx.moveTo(0, centerY)
            ctx.lineTo(canvas.offsetWidth, centerY)
            ctx.stroke()
        }

        const animate = () => {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
            ctx.beginPath()
            ctx.strokeStyle = "#ef4444"
            ctx.lineWidth = 1

            const centerY = canvas.offsetHeight / 2
            const amplitude = canvas.offsetHeight / 4
            const points: number[] = []
            const totalPoints = canvas.offsetWidth * 2

            for (let i = 0; i < totalPoints; i++) {
                let y = 0
                const pos = i % 100
                if (pos < 20) y = 0
                else if (pos === 20) y = 0.1
                else if (pos === 25) y = -0.1
                else if (pos === 30) y = -0.2
                else if (pos === 35) y = 1
                else if (pos === 40) y = -1.5
                else if (pos === 45) y = 0.2
                else if (pos === 50) y = 0.1
                else if (pos === 55) y = 0
                else if (pos === 60) y = 0.1
                else y = 0
                points.push(y)
            }

            const speed = Math.max(1, heartRate / 2)
            const offset = performance.now() / (1000 / speed)

            for (let i = 0; i < canvas.offsetWidth; i++) {
                const index = Math.floor((i + offset) % points.length)
                const y = centerY + points[index] * amplitude
                if (i === 0) ctx.moveTo(i, y)
                else ctx.lineTo(i, y)
            }

            ctx.stroke()
            animationRef.current = requestAnimationFrame(animate)
        }

        if (heartRate < 40) {
            drawFlatline()
        } else {
            animate()
        }

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            cancelAnimationFrame(animationRef.current)
        }
    }, [heartRate])

    return (
        <div className="flex flex-col w-full gap-5">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <div>
                        <h3 className="font-medium text-sm">Heart Rate</h3>
                        <p className="text-xs text-muted-foreground">Normal : 75</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    {heartRate > 50 ? <><Heart
                        className={`h-5 w-5 text-red-500 transition-transform ${isBeating ? "scale-125" : "scale-100"} mr-1`}
                        fill="#ef4444"
                    />
                    <div className="text-2xl font-semibold">{heartRate}</div>
                    <div className="text-xs text-black mt-2">BPM</div></> : <div className="flex flex-col items-end justify-end">
                        <h1 className="font-semibold">Disconnected</h1>
                        <h1 className="text-xs text-gray-600/70">Check Wrist Band</h1>
                        </div>}
                </div>
            </div>
            <div className="flex w-full h-16 rounded-md overflow-hidden relative">
                <div className="relative w-full h-16 rounded-md overflow-hidden bg-muted/10">
                    <canvas ref={canvasRef} className="w-full h-full" />
                    <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white dark:from-[#0c0c0c] to-transparent z-10" />
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white dark:from-[#0c0c0c] to-transparent z-10" />
                </div>
            </div>
        </div>
    )
}

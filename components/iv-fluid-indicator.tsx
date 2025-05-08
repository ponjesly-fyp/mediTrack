"use client"
import { cn } from "@/lib/utils"
interface IVFluidIndicatorProps {
  fluidLevel: number
  flowRate: number
  isPaused: boolean
}

export function IVFluidIndicator({ fluidLevel, flowRate, isPaused }: IVFluidIndicatorProps) {
  const getFluidColor = () => {
    if (fluidLevel <= 20) return "bg-red-500"
    if (fluidLevel <= 40) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="flex items-end gap-4 w-full">
      <div className="flex flex-col items-center">
        <div className="text-sm font-medium mb-2">{fluidLevel}%</div>
        <div className="relative w-16 h-64 border-2 border-gray-300 rounded-lg overflow-hidden">
          {/* Measurement lines */}
          <div className="absolute inset-0 flex flex-col justify-between py-2 px-1">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center w-full">
                <div className="w-2 h-0.5 bg-gray-300"></div>
                {i % 2 === 0 && <span className="text-[10px] text-gray-500 ml-1">{100 - i * 10}%</span>}
              </div>
            ))}
          </div>

          {/* Fluid visualization */}
          <div
            className={cn("absolute bottom-0 left-0 right-0 transition-all duration-1000", getFluidColor())}
            style={{ height: `${fluidLevel}%` }}
          >
            {/* Animated bubbles effect when not paused */}
            {!isPaused && (
              <>
                <div className="absolute w-3 h-3 rounded-full bg-white/30 left-2 bottom-10 animate-bubble-1"></div>
                <div className="absolute w-1.5 h-1.5 rounded-full bg-white/30 left-6 bottom-16 animate-bubble-2"></div>
                <div className="absolute w-1 h-1 rounded-full bg-white/30 left-4 bottom-24 animate-bubble-3"></div>
              </>
            )}
          </div>
          <div className="absolute top-0 h-[7px] left-0 right-0 bg-gray-200 border-b border-gray-300"></div>
        </div>
      </div>

      <div className="flex-1">
        <div className="space-y-4">
          <div>
            <div className="text-sm text-muted-foreground">Flow Rate</div>
            <div className="text-xl font-semibold">{isPaused ? "0" : flowRate} mL/hr</div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground">Estimated Time Remaining</div>
            <div className="text-xl font-semibold">{isPaused ? "Paused" : `${Math.floor(fluidLevel / 10)} hrs`}</div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground">Solution</div>
            <div className="text-xl font-semibold">0.9% NaCl</div>
          </div>
        </div>
      </div>
    </div>
  )
}

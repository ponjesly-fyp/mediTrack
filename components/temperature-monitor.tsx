/* eslint-disable prefer-const */
"use client"

import { AlertCircle, Thermometer } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "./ui/card"

export default function TemperatureMonitor({ temperature }: { temperature: number }) {
    let temperature1 = (temperature * 9) / 5 + 32;
    if (temperature1 < 90 || temperature1>107) {
        return (
            <Card className="w-full mx-auto overflow-hidden">
                <CardContent className="p-4">
                    <div className="w-full space-y-6 bg-white rounded-xl">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className={cn("p-2 rounded-full bg-red-500")}>
                                    <Thermometer className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm text-gray-900">Temperature</h3>
                                    <p className={cn("text-xs font-medium")}>Value out of bound</p>
                                </div>
                            </div>
                            <div className="text-right animate-pulse">
                                <div className="flex items-baseline justify-end gap-1">
                                    <div className="h-6 w-10 bg-gray-300 rounded" />
                                    <div className="h-4 w-4 bg-gray-200 rounded" />
                                </div>
                                <div className="h-3 w-12 bg-gray-200 rounded mt-1 hidden md:block" />
                            </div>
                        </div>

                        <div className="space-y-4 animate-pulse">
                            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 bg-gray-300 w-1/2 rounded-full" />
                                <div className="absolute top-0 bottom-0 w-1 bg-gray-400 rounded-full" style={{ left: "50%" }} />
                            </div>
                            <div className="flex justify-between px-1 text-xs text-gray-300">
                                {Array(5).fill(0).map((_, i) => (
                                    <div key={i} className="w-6 h-3 bg-gray-300 rounded" />
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-1 animate-pulse">
                            {Array(5).fill(0).map((_, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="w-full h-1.5 bg-gray-300 rounded-full" />
                                    <div className="w-10 h-3 bg-gray-200 rounded mt-1" />
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }
    const ranges = [
        { min: 95, max: 97.7, label: "Low", color: "from-blue-400 to-blue-500" },
        { min: 97.8, max: 99.5, label: "Normal", color: "from-green-400 to-green-500" },
        { min: 99.6, max: 100.9, label: "Mild", color: "from-yellow-400 to-yellow-500" },
        { min: 101.0, max: 103.0, label: "Moderate", color: "from-orange-400 to-orange-500" },
        { min: 103.1, max: 106.0, label: "High", color: "from-red-400 to-red-500" },
    ]
    const getCurrentRange = (temp: number) => {
        return ranges.find((range) => temp >= range.min && temp <= range.max) || ranges[ranges.length - 1]
    }

    const currentRange = getCurrentRange(temperature1)

    const getColorClasses = (temp: number) => {
        const range = getCurrentRange(temp)
        return {
            gradient: `bg-gradient-to-r ${range.color}`,
            text:
                range.label === "Normal"
                    ? "text-green-500"
                    : range.label === "Low"
                        ? "text-blue-500"
                        : range.label === "Mild"
                            ? "text-yellow-500"
                            : range.label === "Moderate"
                                ? "text-orange-500"
                                : "text-red-500",
        }
    }

    const colorClasses = getColorClasses(temperature1)
    const minTemp = 95
    const maxTemp = 106
    const fillPercentage = ((temperature1 - minTemp) / (maxTemp - minTemp)) * 100

    const toCelsius = (fahrenheit: number) => {
        return ((fahrenheit - 32) * 5) / 9
    }

    return (
        <Card className="w-full mx-auto overflow-hidden">
            <CardContent className="p-4">
                <div className={cn("w-full space-y-6 bg-white rounded-xl")}>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className={cn("p-2 rounded-full", colorClasses.gradient)}>
                                <Thermometer className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-medium text-sm text-gray-900">Temperature</h3>
                                <p className={cn("text-xs font-medium", colorClasses.text)}>{currentRange.label}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-baseline">
                                <span className="text-3xl font-semibold text-gray-900">{temperature1.toFixed(1)}</span>
                                <span className="text-sm ml-1 text-gray-500">°F</span>
                            </div>
                            <span className="text-xs text-gray-500 hidden md:flex">{toCelsius(temperature1).toFixed(1)}°C</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={cn(
                                    "absolute left-0 top-0 bottom-0 transition-all duration-300 rounded-full",
                                    colorClasses.gradient,
                                )}
                                style={{ width: `${fillPercentage}%` }}
                            />
                            <div
                                className="absolute top-0 bottom-0 w-1 bg-white shadow-md transition-all duration-300 rounded-full"
                                style={{ left: `calc(${fillPercentage}% - 2px)` }}
                            />
                        </div>

                        <div className="flex justify-between px-1 text-xs text-gray-500">
                            <span>95°</span>
                            <span>98°</span>
                            <span>100°</span>
                            <span>103°</span>
                            <span>106°</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-5 gap-1">
                        {ranges.map((range, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className={`w-full h-1.5 rounded-full bg-gradient-to-r ${range.color}`}></div>
                                <span className="text-xs text-gray-500 mt-1">{range.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="items-center justify-center gap-2 text-xs text-gray-500 mt-8 hidden md:flex">
                    <AlertCircle className="w-3 h-3 text-yellow-500 mt-0.5" />
                    <p>Note: Sensor readings may include a small margin of error due to hardware limitations.</p>
                </div>
            </CardContent>
        </Card>

    )
}

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const PatientDetailsCardSkeleton = () => {
    return (
        <Card>
            <CardHeader className="pb-2 px-3 md:px-4">
                <CardTitle className="text-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-muted animate-pulse" />
                        <div className="h-4 w-24 rounded bg-muted animate-pulse" />
                    </div>
                    <div className="h-5 w-16 rounded-full bg-muted animate-pulse" />
                </CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-4">
                <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div className="flex items-center" key={i}>
                            <div className="w-40 h-4 bg-muted rounded animate-pulse" />
                            <div className="ml-2 h-4 w-24 bg-muted rounded animate-pulse" />
                        </div>
                    ))}
                    <div className="flex">
                        <div className="w-40 h-4 bg-muted rounded animate-pulse" />
                        <div className="ml-2 flex gap-1">
                            <div className="h-5 w-16 rounded-full bg-muted animate-pulse" />
                            <div className="h-5 w-16 rounded-full bg-muted animate-pulse" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

    )
}

export default PatientDetailsCardSkeleton
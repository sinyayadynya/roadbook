import React from 'react'
import ContentLoader from 'react-content-loader'

export default function ActivitySkeleton({ count = 5 }) {
    const listActivities = []
    let i = 0
    while (i < count) {
        i += 1
        listActivities.push(
            <span
                key={"ActivitySkeleton" + "span" + i}
                className="inline-flex ml-2 mr-2 items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                <ContentLoader
                    key={"ActivitySkeleton" + "ContentLoader" + i}
                    speed={2}
                    width={60}
                    height={18}
                    viewBox="0 0 60 18"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect key={"ActivitySkeleton" + "rect" + i} x="0" y="3" rx="4" ry="4" width="60" height="12" />
                </ContentLoader>
            </span>)
    }
    return <div className="ml-2 mt-2">{listActivities}</div>
}

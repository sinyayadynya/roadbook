import React from 'react'
import ContentLoader from 'react-content-loader'

export default function SeasonSkeleton() {
    return (
        <div className="inline-flex  items-center ">
            <span
                className=" rounded-md bg-gray-100 mr-2  h-6  px-2  text-sm font-medium text-gray-400">
                <ContentLoader
                    speed={2}
                    width={70}
                    height={24}
                    viewBox="0 0 70 24"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <circle cx="4" cy="12" r="3" />
                    <rect x="10" y="5" rx="4" ry="4" width="55" height="14" />
                </ContentLoader>
            </span>
            <span
                className=" rounded-md bg-gray-100 ml-2 mr-2 h-6  px-2  text-sm font-medium text-gray-400">
                <ContentLoader
                    speed={2}
                    width={70}
                    height={24}
                    viewBox="0 0 70 24"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <circle cx="4" cy="12" r="3" />
                    <rect x="10" y="5" rx="4" ry="4" width="55" height="14" />
                </ContentLoader>
            </span>
        </div>
    )
}

import type { explorerType } from '@/lib/explorer'
import React, { useState } from 'react'

const Explorer = ({ explorer }: { explorer: explorerType }) => {

    const [isExpand, setIsExpand] = useState(false);

    if (explorer.isFolder) {
        return (
            <div>
                <span onClick={() => setIsExpand(!isExpand)}>📂{explorer.name}</span>
                <div className={`flex flex-col ml-5 ${isExpand ? "block" : "hidden"}`}>
                    {
                        explorer.items.map(item => {
                            return (
                                <Explorer key={item.id} explorer={item} />
                            )
                        })
                    }
                </div>
            </div>
        )
    } else {
        return(
            <span>📄{explorer.name}</span>
        )
    }
}

export default Explorer
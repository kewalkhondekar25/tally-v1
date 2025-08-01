import React, { useState } from 'react'
import Explorer from './Explorer'
import explorer from '@/lib/explorer';

const WorkspaceComponent = () => {
    const [explorerData, setExplorerData] = useState(explorer);
  return (
    <div>
        <p className='text-sm font-semibold'>Workspaces</p>
        <Explorer explorer={explorerData}/>
    </div>
  )
}

export default WorkspaceComponent
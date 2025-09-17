import React from 'react';
import useBlockBuilder from '@/hooks/useBlockBuilder';


const Blocks = () => {

  const GeneratedBlock = useBlockBuilder();

  return(
    <div>
      {GeneratedBlock}
    </div>
  )
}

export default Blocks
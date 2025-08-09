import React from 'react';
import useBlockBuilder from '@/hooks/useBlockBuilder';


const Blocks = () => {

  const GeneratedBlock = useBlockBuilder();

  return(
    <>
      {GeneratedBlock}
    </>
  )
}

export default Blocks
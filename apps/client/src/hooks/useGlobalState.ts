import { useState } from "react"

const useGlobalState = () => {

    const [blockValues, setBlockValues] = useState<{ placeholder: string, question: string}>({
        placeholder: "",
        question: ""
    });

    return {
        blockValues,
        setBlockValues
    }
};

export default useGlobalState;
import { useAppSelector } from "@/store/hooks";

const useReduxState = () => {
    
    const { blockName } = useAppSelector(state => state.blockpicker);
    const { workspaces } = useAppSelector(state => state.workspace)
    
    return { 
        blockName,
        workspaces 
    };
};

export default useReduxState;
import { useAppSelector } from "@/store/hooks";

const useReduxState = () => {
    
    const { blockName } = useAppSelector(state => state.blockpicker);
    const { workspaces, isLoading } = useAppSelector(state => state.workspace)
    
    return { 
        blockName,
        workspaces,
        isLoading
    };
};

export default useReduxState;
import { useAppSelector } from "@/store/hooks";

const useReduxState = () => {
    
    const { blockName } = useAppSelector(state => state.blockpicker);
    
    return { blockName };
};

export default useReduxState;
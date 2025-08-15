import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BlockPickerState {
    isBlockerPickerOpen: boolean;
    blockName: { 
        id: number, 
        name: string, 
        index?: number,
        question?: string,
        placeholder?: string,
        options?: string[]
    }[];
};

const initialState: BlockPickerState = {
    isBlockerPickerOpen: false,
    blockName: []
} 

const blockpickerSlice = createSlice({
    name: "blockPicker",
    initialState,
    reducers: {
        openBlockPicker: (state) => {
            state.isBlockerPickerOpen = true
        },
        closeBlockPicker: (state) => {
            state.isBlockerPickerOpen = false
        },
        setBlockPickedName: (state, action: PayloadAction<{id: number, name: string, index?: number}>) => {
            state.blockName.push(action.payload)
        },
        deleteBlockPicked: (state, action:PayloadAction<{ i: number}>) => {
            state.blockName = state.blockName.filter((item, i) => i !== action.payload.i)
        },
        deleteBlocks: (state) => {
            state.blockName = [];
        },
        setPlaceholder: (state, action: PayloadAction<{ index: number, placeholder: string}>) => {
            const block = state.blockName.find(item => item.index === action.payload.index);
            if(block){
                block.placeholder = action.payload.placeholder;
            }
        },
        setQuestion: (state, action: PayloadAction<{ index: number, question: string}>) => {
            const block = state.blockName.find(item => item.index === action.payload.index);
            if(block){
                block.question = action.payload.question;
            }
        },
        setOptions: (state, action: PayloadAction<{ index: number, options: string}>) => {
            const block = state.blockName.find(item => item.index === action.payload.index);
            if(block){
                if(!block.options){
                    block.options = [];
                }
                block.options.push(action.payload.options);
            }
        }
    }
});

export const { 
    openBlockPicker, 
    closeBlockPicker, 
    setBlockPickedName,
    deleteBlockPicked,
    deleteBlocks,
    setPlaceholder,
    setQuestion,
    setOptions
} = blockpickerSlice.actions;
export default blockpickerSlice.reducer;
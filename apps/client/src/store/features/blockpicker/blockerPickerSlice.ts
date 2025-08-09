import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BlockPickerState {
    isBlockerPickerOpen: boolean;
    blockName: { id: number, name: string}[];
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
        setBlockPickedName: (state, action: PayloadAction<{id: number, name: string}>) => {
            state.blockName.push(action.payload)
        },
        deleteBlockPicked: (state, action:PayloadAction<{ i: number}>) => {
            state.blockName = state.blockName.filter((item, i) => i !== action.payload.i)
        }
    }
});

export const { 
    openBlockPicker, 
    closeBlockPicker, 
    setBlockPickedName,
    deleteBlockPicked 
} = blockpickerSlice.actions;
export default blockpickerSlice.reducer;
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  query: [''],
  input: [
    {
      value: '',
      checked: false,
    },
  ],
  expansion: [
    {
      value: '',
      checked: false,
    },
  ],
}

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    reset: () => initialState,
    updateQuery: (state) => {
      state.query = [
        ...state.input
          .filter((word) => word.checked)
          .map((word) => (word = word.value)),
        ...state.expansion
          .filter((word) => word.checked)
          .map((word) => (word = word.value)),
      ]
    },
    setInput: (state, action) => {
      state.input = action.payload
    },
    setExpansion: (state, action) => {
      state.expansion = action.payload
    },
    updateChecks: (state, action) => {
      switch (action.payload.type) {
        case 'input':
          state.input[action.payload.index].checked = action.payload.check
          break
        case 'expansion':
          state.expansion[action.payload.index].checked = action.payload.check
          break
        default:
      }
    },
  },
})

export const { reset, updateQuery, setInput, setExpansion, updateChecks } =
  querySlice.actions
export default querySlice.reducer

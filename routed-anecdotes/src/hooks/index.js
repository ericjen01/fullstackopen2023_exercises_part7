import { useState } from "react";

export const useField = (label) => {
  const [value, setValue] = useState('')

  const erase = (e) => setValue('')

  const onChange = (e) => {setValue(e.target.value)}

  return{
    label,
    value,
    onChange,
    erase
  }
}

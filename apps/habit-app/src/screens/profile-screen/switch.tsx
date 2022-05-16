import React, { useEffect, useState } from 'react'
import { Switch as PaperSwitch } from 'react-native-paper'

export const Switch: typeof PaperSwitch = ({
  value,
  onValueChange,
  ...rest
}) => {
  const [switchValue, setSwitchValue] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    setSwitchValue(value)
  }, [value])

  const handleValueChange = (): void => {
    const _value = Boolean(switchValue)
    void onValueChange?.(!_value)
    setSwitchValue(!_value)
  }

  return (
    <PaperSwitch
      {...rest}
      value={switchValue}
      onValueChange={handleValueChange}
    />
  )
}

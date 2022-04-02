import React from 'react'
import { Control, Controller, FieldError, FieldValues } from 'react-hook-form'
import { HelperText } from 'react-native-paper'
import { TextInput, TextInputProps } from '../text-input'

interface Props<T> {
  testID?: string
  control: Control<T, unknown>
  label: string
  accessibilityLabel: string
  error?: FieldError
  name: string
  textInputProps?: TextInputProps
}

export const FormTextInput = <T,>({
  testID,
  control,
  label,
  accessibilityLabel,
  error,
  name,
  textInputProps
}: Props<T>): JSX.Element => {
  return (
    <>
      <Controller
        control={control as Control<FieldValues, unknown>}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            testID={testID}
            mode="outlined"
            accessibilityLabel={accessibilityLabel}
            label={label}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...textInputProps}
          />
        )}
        name={name}
      />
      <HelperText type="error" visible={Boolean(error)}>
        {error?.message}
      </HelperText>
    </>
  )
}

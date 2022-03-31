import { TextInput } from '@nx-react-native/shared/ui'
import React from 'react'
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  ValidationRule
} from 'react-hook-form'
import { HelperText } from 'react-native-paper'

interface Props<T> {
  testID?: string
  control: Control<T, unknown>
  required: string | ValidationRule<boolean> | undefined
  label: string
  accessibilityLabel: string
  error?: FieldError
  name: string
}

export const FormTextInput = <T,>({
  testID,
  control,
  required,
  label,
  accessibilityLabel,
  error,
  name
}: Props<T>): JSX.Element => {
  return (
    <>
      <Controller
        control={control as Control<FieldValues, unknown>}
        rules={{
          required
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            testID={testID}
            mode="outlined"
            accessibilityLabel={accessibilityLabel}
            label={label}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
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

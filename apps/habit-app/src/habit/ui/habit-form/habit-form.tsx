import { Button, Screen, TextInput, View } from '@nx-react-native/shared/ui'
import { useHeaderHeight } from '@react-navigation/elements'
import React from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { HelperText } from 'react-native-paper'

export interface FormData {
  name: string
}

interface Props {
  control: Control<FormData, unknown>
  loading: boolean
  onPress: () => void
  errors: {
    name?: FieldError
  }
  nameInputValidationRequired: string
  nameInputAccessibilityLabel: string
  nameInputLabel: string
  buttonAccessibilityLabel: string
  buttonTitle: string
}

export const HabitForm = ({
  control,
  loading,
  onPress,
  errors,
  nameInputValidationRequired,
  nameInputAccessibilityLabel,
  nameInputLabel,
  buttonAccessibilityLabel,
  buttonTitle
}: Props): JSX.Element => {
  const headerHeight = useHeaderHeight()

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: 'padding',
          default: undefined
        })}
        style={{ flex: 1 }}
        keyboardVerticalOffset={headerHeight}>
        <View padding="extraLoose" flex={1}>
          <Controller
            control={control}
            rules={{
              required: nameInputValidationRequired
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                testID="NameInput"
                mode="outlined"
                accessibilityLabel={nameInputAccessibilityLabel}
                label={nameInputLabel}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="name"
          />
          <HelperText type="error" visible={Boolean(errors.name)}>
            {errors.name?.message}
          </HelperText>
        </View>

        <View padding="extraLoose">
          <Button
            testID="SubmitButton"
            accessibilityLabel={buttonAccessibilityLabel}
            borderRadius="extraLoose"
            padding="tight"
            mode="contained"
            loading={loading}
            disabled={loading}
            onPress={onPress}>
            {buttonTitle}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  )
}

import { Button, Screen, View } from '@nx-react-native/shared/ui'
import { useHeaderHeight } from '@react-navigation/elements'
import React from 'react'
import { Control, FieldError } from 'react-hook-form'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { FormTextInput } from '../form-text-input'

export interface HabitFormData {
  name: string
}

interface Props {
  control: Control<HabitFormData, unknown>
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
          <FormTextInput<HabitFormData>
            control={control}
            required={nameInputValidationRequired}
            testID="NameInput"
            accessibilityLabel={nameInputAccessibilityLabel}
            label={nameInputLabel}
            name="name"
            error={errors.name}
          />
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

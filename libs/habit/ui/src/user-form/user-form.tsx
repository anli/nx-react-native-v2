import { Button, FormTextInput, Screen, View } from '@nx-react-native/shared/ui'
import { useHeaderHeight } from '@react-navigation/elements'
import React from 'react'
import { Control, FieldError } from 'react-hook-form'
import { KeyboardAvoidingView, Platform } from 'react-native'

export interface UserFormData {
  email: string
}

interface Props {
  control: Control<UserFormData, unknown>
  loading: boolean
  onPress: () => void
  errors: {
    email?: FieldError
  }
  emailInputAccessibilityLabel: string
  emailInputLabel: string
  buttonAccessibilityLabel: string
  buttonTitle: string
}

export const UserForm = ({
  control,
  loading,
  onPress,
  errors,
  emailInputAccessibilityLabel,
  emailInputLabel,
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
          <FormTextInput<UserFormData>
            control={control}
            testID="EmailInput"
            accessibilityLabel={emailInputAccessibilityLabel}
            label={emailInputLabel}
            name="email"
            error={errors.email}
            textInputProps={{
              keyboardType: 'email-address',
              autoCapitalize: 'none'
            }}
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

import { Button, FormTextInput, Screen, View } from '@nx-react-native/shared/ui'
import { useHeaderHeight } from '@react-navigation/elements'
import React from 'react'
import { Control, FieldError } from 'react-hook-form'
import { KeyboardAvoidingView, Platform } from 'react-native'

export interface GroupFormData {
  name: string
}

interface Props {
  control: Control<GroupFormData, unknown>
  loading: boolean
  onPress: () => void
  errors: {
    name?: FieldError
  }
  nameInputAccessibilityLabel: string
  nameInputLabel: string
  buttonAccessibilityLabel: string
  buttonTitle: string
}

export const GroupForm = ({
  control,
  loading,
  onPress,
  errors,
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
        <View paddingHorizontal="extraLoose" paddingTop="extraLoose" flex={1}>
          <FormTextInput<GroupFormData>
            control={control}
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

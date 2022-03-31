import { Button, Screen, View } from '@nx-react-native/shared/ui'
import { useHeaderHeight } from '@react-navigation/elements'
import React from 'react'
import { Control, FieldError, useFieldArray } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { List } from 'react-native-paper'
import { FormTextInput } from '../form-text-input'

export interface GroupFormData {
  name: string
  adminUsers: Array<{ email: string }>
}

interface Props {
  control: Control<GroupFormData, unknown>
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

export const GroupForm = ({
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
  const { fields } = useFieldArray({
    control,
    name: 'adminUsers'
  })

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: 'padding',
          default: undefined
        })}
        style={{ flex: 1 }}
        keyboardVerticalOffset={headerHeight}>
        <ScrollView>
          <View paddingHorizontal="extraLoose" paddingTop="extraLoose">
            <FormTextInput<GroupFormData>
              control={control}
              required={nameInputValidationRequired}
              testID="NameInput"
              accessibilityLabel={nameInputAccessibilityLabel}
              label={nameInputLabel}
              name="name"
              error={errors.name}
            />
          </View>
          <View paddingHorizontal="loose">
            <List.Section>
              <List.Subheader>Users</List.Subheader>
              {fields.map((item) => {
                return <List.Item key={item.id} title={item.email} />
              })}
            </List.Section>
          </View>
        </ScrollView>

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

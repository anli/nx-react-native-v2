import { Button, FormTextInput, Screen, View } from '@nx-react-native/shared/ui'
import { useHeaderHeight } from '@react-navigation/elements'
import React from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, Pressable } from 'react-native'
import { List } from 'react-native-paper'

export interface HabitFormData {
  name: string
  groupId?: string
}

interface Props {
  control: Control<HabitFormData, unknown>
  loading: boolean
  onPress: () => void
  errors: {
    name?: FieldError
  }
  nameInputAccessibilityLabel: string
  nameInputLabel: string
  buttonAccessibilityLabel: string
  buttonTitle: string
  onSelectGroup: () => void
  groups: Array<{
    id: string
    name: string
  }>
  emptyGroupButtonLabel: string
  onRemoveGroup: () => void
  groupSelectButtonAccessibilityLabel: string
  groupRemoveButtonAccessibilityLabel: string
}

export const HabitForm = ({
  control,
  loading,
  onPress,
  errors,
  nameInputAccessibilityLabel,
  nameInputLabel,
  buttonAccessibilityLabel,
  buttonTitle,
  onSelectGroup,
  groups,
  emptyGroupButtonLabel,
  onRemoveGroup,
  groupSelectButtonAccessibilityLabel,
  groupRemoveButtonAccessibilityLabel
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
        <View flex={1} paddingVertical="loose">
          <View paddingHorizontal="loose">
            <FormTextInput<HabitFormData>
              control={control}
              testID="NameInput"
              accessibilityLabel={nameInputAccessibilityLabel}
              label={nameInputLabel}
              name="name"
              error={errors.name}
            />
          </View>
          <Controller
            control={control}
            render={({ field: { value: groupId } }) => {
              const hasGroup = Boolean(groupId)
              const groupName = hasGroup
                ? groups.find(({ id }) => id === groupId)?.name
                : emptyGroupButtonLabel
              return (
                <List.Item
                  accessibilityLabel={groupSelectButtonAccessibilityLabel}
                  onPress={onSelectGroup}
                  title={groupName}
                  left={(...props) => (
                    <List.Icon {...props} icon="account-group" />
                  )}
                  right={(...props) =>
                    hasGroup && (
                      <Pressable
                        onPress={onRemoveGroup}
                        accessibilityLabel={
                          groupRemoveButtonAccessibilityLabel
                        }>
                        <List.Icon {...props} icon="close" />
                      </Pressable>
                    )
                  }
                />
              )
            }}
            name="groupId"
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

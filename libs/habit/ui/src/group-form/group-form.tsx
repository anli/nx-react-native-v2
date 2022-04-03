import { Button, FormTextInput, Screen, View } from '@nx-react-native/shared/ui'
import { useHeaderHeight } from '@react-navigation/elements'
import React from 'react'
import { Control, FieldArrayWithId, FieldError } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { List } from 'react-native-paper'
import { UserItem } from './user-item'

export interface GroupFormData {
  name: string
  adminUsers: Array<{ email: string }>
}

interface Props {
  control: Control<GroupFormData, unknown>
  fields: Array<FieldArrayWithId<GroupFormData, 'adminUsers', 'id'>>
  loading: boolean
  onPress: () => void
  errors: {
    name?: FieldError
    adminUsers?: Array<{
      email?: FieldError
    }>
  }
  nameInputAccessibilityLabel: string
  nameInputLabel: string
  buttonAccessibilityLabel: string
  buttonTitle: string
  handleUserDelete?: (index: number) => void
  userDeleteButtonAccessibilityLabel: string
}

export const GroupForm = ({
  control,
  fields,
  loading,
  onPress,
  errors,
  nameInputAccessibilityLabel,
  nameInputLabel,
  buttonAccessibilityLabel,
  buttonTitle,
  handleUserDelete,
  userDeleteButtonAccessibilityLabel
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
        <ScrollView>
          <View paddingHorizontal="extraLoose" paddingTop="extraLoose">
            <FormTextInput<GroupFormData>
              control={control}
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
              {fields.map((_user, _userIndex) => {
                return (
                  <UserItem
                    index={_userIndex}
                    item={_user}
                    error={errors?.adminUsers}
                    key={_user.id}
                    onDelete={handleUserDelete}
                    deleteButtonAccessibilityLabel={
                      userDeleteButtonAccessibilityLabel
                    }
                  />
                )
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

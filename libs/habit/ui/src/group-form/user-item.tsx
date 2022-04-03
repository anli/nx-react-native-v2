import { useAuth } from '@nx-react-native/shared/auth'
import { View } from '@nx-react-native/shared/ui'
import React from 'react'
import { FieldArrayWithId, FieldError } from 'react-hook-form'
import { Pressable } from 'react-native'
import { HelperText, List } from 'react-native-paper'
import { GroupFormData } from './group-form'

interface Props {
  item: FieldArrayWithId<GroupFormData, 'adminUsers', 'id'>
  index: number
  onDelete?: (index: number) => void
  error?: Array<{
    email?: FieldError
  }>
  deleteButtonAccessibilityLabel: string
}

export const UserItem = ({
  item,
  index,
  onDelete,
  error,
  deleteButtonAccessibilityLabel
}: Props): JSX.Element => {
  const { user } = useAuth()
  const isCurrentUser = item.email === user?.email

  const handleDelete = (): void => onDelete?.(index)

  return (
    <List.Item
      key={item.id}
      title={item.email}
      right={(props) =>
        !isCurrentUser && (
          <Pressable
            onPress={handleDelete}
            accessibilityLabel={deleteButtonAccessibilityLabel}>
            <List.Icon {...props} icon="trash-can" />
          </Pressable>
        )
      }
      description={() =>
        Boolean(error?.[index]) && (
          /* istanbul ignore next */
          <View style={{ marginLeft: -12 }}>
            <HelperText type="error" visible={Boolean(error?.[index])}>
              {error?.[index]?.email?.message}
            </HelperText>
          </View>
        )
      }
    />
  )
}

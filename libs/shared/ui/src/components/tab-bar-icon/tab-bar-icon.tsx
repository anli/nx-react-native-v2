import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface Props {
  name: string
  color: string
  size: number
}

export const TabBarIcon = ({ name, color, size }: Props): JSX.Element => (
  <Icon name={name} size={size} color={color} />
)

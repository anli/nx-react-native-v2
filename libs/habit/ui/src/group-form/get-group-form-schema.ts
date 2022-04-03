import * as yup from 'yup'
import { ObjectShape, RequiredObjectSchema, TypeOfShape } from 'yup/lib/object'
import { AnyObject } from 'yup/lib/types'

interface Props {
  nameRequired: string
}

export const getGroupFormSchema = ({
  nameRequired
}: Props): RequiredObjectSchema<
ObjectShape,
AnyObject,
TypeOfShape<ObjectShape>
> =>
  yup
    .object({
      name: yup.string().required(nameRequired)
    })
    .required()

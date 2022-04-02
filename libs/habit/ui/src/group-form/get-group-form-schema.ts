import * as yup from 'yup'
import { ObjectShape, RequiredObjectSchema, TypeOfShape } from 'yup/lib/object'
import { AnyObject } from 'yup/lib/types'

interface Props {
  nameRequired: string
  adminUsersEmail: string
}

export const getGroupFormSchema = ({
  nameRequired,
  adminUsersEmail
}: Props): RequiredObjectSchema<
ObjectShape,
AnyObject,
TypeOfShape<ObjectShape>
> =>
  yup
    .object({
      name: yup.string().required(nameRequired),
      adminUsers: yup
        .array()
        .of(
          yup.object().shape({
            email: yup.string().required().email(adminUsersEmail)
          })
        )
        .required()
        .min(1)
    })
    .required()

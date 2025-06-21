import { z } from 'zod'

export const createUserSchema = (t: (key: string) => string) =>
  z.object({
    firstName: z.string().min(1, t('profileScreen.errors.firstNameRequired')),
    lastName: z.string().min(1, t('profileScreen.errors.lastNameRequired')),
    email: z.string().email(t('profileScreen.errors.emailInvalid')),
    phoneNumber: z.string().min(10, t('profileScreen.errors.phoneRequired')),
    avatar: z.string().optional(),
  })

export type UserFormData = z.infer<ReturnType<typeof createUserSchema>>

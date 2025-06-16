import { z } from 'zod'

export const createUserSchema = (t: (key: string) => string) =>
  z.object({
    firstname: z.string().min(1, t('profileScreen.errors.firstNameRequired')),
    lastname: z.string().min(1, t('profileScreen.errors.lastNameRequired')),
    phoneNumber: z.string().min(10, t('profileScreen.errors.phoneRequired')),
    avatar: z.string().optional(),
  })

export type UserFormData = z.infer<ReturnType<typeof createUserSchema>>

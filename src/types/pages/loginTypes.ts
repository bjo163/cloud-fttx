// Tipe untuk login form
import type { InferInput } from 'valibot'

import type { schema } from '../../views/login/LoginFormParts'

export type ErrorType = {
  message: string[]
}

export type FormData = InferInput<typeof schema>

'use client'

import { PropsWithChildren, useActionState } from 'react'
import { forgotPasswordAction } from './actions/forgotPassword.action'

export default function ForgotPassword({
  children,
}: PropsWithChildren) {
  const [state, action, pending] = useActionState(
    forgotPasswordAction,
    undefined,
  )

  return (
    <form action={action}>
      {state?.errors?.email && (
        <div className="p-4 border rounded text-contrast bg-error">
          {state.errors.email}
        </div>
      )}
      {children}

      <button type="submit" disabled={pending}>
        Login
      </button>
    </form>
  )
}

'use client'
import { PropsWithChildren, useActionState } from 'react'
import { loginAction } from './login.action'

export function LoginAction(props: PropsWithChildren) {
  const [state, action, pending] = useActionState(loginAction, undefined)

  return (
    <form action={action}>
      {state?.errors?.username && (
        <div className="p-4 border rounded text-contrast bg-error">
          {state.errors.username}
        </div>
      )}
      {props.children}

      <button type="submit" disabled={pending}>
        Login
      </button>
    </form>
  )
}

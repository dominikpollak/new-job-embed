import { JamOnBreadProvider } from '@jamonbread/sdk'
import { Lucid } from 'lucid-cardano'
import { ButtonHTMLAttributes, useEffect } from 'react'

export const AT_BUTTON_VARIANT = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
} as const
export type AtButtonVariant = keyof typeof AT_BUTTON_VARIANT

export const variantClasses: Record<AtButtonVariant, string> = {
  PRIMARY: 'bg-green-200 hover:bg-green-400 active:bg-green-500',
  SECONDARY: 'bg-blue-200 hover:bg-blue-400 active:bg-blue-500',
  TERTIARY: 'bg-red-200 hover:bg-red-400 active:bg-red-500',
}

export interface AtButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  variant?: AtButtonVariant
  isDisabled?: boolean
}

export const AtButton = ({ label, variant = 'PRIMARY', isDisabled = false, onClick }: AtButtonProps) => {
  useEffect(() => {
    ;(async () => {
      const apiUrl = 'https://api.jamonbread.io/api/'.replace(/^\/+|\/+$/g, '')
      const wallet = typeof window !== 'undefined' ? window.cardano?.['nami'] : undefined
      const walletApi = await wallet?.enable()
      const provider = new JamOnBreadProvider(`${apiUrl}/lucid`)
      const lucid = await Lucid.new(provider, 'Mainnet')
      console.log(lucid, walletApi)
    })()
  }, [])

  return (
    <button
      className={`transition-colors px-6 py-2 rounded-md ${variantClasses[variant]} ${
        isDisabled ? 'bg-gray-300 text-slate-600 cursor-not-allowed pointer-events-none' : ''
      }`}
      onClick={isDisabled ? onClick : undefined}
    >
      {label}
    </button>
  )
}

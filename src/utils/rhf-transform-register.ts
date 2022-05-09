import { UseFormRegisterReturn } from 'react-hook-form'

export interface RHFTransformRegisterReturn extends Omit<UseFormRegisterReturn, 'ref'> {
  inputRef: UseFormRegisterReturn['ref']
}

export function rhfTransformRegister({
  ref,
  ...rest
}: UseFormRegisterReturn): RHFTransformRegisterReturn {
  return { inputRef: ref, ...rest }
}

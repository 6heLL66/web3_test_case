export const formatBalance = (value?: bigint, decimals?: number) => {
  if (!value || decimals === undefined) {
    return '0'
  }

  const etherBalance = BigInt(value) / BigInt(Math.pow(10, 18))
  const remainder = BigInt(value) % BigInt(Math.pow(10, 18))
  const etherPart = etherBalance.toString()

  let remainderPart = remainder.toString().padStart(18, '0')
  remainderPart = remainderPart.slice(0, decimals)

  return `${etherPart}.${remainderPart.slice(0, 5)}`
}

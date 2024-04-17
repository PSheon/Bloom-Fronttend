export const getFormattedEthereumAddress = (address: string): string => {
  const isValidEthAddress = /^(0x)[0-9a-f]{40}$/i.test(address)

  if (isValidEthAddress) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  } else {
    return ''
  }
}

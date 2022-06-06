import { ethers } from 'ethers'

const itemContract = {
  addressBSC: '0xC7610EC0BF5e0EC8699Bc514899471B3cD7d5492',
  jsonInterface: require('../build/contracts/Item.json'),
}

const marketContract = {
  addressBSC: '0xF65a2cd87d3b0Fa43C10979c2E60BAA40Bb03C1d',
  jsonInterface: require('../build/contracts/NFTMarket.json'),
}

// Create contract
const getMarketContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const chainId = window?.ethereum?.chainId
  const currentAddress = await window.ethereum.selectedAddress

  if (chainId === '0x61') {
    return new ethers.Contract(
      marketContract.addressBSC,
      marketContract.jsonInterface.abi,
      provider.getSigner(currentAddress)
    )
  }
}

const getItemContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  // const chainId = await window?.ethereum?.chainId

  return new ethers.Contract(
    itemContract.addressBSC,
    itemContract.jsonInterface.abi,
    provider.getSigner()
  )
}

// Call methods
export const fetchListItemIds = async (trait) => {
  const contract = await getItemContract()
  const currentAddress = await window.ethereum.selectedAddress
  const itemIdList = await contract.getAmountItemByTrait(trait, currentAddress)
  const result = itemIdList.map((id) => id.toNumber())

  return result
}

export const fetchUserInventoryItemAmount = async () => {
  const itemsAmount = []

  for (let i = 1; i < 5; i++) {
    const itemIdList = await fetchListItemIds(i)
    const itemAmount = itemIdList.filter((x) => x !== 0).length
    itemsAmount.push(itemIdList)
    itemsAmount.push(itemAmount)
  }

  return {
    fishItems: itemsAmount[0],
    fishAmount: itemsAmount[1],
    oreItems: itemsAmount[2],
    oreAmount: itemsAmount[3],
    hammerItems: itemsAmount[4],
    hammerAmount: itemsAmount[5],
    sushiItems: itemsAmount[6],
    sushiAmount: itemsAmount[7],
  }
}

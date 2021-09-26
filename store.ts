import create from 'zustand'

type Store = {
  test: string
}

const userStore = create<Store>(() => ({
  test: '',
}))
console.log(userStore)

export interface AuthForm {
  user: string
  password: string
}

export interface AddForm {
  name: string
  address: string
  comment?: string
  dateTS: number
  isCompleted: boolean
  userName: string
}

export interface UserData {
  id: number
  user: string
  name: string
  role: string
}
export interface Order {
  id: number
  name: string
  address: string
  dateTS: number
  isCompleted: boolean
  comment?: string
}

export interface User {
  id: string
  user: string
  name?: string
  role: string
}

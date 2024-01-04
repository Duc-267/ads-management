import { Text, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import Table from 'components/Table'
import { getValidArray } from 'utils/common'
import { IAccountTableData } from './constants'
import { getHeaderList } from './utils'

const AccountsTable = () => {
  const router = useRouter()
  const accounts: IAccountTableData[] = [
    {
      id: 'a',
      name: 'Nguyễn Văn A',
      email: 'abc@gmail.com',
      birthday: '01/01/1999',
      phone: '0123456789',
      role: 'Quản trị viên'
    },
    {
      id: 'b',
      name: 'Nguyễn Văn B',
      email: 'abcc@gmail.com',
      phone: '0123456789',
      birthday: '01/01/1999',
      role: 'Quản trị viên'
    }
  ]
  const tableData: IAccountTableData[] = getValidArray(accounts).map(account => {
    function navigateAccountDetail(): void {
      router.push(`/department-of-culture/accounts/${account.id}`)
    }

    return {
      ...account,
      onClick: navigateAccountDetail
    }
  })

  return (
    <VStack
      spacing={2}
      width="full"
      height="400px"
      background="white"
      borderRadius={12}
      padding={5}
      alignItems="flex-start"
    >
      <Text fontSize="18px" fontWeight="bold">
        Danh sách tài khoản
      </Text>
      <Table headerList={getHeaderList()} tableData={tableData} />
    </VStack>
  )
}

export default observer(AccountsTable)

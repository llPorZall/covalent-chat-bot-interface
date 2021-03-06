import { useCallback, useMemo, useState } from 'react'
import { Button, Card } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import Head from 'next/head'

import { Layout } from 'components/Layout'
import API from 'pages/api'
import { hashAddress } from 'utils/function'

const fetchTransactions = async (id, page = 0) => {
  const wallet = await API.webs.transactions({
    id,
    page,
  })

  return wallet
}

const TransactionPage = ({ wallet: initalWallet = {}, id }) => {
  const [wallet, setWallet] = useState(initalWallet)

  const onChangePage = useCallback(async (nextPage) => {
    const response = await fetchTransactions(id, nextPage)
    setWallet(response)
  }, [])

  const content = useMemo(() => {
    const { pagination, name, address, addressLink, transactions } = wallet

    const addressHash = hashAddress(address)

    return (
      <>
        <div className="flex flex-col justify-center items-center text-xl font-semibold mb-4">
          <div>{name}</div>
          <a href={addressLink} target="_blank" rel="noreferrer">
            {addressHash}
          </a>
        </div>
        {transactions?.map(({ txHash, txHashLink, signedAt, gasFeeValue, transactionType }) => (
          <Card className="mb-4" key={txHash}>
            <div className="flex flex-auto items-center">
              <div className="flex flex-1 flex-col">
                <div>{signedAt}</div>
                <a href={txHashLink} target="_blank" rel="noreferrer">
                  {txHash}
                </a>
              </div>
              <div className="flex flex-1 justify-center font-semibold">{transactionType}</div>
              <div className="flex-1 text-right">Gas Fee : {gasFeeValue}</div>
            </div>
          </Card>
        ))}

        {pagination && (
          <div className="flex justify-center items-center">
            <Button
              disabled={pagination.pageNumber === 0}
              icon={<LeftOutlined style={{ verticalAlign: 0 }} />}
              onClick={() => {
                onChangePage(pagination.pageNumber - 1)
              }}
            />
            <Button className="mx-2">{pagination.pageNumber + 1}</Button>
            <Button
              disabled={!pagination.hasMore}
              icon={<RightOutlined style={{ verticalAlign: 0 }} />}
              onClick={() => {
                onChangePage(pagination.pageNumber + 1)
              }}
            />
          </div>
        )}
      </>
    )
  }, [wallet])

  return (
    <>
      <Head>
        <title>Transactions</title>
      </Head>
      <Layout>{content}</Layout>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const wallet = await fetchTransactions(query.id)

  return {
    props: {
      wallet,
      id: query.id,
    },
  }
}

export default TransactionPage

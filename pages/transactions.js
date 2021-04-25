import { useCallback, useMemo, useState } from 'react'
import Layout from 'components/atoms/Layout'
import { Button, Card } from 'antd'

import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import API from 'pages/api'

const fetchTransactions = async (id, page = 0) => {
  const wallet = await API.webs.transactions({
    id,
    page,
  })

  return wallet
}

const TransactionPage = ({ wallet: initalWallet, id }) => {
  const [wallet, setWallet] = useState(initalWallet)

  const onChangePage = useCallback(async (nextPage) => {
    const response = await fetchTransactions(id, nextPage)
    setWallet(response)
  }, [])

  const content = useMemo(() => {
    const {
      pagination: { hasMore, pageNumber },
      name,
      address,
      addressLink,
      transactions,
    } = wallet

    const addressHash = `${address.slice(0, 6)}.....${address.slice(-6)}`
    return (
      <>
        <div className="flex flex-col justify-center items-center text-xl font-semibold mb-4">
          <div>{name}</div>
          <a href={addressLink} target="_blank" rel="noreferrer">
            {addressHash}
          </a>
        </div>
        {transactions.map(({ txHash, txHashLink, signedAt, gasFeeValue, transactionType }) => (
          <Card className="mb-4" key={txHash}>
            <div className="flex flex-auto items-center">
              <div className="flex flex-1 flex-col">
                <div>{signedAt}</div>
                <a href={txHashLink} target="_blank" rel="noreferrer">
                  {txHash}
                </a>
              </div>
              <div className="flex flex-1 justify-center">{transactionType}</div>
              <div className="flex-1 text-right">Gas Fee : {gasFeeValue}</div>
            </div>
          </Card>
        ))}
        <div className="flex justify-center items-center">
          <Button
            disabled={pageNumber === 0}
            icon={<LeftOutlined style={{ verticalAlign: 0 }} />}
            onClick={() => {
              onChangePage(pageNumber - 1)
            }}
          />
          <Button className="mx-2">{pageNumber + 1}</Button>
          <Button
            disabled={!hasMore}
            icon={<RightOutlined style={{ verticalAlign: 0 }} />}
            onClick={() => {
              onChangePage(pageNumber + 1)
            }}
          />
        </div>
      </>
    )
  }, [wallet])

  return <Layout>{content}</Layout>
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

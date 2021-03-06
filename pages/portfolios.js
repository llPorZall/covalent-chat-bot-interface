import { useMemo } from 'react'
import { Table } from 'antd'
import numeral from 'numeral'
import Head from 'next/head'

import { Layout } from 'components/Layout'
import API from 'pages/api'

const fetchPortfolio = async (id) => {
  const portfolio = await API.webs.getPortfolios(id)

  return portfolio
}

const PortfolioPage = ({ wallet = {} }) => {
  const content = useMemo(() => {
    const { name, totalAssets, asserts } = wallet
    const columns = [
      {
        title: 'ASSETS',
        dataIndex: 'ticker',
        key: 'ticker',
        className: 'text-base min-w-180',
        render: (value, record) => {
          const logo = record.logo.length ? record.logo : '/logo.png'
          return (
            <div className="flex items-center">
              <img src={logo} alt={record.name} width={28} height={28} />
              <div className="ml-2">{value}</div>
            </div>
          )
        },
      },
      {
        title: 'BALANCES',
        dataIndex: 'balance',
        key: 'balance',
        className: 'text-base',

        render: (value) => numeral(value).format('0,0[.][0000]'),
      },
      {
        title: 'PRICE',
        dataIndex: 'currentPrice',
        key: 'currentPrice',
        className: 'text-base',

        render: (value) => numeral(value).format('$0,0[.][000]'),
      },
      {
        title: 'VALUE',
        dataIndex: 'totalValue',
        key: 'totalValue',
        className: 'text-base',
        align: 'right',
        render: (value) => numeral(value).format('$0,0[.][000]'),
      },
    ]

    return (
      <>
        <div className="grid grid-cols-1 gap-4">
          <div className="text-xl font-semibold text-center">{name}</div>
          <div className="flex text-base justify-end">
            <div>Total Assets</div>
            <div className="font-semibold ml-1">{numeral(totalAssets).format('$0,0[.][000]')}</div>
          </div>
          <div className="text-base">
            <Table
              columns={columns}
              dataSource={asserts}
              pagination={false}
              rowKey="contractAddress"
              scroll={{ x: 200 }}
              size="small"
            />
          </div>
        </div>
      </>
    )
  }, [wallet])

  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
      <Layout>{content}</Layout>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const wallet = await fetchPortfolio(query.id)

  return {
    props: {
      id: query.id,
      wallet,
    },
  }
}

export default PortfolioPage

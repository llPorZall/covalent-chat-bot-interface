import Layout from 'components/atoms/Layout'
import Table from 'components/atoms/Table'

const Portfolio = ({ info }) => {
  const { walletName, totalAssets, asserts } = info

  const columns = [
    {
      title: 'ASSETS',
      dataIndex: 'ticker',
      key: 'ticker',
    },
    {
      title: 'BALANCES',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'PRICE',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
    },
    {
      title: 'VALUE',
      dataIndex: 'totalValue',
      key: 'totalValue',
    },
  ]

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4">
        <div className="font-sans text-xl font-semibold text-center">{walletName}</div>
        <div className="text-base text-right">Total Assets {totalAssets}</div>
        <div className="text-base">
          <Table
            columns={columns}
            dataSource={asserts}
            pagination={false}
            rowKey="contractAddress"
          />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const fake = {
    walletName: 'POR',
    walletAddress: '0xxxxxxxxxxxxxx',
    totalAssets: '$10,000',
    asserts: [
      {
        logo: 'https://logos.covalenthq.com/tokens/0xb8c77482e45f1f44de1745f52c74426c631bdd52.png',
        name: 'Binance Coin',
        ticker: 'BNB',
        contractAddress: '0xb8c77482e45f1f44de1745f52c74426c631bdd52',
        balance: 0.1,
        contractDecimals: 18,
        currentPrice: 500,
        totalValue: 90.91835,
      },
      {
        logo: 'https://logos.covalenthq.com/tokens/0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3.png',
        name: 'Dai Token',
        ticker: 'DAI',
        contractAddress: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
        balance: 0.1,
        contractDecimals: 18,
        currentPrice: 1,
        totalValue: 0.1,
      },
    ],
  }
  return {
    props: {
      info: fake,
    }, // will be passed to the page component as props
  }
}

export default Portfolio

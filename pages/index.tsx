import { Calculator } from '../lib/Calculator'
import { Layout } from '../lib/Layout'

const IndexPage = () => (
  <Layout>
    <h1 className='my-10 font-bold text-2xl text-center'>Doughculator 🍞</h1>
    <Calculator />
  </Layout>
)

export default IndexPage

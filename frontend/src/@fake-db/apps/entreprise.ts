// ** Mock
import mock from 'src/@fake-db/mock'

import { faker } from '@faker-js/faker'
import { EntrepriseType } from 'src/types/apps/entrepriseTypes'

const generateEntreprise = (index: number) => {
  return {
    id: index,
    name: faker.company.name(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    description: faker.company.catchPhrase(),
    telephone: faker.phone.number(),
    website: faker.internet.url()
  }
}

const data: { entreprises: EntrepriseType[] } = {
  entreprises: Array.from({ length: 50 }).map((_, index) => {
    return generateEntreprise(index)
  })
}

// POST: Add new entreprise
mock.onPost('/apps/entreprises/add-entreprise').reply(config => {
  // Get event from post data
  const entreprise = JSON.parse(config.data).data

  const { length } = data.entreprises
  let lastIndex = 0
  if (length) {
    lastIndex = data.entreprises[length - 1].id
  }
  entreprise.id = lastIndex + 1

  data.entreprises.unshift({ ...entreprise })

  return [201, { entreprise }]
})

// GET: DATA
mock.onGet('/apps/entreprises/list').reply(config => {
  const { q = '' } = config.params ?? ''

  const queryLowered = q.toLowerCase()

  const filteredData = data.entreprises.filter(
    entreprise =>
      entreprise.name.toLowerCase().includes(queryLowered) ||
      entreprise.email.toLowerCase().includes(queryLowered) ||
      entreprise.address.toLowerCase().includes(queryLowered) ||
      entreprise.website.toLowerCase().includes(queryLowered) ||
      entreprise.telephone.toLowerCase().includes(queryLowered)
  )

  return [
    200,
    {
      allData: data.entreprises,
      entreprises: filteredData,
      params: config.params,
      total: filteredData.length
    }
  ]
})
mock.onGet('/apps/entreprises/entreprise').reply(config => {
  const { id } = config.params ?? ''

  const filteredData = data.entreprises.filter(entreprise => entreprise.id === parseInt(id))

  if (filteredData.length) {
    return [200, filteredData[0]]
  }

  return [404, 'Entreprise Not Found']
})

// DELETE: Deletes entreprise
mock.onDelete('/apps/entreprises/delete').reply(config => {
  // Get entreprise id from URL
  const entrepriseId = config.data

  const entrepriseIndex = data.entreprises.findIndex(t => t.id === entrepriseId)
  data.entreprises.splice(entrepriseIndex, 1)

  return [200]
})

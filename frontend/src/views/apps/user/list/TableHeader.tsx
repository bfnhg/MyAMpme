// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useTranslation } from 'react-i18next'
import { debounce } from 'lodash'
import { useCallback, useState } from 'react'


interface TableHeaderProps {
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, toggle } = props
  const [value, setValue] = useState<string>('')

  const {t} = useTranslation()
const handleFilterDebounced = useCallback(
    debounce(value => {
      handleFilter(value)
    }, 500),
    [] // dependencies
  )

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
     <Box>  </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder={t('Search')}
          onChange={e => {
            setValue(e.target.value)
            handleFilterDebounced(e.target.value)
          }}
        />

        <Button  sx={{ mb: 2 }} onClick={toggle} variant='contained'>
          {t('Add')}
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader

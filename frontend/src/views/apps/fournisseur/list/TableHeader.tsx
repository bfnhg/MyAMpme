// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { GridRowId } from '@mui/x-data-grid'
import TextField from '@mui/material/TextField'
import Icon from 'src/@core/components/icon'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useTranslation } from 'react-i18next'
import { debounce } from 'lodash'
import { useCallback, useContext, useState } from 'react'

interface TableHeaderProps {
  selectedRows: GridRowId[]
  handleFilter: (val: string) => void
  handleAdd: () => void
  exportXlsx: () => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter } = props
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
  const [value, setValue] = useState<string>('')
  const handleFilterDebounced = useCallback(
    debounce(value => {
      handleFilter(value)
    }, 500),
    [] // dependencies
  )

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Button
        sx={{ mr: 4, mb: 2 }}
        color='secondary'
        variant='outlined'
        onClick={() => props.exportXlsx()}
        startIcon={<Icon icon='mdi:export-variant' fontSize={20} />}
      >
        {t('Export')}
      </Button>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2, width: 400 }}
          placeholder={t('Search')}
          onChange={e => {
            setValue(e.target.value)
            handleFilterDebounced(e.target.value)
          }}
        />
        {ability.can('create', 'fournisseur') && (
          <Button
            sx={{ mb: 2 }}
            variant='contained'
            onClick={() => {
              props.handleAdd()
            }}
          >
            {t('Add')}
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default TableHeader

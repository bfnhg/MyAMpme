// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { GridRowId } from '@mui/x-data-grid'
import TextField from '@mui/material/TextField'
import Icon from 'src/@core/components/icon'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useCallback, useContext, useState } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useTranslation } from 'react-i18next'
import { debounce } from 'lodash'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

interface TableHeaderProps {
  selectedRows: GridRowId[]
  handleFilter: (val: string) => void
  exportXlsx: () => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { selectedRows, handleFilter } = props
  const [value, setValue] = useState<string>('')
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
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
          sx={{ mr: 4, mb: 2 }}
          placeholder={t('Search')}
          onChange={e => {
            setValue(e.target.value)
            handleFilterDebounced(e.target.value)
          }}
        />
        {ability.can('create', 'actif') && (
          <Button sx={{ mb: 2 }} component={Link} variant='contained' href='/apps/actif/add'>
            {t('Add')}
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default TableHeader

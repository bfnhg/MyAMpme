// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { GridRowId } from '@mui/x-data-grid'
import TextField from '@mui/material/TextField'
import Icon from 'src/@core/components/icon'
import { exportExcel } from 'src/utils/exportExcel'
import { useContext } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useTranslation } from 'react-i18next'

interface TableHeaderProps {
  value: string
  selectedRows: GridRowId[]
  handleFilter: (val: string) => void
  exportXlsx: () => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, handleFilter,exportXlsx } = props
  const ability = useContext(AbilityContext)
  const {t} =useTranslation()

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
        onClick={() => exportXlsx()}
        startIcon={<Icon icon='mdi:export-variant' fontSize={20} />}
      >
        {t('Export')}
      </Button>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2 ,width: 400}}
          placeholder={t('Search')}
          onChange={e => handleFilter(e.target.value)}
        />
        {
          ability.can('create', 'product') && <Button sx={{ mb: 2 }} component={Link} variant='contained' href='/apps/product/add'>
          {t('Add')}
        </Button>
        }
      </Box>
    </Box>
  )
}

export default TableHeader

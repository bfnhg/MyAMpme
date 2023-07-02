// ** React Imports
import { useState, useEffect, useRef, createRef } from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import CardContent, { CardContentProps } from '@mui/material/CardContent'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import Repeater from 'src/@core/components/repeater'
import { styled } from '@mui/material/styles'
import Icon from 'src/@core/components/icon'
import AddForm from './AddForm'
import { useTranslation } from 'react-i18next'



const RepeaterWrapper = styled(CardContent)<CardContentProps>(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(12)
  }
}))

const ActifRepeater = ({
  disabled,
  selectedProduct,
  handleToast
}: {
  disabled: boolean
  selectedProduct: number|string
  handleToast: any
}) => {
  const [count, setCount] = useState<number>(0)
  const [actifCount, setActifCount] = useState<number>(0)
  const [refArray, setRefArray] = useState<any[]>([])
  const [actifArray, setActifArray] = useState<any[]>([])
  const repeaterRef = useRef(null)
  const { t}= useTranslation()
  const handleSubmit = () => {
    refArray.forEach(ref => {
      
      ref.current.submitForm()
    })
    
  }
  const removeFromRefArray = (ref: any) => {
    const index = refArray.indexOf(ref)
    if (index > -1) {
      refArray.splice(index, 1)
    }
  }
  

  // useEffect(() => {
  //   if (actifArray.length != 0 && actifArray.length === actifCount) {
  //     handleToast(actifArray)
  //     setActifArray([])
  //   }
  // }, [actifArray])

  return (
    <>
      <RepeaterWrapper>
        {/** @ts-ignore */}
        <Repeater ref={repeaterRef} count={count}>
          {(i: number) => {
            const Tag = i === 0 ? Box : Collapse

            return (
              <Tag key={i} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
                <AddForm selectedProduct={selectedProduct} count={i + 1} setActifCount={setActifCount} setActifArray={setActifArray} ref={refArray[i]} removeFromRefArray={removeFromRefArray}/>
              </Tag>
            )
          }}
        </Repeater>

        <Grid container sx={{ mt: 4 }} direction='column' alignItems='center' justifyContent='center'>
          <Grid item xs={12} sx={{ px: 0 }}>
            <Button
              size='large'
              variant='contained'
              color='success'
              startIcon={<Icon icon='mdi:plus' fontSize={20} />}
              onClick={() => {
                setCount(count + 1)
                setActifCount(actifCount + 1)
                setRefArray([...refArray, createRef()])
              }}
              disabled={disabled}
            >
              {t('Add Asset')}
            </Button>
          </Grid>
        </Grid>
      </RepeaterWrapper>
      {actifCount > 0 && (
        <Grid  container sx={{ 
          mt: 4,
          
        }} direction='column' alignItems='end' justifyContent='end'>
          <Grid item xs={12} sx={{ px: 0 }}>
            <Button
            sx={{
              position: 'fixed',
          bottom: 20,
          right: 40,
          zIndex: 999,
        }}
            type='submit' size='large' variant='contained' color='primary' onClick={handleSubmit}>
              {t('Save')}
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default ActifRepeater

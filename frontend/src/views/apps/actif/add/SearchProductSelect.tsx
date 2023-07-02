

import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment
} from "@mui/material";
import { useState } from "react";
import Icon from 'src/@core/components/icon'
import { ProductType } from "src/types/apps/productType";


interface SearchProductSelectProps {
    data: any;
    selectedProduct:  number|string;
    setSelectedProduct: (product: number|string) => void;
    setQuery: (query: string) => void;
}

export default function SearchProductSelect(props: SearchProductSelectProps) {

  const [product , setProduct] = useState<ProductType>()

  return (
    <Box >
      <FormControl fullWidth>
        <InputLabel id="search-select-label">Select Product</InputLabel>
        <Select

          // Disables auto focus on MenuItems and allows TextField to be in focus
          MenuProps={{ autoFocus: false }}
          labelId="search-select-label"
          id="search-select"
          value={props.selectedProduct}
          label="Select Products"
          onChange={(e) => {
            props.setSelectedProduct(e.target.value);
            setProduct(props.data.find((product: ProductType) => product.id === e.target.value))
          }}
          onClose={() => props.setQuery("")}

          // This prevents rendering empty string in Select's value
          // if search text would exclude currently selected option.
          renderValue={() => `${product?.nomModele}    ${product?.numeroModele}`}
        >
          {/* TextField is put into ListSubheader so that it doesn't
              act as a selectable item in the menu
              i.e. we can click the TextField without triggering any selection.*/}
          <ListSubheader>
            <TextField
              size="small"
              
              // Autofocus on textfield
              autoFocus
              placeholder="Type to search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon='mdi:magnify' fontSize={20} />
                  </InputAdornment>
                )
              }}
              onChange={(e) => props.setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  // Prevents autoselecting item while typing (default Select behaviour)
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          {props.data?.map((option, i) => (
            <MenuItem key={i} value={option.id}>
                
              {option.nomModele}{' '}{option.numeroModele}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

// ** MUI Imports
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'

// ** API Imports
import { useCreateMutation } from 'src/store/api/management/review'

// ** Type Imports
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

const schema = yup.object().shape({
  modificationSuggestions: yup.string().max(150).required()
})

interface FormData {
  modificationSuggestions: string
}

interface Props {
  initRequestSheetEntity: RequestSheetType
  currentProcessStatus: 'Initial review' | 'Secondary review'
}

const AddReviewForm = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity, currentProcessStatus } = props

  // ** Hooks
  const auth = useAuth()
  const [createNewReview, { isLoading: isCreateNewReviewLoading }] = useCreateMutation()
  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
      modificationSuggestions: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Logics
  const onSubmit = async (data: FormData) => {
    const { modificationSuggestions } = data

    await createNewReview({
      data: {
        requestSheet: initRequestSheetEntity.id,
        reviewer: auth.user?.id as number,
        processStatus: currentProcessStatus,
        modificationSuggestions
      }
    })
    reset(undefined, { keepValues: false, keepDirty: false, keepDefaultValues: false })
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl fullWidth>
          <Controller
            name='modificationSuggestions'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                minRows={3}
                maxRows={5}
                multiline
                placeholder='請填寫修改意見'
                value={value}
                fullWidth
                onBlur={onBlur}
                onChange={onChange}
                error={Boolean(errors.modificationSuggestions)}
              />
            )}
          />
          {errors.modificationSuggestions && (
            <FormHelperText sx={{ color: 'error.main' }}>{errors.modificationSuggestions.message}</FormHelperText>
          )}
        </FormControl>

        <Stack direction='row' justifyContent='flex-end' spacing={4}>
          <LoadingButton
            size='small'
            loading={isCreateNewReviewLoading}
            disabled={!isDirty || Boolean(errors.modificationSuggestions)}
            type='submit'
            variant='contained'
          >
            加入意見
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  )
}

export default AddReviewForm
